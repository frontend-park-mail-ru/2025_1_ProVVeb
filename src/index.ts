import { Compounder } from '@modules/VDOM/Compounder';
import { VButton } from './components/VDOM/simple/button/button';
import { VInput } from './components/VDOM/simple/input/input';
import './index.scss';
import router, { AppPage } from '@router';
import { VOption } from './components/VDOM/simple/option/option';
import { VirtualElement } from '@modules/VDOM/utils';
import { CSS_center } from './components/VDOM/defaultStyles/VStyles';
import { VBackButton } from './components/VDOM/simple/button/backButton/backButton';
import { VDateInput, VDateInputUI } from './components/VDOM/simple/input/dateInput/dateInput';
import { VProgressBar } from './components/VDOM/simple/progressBar/progressBar';
import { VStars } from './components/VDOM/simple/stars/stars';
import { VStatCard } from './components/VDOM/compound/statCard/statCard';
import { VStatTable } from './components/VDOM/compound/statTable/statTable';
import { VList } from '@VDOM/simple/list/list';

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('./sw.js', { scope: '/' })
// 		.then((res) => {
// 			// console.log('Register SW success', res);
// 		})
// 		.catch((err) => {
// 			// console.log('Register SW failed', err);
// 		});
// }
// router.start();

const button = new VButton("WORK", ()=>{
    progressBar.inject(undefined, ".progressBar__line{ width: 100% }");
    progressBar.update();
});

const input = new VInput("Логин");
input.inject(undefined, '.inputContainer{width: 200px;}');

const option1 = new VOption("МУЖЧИНА");
const option2 = new VOption("ЖЕНЩИНА");

option1.inject(undefined, '', [{
    selector: '.option',
    eventType: 'click',
    handler: ()=>{
        option1.getDOM()?.classList.add("option-checked");
        option2.getDOM()?.classList.remove("option-checked");
    }
}])

option2.inject(undefined, '', [{
    selector: '.option',
    eventType: 'click',
    handler: ()=>{
        option1.getDOM()?.classList.remove("option-checked");
        option2.getDOM()?.classList.add("option-checked");
    }
}])

const backButton = new VBackButton(()=>{
    progressBar.inject(undefined, ".progressBar__line{ width: 0% }");
    progressBar.update();
});

const progressBar = new VProgressBar();

const dateInput = new VDateInput();

const list = new VList();

const root = document.getElementById("root") as HTMLElement;

const compounder = new Compounder();
compounder.down("login-form", `
        width: 500px;
        height: 500px;
        flex-direction: column;
        gap: 10px;
    `+CSS_center);
compounder.add(input);
compounder.add(list);
compounder.down('options', `
        width: 100%;
        height: fit-content;
        flex-direction: row;
        gap: 10px;
    `+CSS_center);
compounder.add(option1);
compounder.add(option2);
compounder.up();
compounder.add(progressBar);
compounder.add(dateInput);
compounder.down('buttons', `
        width: 100%;
        height: fit-content;
        flex-direction: row;
        gap: 10px;
    `+CSS_center);
compounder.add(backButton);
compounder.add(button);
compounder.render(root);