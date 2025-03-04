import BaseComponent from './BaseComponent.js';
import store from './Store.js';

export default class MyComponent extends BaseComponent {
    constructor(parentElement) {
        const template = `
            <div>
                <input type="text" id="inputField" placeholder="Enter something">
                <button id="submitButton">Submit</button>
                <p id="displayText"></p>
            </div>
        `;
        super(template, parentElement);

        this.addListener('click', '#submitButton', this.handleSubmit.bind(this));

        store.subscribe('inputValue', (value) => {
            this.parentElement.querySelector('#displayText').textContent = value;
        });
    }

    handleSubmit() {
        const inputValue = this.parentElement.querySelector('#inputField').value;
        store.setState('inputValue', inputValue); // Обновляем состояние
    }
}