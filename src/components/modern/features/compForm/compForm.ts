import { VComp } from "@ui/form/comp/comp";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";
import { formatISODate } from '@modules/utils';

interface comp_params {
	closed_at: string | null,
	complaint_by: string,
	complaint_id: number,
	complaint_on: string,
	complaint_text: string,
	complaint_type: number,
	created_at: string,
	status: number,
	type_description: string,
}

export class VComps extends VBC {
	private main: Compounder;
	private complaints: comp_params[];

	constructor(complaints: comp_params[]) {
		super('<div></div>');
		this.main = new Compounder();
		this.complaints = complaints;
	}

	public insertData() {
		this.main.delete();
		this.main.clear();
		this.main.down('cards', `
			width: 100%;
			height: 60dvh;
    		overflow-y: scroll;
			overflow-x: hidden;
		`)

		this.complaints.forEach(i => {
			const el = new VComp(
				i.status === 3,
				i.status === -1,
				i.complaint_by,
				i.complaint_on,
				i.complaint_text,
				formatISODate(i.created_at),
				i.complaint_id,

			);
			this.main.add(el);
		});

		this.inject(this.main.getTemplate());
		this.vdom = this.main.getVDOM();
		this.setID();
	}
}
