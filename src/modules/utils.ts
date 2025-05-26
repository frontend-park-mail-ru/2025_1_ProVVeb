import api from '@network';
import store from '@store';

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
	const notificationWS = new WebSocket(`${api.WS_NOTIF_URL}`);
	store.setState('notificationWS', notificationWS);

	notificationWS.onopen = () => { };
	notificationWS.onclose = () => { };

	notificationWS.onmessage = (response) => {
		const message = JSON.parse(response.data);
		let a = 0, b = 0;

		for (let data of message.notifications) {
			if (data.type == 'message' && data.read == 0)
				a++;
			if (data.type == 'match' && data.read == 0)
				b++;
			if (data.type == 'flowers' && data.read == 0) {
				const anim = document.getElementsByClassName("base-anim")[0];
				anim.classList.toggle('anim');
				setTimeout(() => { anim.classList.toggle('anim'); }, 500);
			}
		}
		store.setState('notif_messanger', a);
		store.setState('notif_matches', b);
	};
}
