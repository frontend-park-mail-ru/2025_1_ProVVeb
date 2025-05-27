import { VComps } from "@features/compForm/compForm";
import { VCSAT } from "@features/CSATForm/CSATForm";
import { VSearchInputComp } from "@ui/search/searchInput/searchInputComp/searchInput";
import { VSearchInputCSAT } from "@ui/search/searchInput/searchInputCSAT/searchInput";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";

export class VAdminCSAT extends VBC {
	constructor() {
		const main = new Compounder();
		const input = new VSearchInputCSAT(() => { }, () => { });
		const comps = new VCSAT();
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
