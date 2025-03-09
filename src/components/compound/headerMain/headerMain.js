import LogoMain from '../../simple/logoMain/logoMain.js';
import Profile from '../../simple/profile/profile.js';
import Header from '../../pattern/header/header.js';

export default class HeaderMain extends Header {
	constructor(parentElement) {
		const DEFAULT_COMPONENTS = {
			logotype: new LogoMain(parentElement).template,
			profile: new Profile(parentElement).template,
			isGreeting: false,
		};

		super(parentElement, DEFAULT_COMPONENTS);
	}
}
