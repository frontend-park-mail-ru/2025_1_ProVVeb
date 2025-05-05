import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import store from "@store";
import { VComplaintBody } from "@VDOM/simple/complaint/body/body";
import api, { Profile, User } from '@network';
import Notification from "@simple/notification/notification";
import { CReg100 } from "../../100/100";

export class CReg80_3 extends VBC {
    private comp: VComplaintBody;
    private isCreated: boolean = false;

    constructor(){
        const main = new Compounder();
        const comp = new VComplaintBody("", "Напиши немного о себе:");
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
        const profile = store.getState("myProfile") as any;
        this.comp.setValue(profile.description);
    }

    public async submit(page?: CReg100): Promise<void> {
        const buffer = store.getState("myProfile") as any;

        buffer.description = this.comp.getValue();

        store.setState("myProfile", buffer);
        const profile = store.getState("myProfile") as Profile;
        const user = store.getState("myUser") as User;
        
        if(!this.isCreated){
            const respond = await api.loginUser(user, profile);
            if(respond.success){
                new Notification({
                    headTitle: "Успех!",
                    isWarning: true,
                    isWithButton: true,
                    title: "Аккаунт успешно создан",
                }).render();
                this.isCreated = true;

                api.authUser(user.login, user.password).then(async (respond)=>{
                    store.setState("myID", respond.data.user_id);
                    store.setState('inSession', true);

                    const data = await api.getProfile(respond.data.user_id);
                    const ava = api.BASE_URL_PHOTO + data?.data?.photos[0];
                    const name = data?.data?.firstName + ' ' + data?.data?.lastName;
                    if (name) store.setState('profileName', name);
                    if (ava) store.setState('ava', ava);

                    page?.updateData();
                });
            }else{
                new Notification({
                    isWarning: true,
                    isWithButton: true,
                    title: "Ошибка сети. Попробуйте позже",
                }).render();
            }
        }else{
            profile.isMale = (profile.isMale != store.getState("isMale"));
            api.updateProfile(profile as any).then(()=>{
                new Notification({
                    headTitle: "Успех!",
                    isWarning: true,
                    isWithButton: true,
                    title: "Данные успешно обновлены на сервере",
                }).render();
            }).catch(()=>{
                new Notification({
                    isWarning: true,
                    isWithButton: true,
                    title: "Ошибка сети. Попробуйте позже",
                }).render();
            });
        }

            // api.authUser(loginValue, passwordValue).then(async (respond) => {
            // 			if (respond.success) {
            // 				store.setState('myID', respond.data.user_id);
            // 				store.setState('inSession', true);
            // 				await router.navigateTo(AppPage.Feed);
        
            // 				const data = await api.getProfile(respond.data.user_id);
            // 				const ava = api.BASE_URL_PHOTO + data?.data?.photos[0];
            // 				const name = data?.data?.firstName + ' ' + data?.data?.lastName;
        
            // 				if (name) store.setState('profileName', name);
            // 				if (ava) store.setState('ava', ava);
            // 			} else {
            // 				const JSONans = JSON.parse(respond.message as string);
            // 				let ans = '';
            // 				if (JSONans.message == 'sql: no rows in result set')
            // 					ans = 'Такого аккаунта не существует';
            // 				else
            // 					ans = 'Неверный логин или пароль';
            // 				const error = new Notification({
            // 					isWarning: true,
            // 					isWithButton: true,
            // 					title: ans,
            // 				});
            // 				error.render();
            // 			}
            // 		}).catch((error: Error) => {
            // 			const Error = new Notification({
            // 				isWarning: true,
            // 				isWithButton: true,
            // 				title: "Ошибка сети. Попробуйте позже",
            // 			});
            // 			Error.render();
            // 			console.error(error.message);
            // 		});
            // 		//END OF REDIRECT

            // 		// router.navigateTo(AppPage.Auth);
            // 		store.setState('my_new_login', loginValue);
            // 	} else {
            // 		const error = new Notification({
            // 			isWarning: true,
            // 			isWithButton: true,
            // 			title: respond.message || 'Invalid credentials',
            // 		});
            // 		error.render();
            // 	}
            // }).catch((error: string) => {
            // 	const Error = new Notification({ isWarning: true, isWithButton: true, title: error });
            // 	Error.render();
            // });
    }
}