import BaseComponent from '@basecomp';
import templateHBS from './title.hbs';

interface TitleParams {
	weight: string;
	size: string;
	color: string;
	position: string
	value: string;
}

const DEFAULT_PARAMS_TITLE: TitleParams = {
	weight: '700',
	size: '20px',
	color: 'var(--font)',
	position: 'flex-start',
	value: 'Заголовок',
};

export default class Profile extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<TitleParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_TITLE, ...paramsHBS };

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
