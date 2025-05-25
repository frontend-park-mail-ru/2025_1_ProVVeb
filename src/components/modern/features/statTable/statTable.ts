import { VBC } from '@VDOM/VBC';
import templateHBS from './statTable.hbs';

export class VStatTable extends VBC {
	constructor(n: number, min: number, max: number, avg: number) {
		super(
			templateHBS,
			{},
			'',
			[],
			{
				n: n, min: min, max: max, avg: avg
			}
		);
	}
}
