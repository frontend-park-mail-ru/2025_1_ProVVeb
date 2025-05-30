import { Compounder } from '@VDOM/Compounder';
import { VBC } from '@VDOM/VBC';
import store from '@store';
import { VComplaintBody } from '@ui/complaint/body/body';
import api, { Profile, User } from '@network';
import Notification from '@notification';
import { CReg100 } from '../../100/100';

export class CReg80_3 extends VBC {
	private comp: VComplaintBody;

	private isCreated: boolean = false;

	constructor() {
		const main = new Compounder();
		const comp = new VComplaintBody('', 'Напиши немного о себе:');
		comp.inject(undefined, `
            .complaintBody__input {
                height: 250px;
            }    
        `);
		main.add(comp);

		super(main.getTemplate());
		this.vdom = main.getVDOM();
		this.setID();

		this.comp = comp;
	}

	public updateTemplate(): void {
		const profile = store.getState('myProfile') as any;
		this.comp.setValue(profile.description);
	}

	public async submit(page?: CReg100): Promise<boolean> {
		const buffer = store.getState('myProfile') as any;

		const description = this.comp.getValue();
		if (description === '') {
			new Notification({
				headTitle: 'Ошибка валидации',
				title: 'Описание обязательное поле',
				isWarning: true,
				isWithButton: true,
			}).render();
			return false;
		}
		buffer.description = this.comp.getValue();

		store.setState('myProfile', buffer);
		const profile = store.getState('myProfile') as Profile;
		const user = store.getState('myUser') as User;

		if (!this.isCreated) {
			const respond = await api.loginUser(user, profile);
			if (respond.success) {
				new Notification({
					headTitle: 'Успех!',
					isWarning: true,
					isWithButton: true,
					title: 'Аккаунт успешно создан',
				}).render();
				this.isCreated = true;

				api.authUser(user.login, user.password).then(async (respond) => {
					store.setState('myID', respond.data.user_id);
					store.setState('inSession', true);

					const data = await api.getProfile(respond.data.user_id);
					const ava = api.BASE_URL_PHOTO + (data?.data?.photos[0] ?? '');
					const name = `${data?.data?.firstName} ${data?.data?.lastName}`;
					const isAdmin = data?.data?.isAdmin;
					const isPremium = data?.data?.Premium.Status;
					const premiumBorder = data?.data?.Premium.Border;
					if (name) { store.setState('profileName', name); }
					if (ava) { store.setState('ava', ava); }
					if (isAdmin != undefined) { store.setState('isAdmin', isAdmin); }
					if (isPremium != undefined) { store.setState('isPremium', isPremium); store.setState('premiumBorder', premiumBorder); }

					page?.updateData();
				});
			} else {
				new Notification({
					isWarning: true,
					isWithButton: true,
					title: 'Ошибка сети. Попробуйте позже',
				}).render();
				return false;
			}
		} else {
			profile.isMale = (profile.isMale !== store.getState('isMale'));
			api.updateProfile(profile as any).then(() => {
				new Notification({
					headTitle: 'Успех!',
					isWarning: true,
					isWithButton: true,
					title: 'Данные успешно обновлены на сервере',
				}).render();
			}).catch(() => {
				new Notification({
					isWarning: true,
					isWithButton: true,
					title: 'Ошибка сети. Попробуйте позже',
				}).render();
			});
		}
		return true;
	}
}
