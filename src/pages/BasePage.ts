export default abstract class BasePage {
    protected parentElement: HTMLElement;

    constructor(parentElement: HTMLElement) {
        this.parentElement = parentElement;
    }

	abstract render(): void;

	rerender(): void {
	    this.parentElement.innerHTML = '';
	    this.render();
	}
}
