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
import { CReg20 } from '@VDOM/compound/regForm/20/20';
import { CReg40 } from '@VDOM/compound/regForm/40/40';
import { CReg60 } from '@VDOM/compound/regForm/60/60';
// import CReg100 from '@VDOM/compound/regForm/100/100';
import { CRegFinish } from '@VDOM/compound/regForm/finish/finish';
import { VCatalog } from '@VDOM/simple/list/catalog/catalog';
import { VTable } from '@VDOM/compound/table/table';
import { CReg80 } from '@VDOM/compound/regForm/80/80';
import { CReg80_3 } from '@VDOM/compound/regForm/80/803/803';
import { VPhotoInput } from '@VDOM/simple/input/photoInput/photoInut';
import { CReg100 } from '@VDOM/compound/regForm/100/100';
import api from '@network';
import store from '@store';
// import { CRegPhotos } from '@VDOM/compound/regForm/100/100';
// import { CReg100 } from '@VDOM/compound/regForm/100.ts/100';

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('./sw.js', { scope: '/' })
// 		.then((res) => {
// 			// console.log('Register SW success', res);
// 		})
// 		.catch((err) => {
// 			// console.log('Register SW failed', err);
// 		});
// }

// router.navigateTo(AppPage.StepPage);
router.start();

// const c = new VPhotoInput();
// c.render(document.getElementById('root') as HTMLElement);
// store.setState("myID", 1);

// const main = new CRegFinish();

// const root = document.getElementById("root") as HTMLElement;
// root.style.background = 'black';
// document.body.style.background = 'black';
// const page1 = new CRegForm(520, 20, "Давай познакомимся 😊", main);

// page1.injectScript('.btn', 'click', async ()=>{
//     const flag = await main.uploadFiles();
//     if(flag) page1.delete();
// });

// page1.render(root);

// const photosComponent = new CRegPhotos(6);
// photosComponent.render(document.getElementById('root') as HTMLElement);

// const page = new CReg100(document.getElementById("root") as HTMLElement);
// page.render();