import Logo from '../../pattern/logo/logo';
import Header from '../../pattern/header/header';

interface HeaderComponents {
	logotype: string;
	profile: string;
	isGreeting: boolean;
}

export default class HeaderGreeting extends Header {
	constructor(parentElement: HTMLElement) {
		const DEFAULT_COMPONENTS: HeaderComponents = {
			logotype: new Logo(parentElement).template,
			profile: '',
			isGreeting: true,
		};

		super(parentElement, DEFAULT_COMPONENTS);
	}
}
