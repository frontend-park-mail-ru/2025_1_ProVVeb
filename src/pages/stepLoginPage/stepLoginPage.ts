import { CRegForm } from '@features/regForm/regForm';
import HeaderGreeting from '@compound/headerGreeting/headerGreeting';
import { CReg20 } from '@features/regForm/steps/step1_intro';
import { CReg40 } from '@features/regForm/steps/step2_conf';
import { CReg60 } from '@features/regForm/steps/step3_interests';
import { CReg80 } from '@features/regForm/steps/step4_prefs';
import { CReg80_3 } from '@features/regForm/steps/step5_aboutMe';
import { CReg100 } from '@features/regForm/steps/step6_photo';
import { CRegFinish } from '@features/regForm/steps/step7_outro';
import { VBC } from '@VDOM/VBC';
import router, { AppPage } from '@modules/router';
import store from '@store';
import Confirm from '@simple/confirm/confirm';
import BasePage from '../BasePage';

interface StepConfig {
	height: number;
	percent: number;
	title: string;
	component: VBC;
	onNext?: () => void;
	onAfter?: () => void;
	onPrev?: () => void;
}

export default class StepPage extends BasePage {
	private isOK: boolean = true;

	private components: HeaderGreeting;

	private steps: CRegForm[] = [];

	private currentIndex = 0;

	constructor(parentElement: HTMLElement) {
		super(parentElement);
		this.components = new HeaderGreeting(parentElement);
		this.initSteps();
	}

	private initSteps() {
		const reg20 = new CReg20();
		const reg40 = new CReg40();
		const reg60 = new CReg60();
		const reg80 = new CReg80();
		const reg80_2 = new CReg80();
		const reg80_3 = new CReg80_3();
		const reg100 = new CReg100();
		const finish = new CRegFinish();

		const configs: StepConfig[] = [
			{
				height: 470, percent: 20, title: 'Давай познакомимся 😊', component: reg20, onNext: () => reg20.submit(), onAfter: () => { reg40.updateTemplate(); }
			},
			{
				height: 420, percent: 40, title: 'Расскажи о себе 📖', component: reg40, onNext: () => reg40.submit(), onPrev: () => { reg20.updateTemplate(); }, onAfter: () => { reg60.updateTemplate(); }
			},
			{
				height: 500, percent: 60, title: 'Чем ты увлекаешься? 🤩', component: reg60, onNext: () => reg60.submit(), onPrev: () => { reg40.updateTemplate(); }, onAfter: () => { reg80.updateTemplate(true); }
			},
			{
				height: 520, percent: 70, title: 'На что ты способен? 👇', component: reg80, onNext: () => reg80.submit(true), onPrev: () => { reg60.updateTemplate(); }, onAfter: () => { reg80_2.updateTemplate(false); }
			},
			{
				height: 520, percent: 70, title: 'Чего ты ждешь? 👆', component: reg80_2, onNext: () => reg80_2.submit(false), onPrev: () => { reg80.updateTemplate(true); }, onAfter: () => { reg80_3.updateTemplate(); }
			},
			{
				height: 520, percent: 80, title: 'Излей свою душу ✍️', component: reg80_3, onNext: () => reg80_3.submit(reg100), onPrev: async () => { reg80_2.updateTemplate(false); }, onAfter: async () => { await reg100.updateData(); }
			},
			{
				height: 500,
				percent: 90,
				title: 'Покажи себя миру 📷',
				component: reg100,
				onPrev: () => { reg80_3.updateTemplate(); },
				onNext: () => reg100.uploadFiles(),
				onAfter: () => {
					const target = document.querySelector('.btn') as HTMLElement;
					target.innerHTML = 'ЗАВЕРШИТЬ';
					const another = target.firstChild as HTMLElement;
					another.style = 'font-weight: 700';
				}
			},
			{
				height: 512, percent: 100, title: 'Добро пожаловать! 👋', component: finish, onPrev: () => { reg100.updateData(); }, onNext: () => { finish.submit(); }
			},
		];

		this.steps = configs.map(({
			height, percent, title, component, onNext, onAfter, onPrev
		}, index) => {
			const form = new CRegForm(height, percent, title, component);

			if (index < configs.length - 1) {
				form.injectScript('.btn', 'click', async () => {
					if (onNext) {
						this.isOK = await onNext();
						if (!this.isOK) { return; }
					}

					this.steps[this.currentIndex].delete();
					this.currentIndex++;
					this.steps[this.currentIndex].render(this.parentElement);
					if (onAfter) { onAfter(); }
				});
			} else {
				form.injectScript('.btn', 'click', (e) => {
					router.navigateTo(AppPage.Feed);
				});
				form.inject(undefined, `
                    .btn {
                        background: var(--main-theme);
                        color: white;
                    }
                    .btn__title {
                        color: white;
                    }
                `);
			}

			form.injectScript('.backButton', 'click', async () => {
				if (index > 0) {
					if (onNext && index != 7 && index != 5) {
						onNext();
					}

					this.steps[this.currentIndex].delete();
					this.currentIndex--;
					this.steps[this.currentIndex].render(this.parentElement);
					if (onPrev) { onPrev(); }
				} else {
					const confirm = new Confirm({
						headTitle: 'Действительно хотите перейти?',
						title: 'Вы потеряете все изменения!',
						isWarning: true
					});
					if (await confirm.render()) {
						router.navigateTo(AppPage.Login);
					}
				}
			});

			return form;
		});
	}

	async render(): Promise<void> {
		const profile = {
			profileId: 6,
			firstName: '',
			lastName: '',
			isMale: true,
			height: 180,
			birthday: '',
			description: '',
			location: '',
			interests: [],
			likedBy: [],
			preferences: [],
			photos: []
		};
		store.setState('myProfile', profile);

		this.components.render();
		this.currentIndex = 0;
		this.steps[this.currentIndex].forceRender(this.parentElement);
	}
}
