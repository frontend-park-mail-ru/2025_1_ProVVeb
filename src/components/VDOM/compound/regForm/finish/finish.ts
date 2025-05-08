import router, { AppPage } from '@modules/router';
import { Compounder } from '@modules/VDOM/Compounder';
import { VBC } from '@modules/VDOM/VBC';

export class CRegFinish extends VBC {
    constructor() {
        const arr = [
            {
                title: 'Будь собой',
                text: 'Сервис обеспечит полную конфидециальность. Ни один злоумышленник не получит твои данные'
            },
            {
                title: 'Познай позитив',
                text: 'Даже если никто не лайкнет твой профиль - знай, люди еще не увидели твою истинную красоту'
            },
            {
                title: 'Уважай комьюнити',
                text: 'Только в том случае, когда каждый уважает своих окружающих - появляется тот самый вайб :)'
            }
        ];

        const main = new Compounder();
        const components = arr.forEach((el) => {
            const text1 = new VBC(`
                <div class="textBlock">
                    <div class="textBlock__title">
                        <img class="title__img" src="./media/icons/check.svg">
                        <p class="title__content">${el.title}</p>
                    </div>
                    <div class="textBlock__text">
                        <p class="text__content">${el.text}</p>
                    </div>
                </div>
                `, {}, `
                    .textBlock {
                        width: 336px;
                        height: fit-content;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        gap: 10px;
                    }
                    .title__content {
                        font-weight: 500;
                        font-size: 16px;
                        color: #4A4A4A;
                    }
                    .text__content {
                        font-weight: 500;
                        font-size: 12px;
                        color: grey;
                    }
                    .textBlock__text {
                        width: 100%;
                        height: fit-content;
                    }
                    .textBlock__title {
                        display: flex;
                        justify-content: flex-start;
                        flex-direction: row;
                        gap: 19px;
                    }
                `
            );
            main.add(text1);
        });

        super(main.getTemplate());
        this.vdom = main.getVDOM();
        this.setID();
    }

    public submit() { router.navigateTo(AppPage.Feed); }
}
