import api from '@network';
import store from '@store';
import { AppPage } from './router';

export function parseBirthday(dateStr: string): { year: number; month: number; day: number } | null {
	try {
		const date = new Date(dateStr);

		if (Number.isNaN(date.getTime())) {
			return null;
		}

		const currentYear = new Date().getFullYear();
		const year = currentYear - date.getUTCFullYear();
		const month = date.getUTCMonth() + 1;
		const day = date.getUTCDate();

		return { year, month, day };
	} catch (error) {
		return null;
	}
}

export function arraysEqual(a1: (string | undefined)[], a2: (string | undefined)[]): boolean {
	if (a1.length !== a2.length) {
		return false;
	}
	for (let i = 0; i < a1.length; i++) {
		if (a1[i] !== a2[i]) {
			return false;
		}
	}
	return true;
}

export function startNotifications() {
	return new Promise((resolve, reject) => {
		const notificationWS = new WebSocket(`${api.WS_NOTIF_URL}`);
		store.setState('notificationWS', notificationWS);

		notificationWS.onopen = () => {
			resolve(notificationWS);
		};

		notificationWS.onerror = (event) => {
			reject(new Error('Не удалось подключиться к WebSocket'));
		};

		notificationWS.onclose = (event) => {
			if (event.code == 1006)
				startNotifications();
		};

		notificationWS.onmessage = (response) => {
			const message = JSON.parse(response.data);
			let a = 0, b = 0;

			for (const data of message.notifications) {
				if (data.type === 'message' && data.read === 0) { a++; }
				if (data.type === 'match' && data.read === 0) { b++; }
				if (data.type === 'flowers' && data.read === 0) {
					const anim = document.getElementsByClassName('base-anim')[0];
					anim.classList.toggle('anim');
					setTimeout(() => anim.classList.toggle('anim'), 3000);
					notificationWS.send(JSON.stringify({
						type: 'read',
						payload: { notif_type: 'flowers' }
					}));
				}
			}

			const currentPath = window.location.pathname.split('/')[1] as AppPage;
			if (currentPath != AppPage.Messenger)
				store.setState('notif_messanger', a);
			store.setState('notif_matches', b);
		};
	});
}

export function toPrimeClass(border: number): string {
	const classMap: Record<number, string> = {
		0: 'cyberpunk-wave-border',
		1: 'neon-explosion-border',
		2: 'gold-barrier-border',
		3: 'pink-cotton-border',
		4: 'dark-matter-border',
	};
	return classMap[border] ?? '';
}

export function formatISODate(isoString: string) {
	if (isoString == 'N/A') return isoString;
	const date = new Date(isoString);
	const pad = (num) => num.toString().padStart(2, '0');

	return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
