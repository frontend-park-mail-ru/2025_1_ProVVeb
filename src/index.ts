import './index.scss';
import router, { AppPage } from '@router';
import store from '@store';

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('./sw.js', { scope: '/' })
// 		.then((res) => {
// 			// console.log('Register SW success', res);
// 		})
// 		.catch((err) => {
// 			// console.log('Register SW failed', err);
// 		});
// }

store.setState('currentPage', []);
router.start();
