import { VBC } from '@VDOM/VBC';
import templateHBS from './statCard.hbs';
import { VStars } from '../../ui/stars/stars';

export class VStatCard extends VBC {
	constructor(login: string, point: number, review: string) {
		const starEl = new VStars(point);
		const starElDefault = new VStars(3);

		super(
			templateHBS,
			{ login: 'anonym', stars: starElDefault.compileTemplate(), review: 'Sed ut perspiciatis unde omnis iste natus error sit  voluptatem accusantium doloremque laudantium' },
			'',
			[],
			{ login: login, stars: starEl.compileTemplate(), review: review }
		);
	}
}
