import { VBanner } from '@features/plan/plan';
import './index.scss';
import router from '@router';
import { VPlan } from '@ui/banner/banner_shop/banner_shop';

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('./sw.js', { scope: '/' })
// 		.then((res) => { })
// 		.catch((err) => { });
// }

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js', { scope: '/' })
		.then((res) => {
			// console.log('Register SW success', res);
		})
		.catch((err) => {
			// console.log('Register SW failed', err);
		});
}

router.start();
