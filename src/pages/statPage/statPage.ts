import BasePage from '../BasePage';
import { Compounder } from '@modules/VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VBC } from '@modules/VDOM/VBC';
import { VStatTable } from '@VDOM/compound/statTable/statTable';
import { VStatCard } from '@VDOM/compound/statCard/statCard';

function getCards(cards: StatParams[]): VBC[] {
    let ans: VBC[] = [];

    for(let card of cards){
        const statCard = new VStatCard(card.login, card.score, card.answer) as VBC;
        if(card.name == "CSAT")
            ans.push(statCard);
    }

    return ans;
}

interface StatParams {
    name: string,
    description: string,
    min_score: number,
    max_score: number,
    login: string,
    answer: string,
    score: number
}

function getSum(cards: StatParams[]): number{ 
    let ans = 0;
    for(let card of cards)
        if(card.name == "CSAT")
            ans+=card.score;
    return ans;
}

export default class StatPage extends BasePage {
    private components: Array<HeaderMain | NavMenu>;
    private contentWrapper: HTMLElement;
    private compounder1: Compounder;
    private compounder2: Compounder;
    private cards: StatParams[];

    constructor(parentElement: HTMLElement) {
        super(parentElement);

        this.contentWrapper = document.createElement('div');
        this.contentWrapper.className = 'mainContent';

        this.components = [
            new HeaderMain(parentElement),
            new NavMenu(this.contentWrapper),
        ];


        this.cards = [{
            name: "CSAT",
            description: "",
            min_score: 2,
            max_score: 4,
            login: "yudinda",
            answer: "string",
            score: 4
        }]; //ручка


        let table = new VStatTable(0, 0, 5, 2.5)
        if(this.cards.length !== 0){
            const n = this.cards.length;
            const min = this.cards[0].min_score;
            const max = this.cards[0].max_score;
            const avg = Number((getSum(this.cards)/n).toFixed(2));
            table = new VStatTable(n, min, max, avg);
        }
        

        this.compounder1 = new Compounder;
        this.compounder1.down('mainContent__central', '');
        for(let card of getCards(this.cards))
            this.compounder1.add(card);

        this.compounder2 = new Compounder;
        this.compounder2.down('mainContent__right', '');
        this.compounder2.add(table);
    }

    render(): void {
        this.contentWrapper.innerHTML = '';
        this.components[0].render();
        this.parentElement.appendChild(this.contentWrapper);
        this.components[1].render();

        this.compounder1.addTo(this.contentWrapper);
        this.compounder2.addTo(this.contentWrapper);
    }

    public getNavMenu(): NavMenu {
        return this.components[1] as NavMenu;
    }
}