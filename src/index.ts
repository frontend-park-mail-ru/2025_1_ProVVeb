import './index.scss';
import router from '@router';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js', { scope: '/' })
		.then((res) => { })
		.catch((err) => { });
}

router.start();
