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
import { VInteresInputFull, VIntreresInput } from '@VDOM/simple/input/interesInput/interesInput';
import { VAddButton } from '@VDOM/simple/button/addButton/addButton';
import { CRegForm } from '@VDOM/compound/regForm/regForm';
import { VBC } from '@modules/VDOM/VBC';

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

const root = document.getElementById("root") as HTMLElement;
document.body.style.background = 'black';
const page = new CRegForm();
page.render(root);

// const root = document.getElementById('root') as HTMLElement;
// const btn = new VButton("BUTTON", ()=>{console.log(btn.getDOM());});
// const backBtn = new VBackButton(()=>{});

// const comp = new Compounder();
// comp.down("form", `
//         width: 100%;
//         height: 100%;
//         flex-direction: column;
//     `+CSS_center);
// comp.add(btn);
// comp.add(backBtn);

// const newComponent = new VBC(
//     comp.getTemplate()
// );

// newComponent.render(root);


// btn.render(root);


// const button = new VButton("WORK", ()=>{
//     progressBar.inject(undefined, ".progressBar__line{ width: 100% }");
//     progressBar.update();
// });

// const input = new VInput("Логин");
// input.inject(undefined, '.inputContainer{width: 200px;}');

// const option1 = new VOption("МУЖЧИНА");
// const option2 = new VOption("ЖЕНЩИНА");

// option1.inject(undefined, '', [{
//     selector: '.option',
//     eventType: 'click',
//     handler: ()=>{
//         option1.getDOM()?.classList.add("option-checked");
//         option2.getDOM()?.classList.remove("option-checked");
//     }
// }])

// option2.inject(undefined, '', [{
//     selector: '.option',
//     eventType: 'click',
//     handler: ()=>{
//         option1.getDOM()?.classList.remove("option-checked");
//         option2.getDOM()?.classList.add("option-checked");
//     }
// }])

// const backButton = new VBackButton(()=>{
//     progressBar.inject(undefined, ".progressBar__line{ width: 0% }");
//     progressBar.update();
// });

// const progressBar = new VProgressBar();

// const dateInput = new VDateInput();

// const list = new VList();

// const interes = new VInteresInputFull();

// const root = document.getElementById("root") as HTMLElement;

// const compounder = new Compounder();
// compounder.down("login-form", `
//         width: 500px;
//         height: 500px;
//         flex-direction: column;
//         gap: 10px;
//     `+CSS_center);
// compounder.add(input);
// compounder.add(list);

// compounder.down("intereses", `
//     width: 100%;
//     height: fit-content;
//     flex-direction: row;
//     gap: 10px;
//     margin-bottom: 10px;
// `+CSS_center);

// const addBtn = new VAddButton(()=>{ 
//     compounder.add(interes);
//     compounder.render(root);
// });

// compounder.add(addBtn);

// compounder.up();

// compounder.down('options', `
//         width: 100%;
//         height: fit-content;
//         flex-direction: row;
//         gap: 10px;
//     `+CSS_center);
// compounder.add(option1);
// compounder.add(option2);
// compounder.up();
// compounder.add(progressBar);
// compounder.add(dateInput);
// compounder.down('buttons', `
//         width: 100%;
//         height: fit-content;
//         flex-direction: row;
//         gap: 10px;
//     `+CSS_center);
// compounder.add(backButton);
// compounder.add(button);
// compounder.render(root);