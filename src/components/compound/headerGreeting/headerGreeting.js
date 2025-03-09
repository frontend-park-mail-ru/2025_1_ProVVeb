import Logo from '../../pattern/logo/logo.js';
import Header from '../../pattern/header/header.js';

export default class HeaderGreeting extends Header {
    constructor(parentElement) {
        const DEFAULT_COMPONENTS = {
            logotype: new Logo(parentElement).template,
            profile: '',
            isGreeting: true,
        };

        super(parentElement, DEFAULT_COMPONENTS);
    }
}
