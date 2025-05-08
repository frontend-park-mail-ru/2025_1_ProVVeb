import BaseComponent from '@basecomp';
import templateHBS from './table.hbs';

interface LineParams {
    srcIcon?: string;
    colorKey?: string;
    colorValue?: string;
    key: string;
    value: string;
}

interface TableParams {
	width: string;
	lines: LineParams[];
}

const DEFAULT_PARAMS_TABLE: TableParams = {
    width: "500px",
    lines: [
        {
            colorKey: "#000",
            colorValue: "#000",
            key: "KEY",
            value: "VALUE",
        }
    ],
} 

export default class Table extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<TableParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_TABLE, ...paramsHBS };
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}

	// render(): void {
	// 	this.parentElement.innerHTML = this.template;
	// 	this.attachListeners();
	// }
}
