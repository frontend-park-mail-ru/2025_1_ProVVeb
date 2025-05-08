import AuthCard from '@compound/authCard/authCard';
import HeaderGreeting from '@compound/headerGreeting/headerGreeting';
import BasePage from '../BasePage';

export default class AuthPage extends BasePage {
    private components: Array<HeaderGreeting | AuthCard>;

    constructor(parentElement: HTMLElement) {
        super(parentElement);
        this.components = [
            new HeaderGreeting(parentElement),
            new AuthCard(parentElement),
        ];
    }

    render(): void {
        this.components.forEach((component) => component.render());
    }
}
