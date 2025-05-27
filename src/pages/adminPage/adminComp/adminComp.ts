import { VComps } from "@features/compForm/compForm";
import { VSearchInputComp } from "@ui/search/searchInput/searchInputComp/searchInput";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";

export class VAdminComp extends VBC {
	constructor() {
		const main = new Compounder();
		const input = new VSearchInputComp(() => { }, () => { });
		const comps = new VComps();
		comps.insertData();

		main.down('admin', `
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
		`);
		main.add(input);
		main.add(comps);

		super(main.getTemplate());
		this.vdom = main.getVDOM();
		this.setID();
	}
}
