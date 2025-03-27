import Logo, { LogoParams } from '@pattern/logo/logo';

const LOGO_MAIN: LogoParams = {
	type: 'main',
	logoSrc: 'media/logo/logoMain.png',
};

export default class LogoMain extends Logo {
	constructor(parentElement: HTMLElement) {
		super(parentElement, LOGO_MAIN);
	}
}
