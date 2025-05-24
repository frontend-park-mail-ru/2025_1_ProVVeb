import { Compounder } from '@modules/VDOM/Compounder';
import { VBC } from '@modules/VDOM/VBC';

interface TableParams {
	key: VBC;
	value: VBC;
}

export class VTable extends VBC {
	constructor(data: TableParams[]) {
		const main = new Compounder();
		main.down('tableBox', `
            display: flex;
            flex-direction: column;
            height: fit-content;
            width: 100%;
        `);
		for (const el of data) {
			const line = new Compounder();
			line.down('tableBox__line', `
                display: flex;
                flex-direction: row;
                height: fit-content;
                width: 100%;
                justify-content: space-between;  
                align-items: center;  
            `);
			line.add(el.key);
			line.add(el.value);
			main.add(line);
		}

		super(main.getTemplate());
		this.vdom = main.getVDOM();
		this.setID();
	}
}
