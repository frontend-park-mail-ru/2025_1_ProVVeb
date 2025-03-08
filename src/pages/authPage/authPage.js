import BaseComponent from '../../components/BaseComponent.js';
import AuthCard from '../../components/compound/authCard/authCard.js';
import HeaderGreeting from '../../components/compound/headerGreeting/headerGreeting.js';
import Notification from '../../components/simple/errorMessage/errorMessage.js';

export default class AuthPage extends BaseComponent {
    constructor(parentElement) {
        const headerGreeting = new HeaderGreeting(parentElement).template;
        const authCard = new AuthCard(parentElement).template;
        const error = new Notification(parentElement, { isWarning: true, isWithButton: true, title: 'ERROR!' }).template;
        super(headerGreeting + authCard + error, parentElement);
    }
}
