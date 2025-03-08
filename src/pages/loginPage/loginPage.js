import BaseComponent from '../../components/BaseComponent.js';
import LoginCard from '../../components/compound/loginCard/loginCard.js';
import HeaderGreeting from '../../components/compound/headerGreeting/headerGreeting.js';

export default class LoginPage extends BaseComponent {
    constructor(parentElement) {
        const headerGreeting = new HeaderGreeting(parentElement).template;
        const loginCard = new LoginCard(parentElement).template;
        super(headerGreeting + loginCard, parentElement);
    }
}
