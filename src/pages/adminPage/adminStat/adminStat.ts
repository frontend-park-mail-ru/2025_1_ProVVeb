import { VTable } from "@features/table/table";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";

export interface statistic_params {
	A_Total: number;
	A_AverageScore: number;
	A_MinScore: number;
	A_MaxScore: number;

	C_Total: number;
	C_Rejected: number;
	C_Pending: number;
	C_Approved: number;
	С_TotalBy: number;
	C_TotalOn: number;
	C_FirstComplaint: string;
	C_LastComplaint: string;
}

export class VAdminStat extends VBC {
	constructor(values: statistic_params) {
		const style = `
			font-weight: 500;
			color: #939393;
			font-size: 18px;
		`;
		const data1 = [
			{
				key: new VBC(`<div class='a-total-key'>Общее количество:</div>`, {}, `.a-total-key {${style}}`),
				value: new VBC(`<div class='a-total-value'>${values.A_Total}</div>`, {}, `.a-total-value {${style}}`)
			},
			{
				key: new VBC(`<div class='a-avgScore-key'>Средняя оценка:</div>`, {}, `.a-avgScore-key {${style}}`),
				value: new VBC(`<div class='a-avgScore-value'>${Number(Number(values.A_AverageScore).toFixed(2))}</div>`, {}, `.a-avgScore-value {${style}}`)
			},
			{
				key: new VBC(`<div class='a-minScore-key'>Минимальная оценка:</div>`, {}, `.a-minScore-key {${style}}`),
				value: new VBC(`<div class='a-minScore-value'>${values.A_MinScore}</div>`, {}, `.a-minScore-value {${style}}`)
			},
			{
				key: new VBC(`<div class='a-maxScore-key'>Максимальная оценка:</div>`, {}, `.a-maxScore-key {${style}}`),
				value: new VBC(`<div class='a-maxScore-value'>${values.A_MaxScore}</div>`, {}, `.a-maxScore-value {${style}}`)
			}
		];
		const data2 = [
			{
				key: new VBC(`<div class='c-total-key'>Общее количество:</div>`, {}, `.c-total-key {${style}}`),
				value: new VBC(`<div class='c-total-value'>${values.C_Total}</div>`, {}, `.c-total-value {${style}}`)
			},
			{
				key: new VBC(`<div class='c-rejected-key'>Количество отклоненных:</div>`, {}, `.c-rejected-key {${style}}`),
				value: new VBC(`<div class='c-rejected-value'>${values.C_Rejected}</div>`, {}, `.c-rejected-value {${style}}`)
			},
			{
				key: new VBC(`<div class='c-pending-key'>Количество текущих жалоб:</div>`, {}, `.c-pending-key {${style}}`),
				value: new VBC(`<div class='c-pending-value'>${values.C_Pending}</div>`, {}, `.c-pending-value {${style}}`)
			},
			{
				key: new VBC(`<div class='c-approved-key'>Количество обработанных:</div>`, {}, `.c-approved-key {${style}}`),
				value: new VBC(`<div class='c-approved-value'>${values.C_Approved}</div>`, {}, `.c-approved-value {${style}}`)
			},
			{
				key: new VBC(`<div class='c-totalBy-key'>Количество обвинителей:</div>`, {}, `.c-totalBy-key {${style}}`),
				value: new VBC(`<div class='c-totalBy-value'>${values.С_TotalBy}</div>`, {}, `.c-totalBy-value {${style}}`)
			},
			{
				key: new VBC(`<div class='c-totalOn-key'>Количество обвиняемых:</div>`, {}, `.c-totalOn-key {${style}}`),
				value: new VBC(`<div class='c-totalOn-value'>${values.C_TotalOn}</div>`, {}, `.c-totalOn-value {${style}}`)
			},
			{
				key: new VBC(`<div class='c-firstDate-key'>Дата первой жалобы:</div>`, {}, `.c-firstDate-key {${style}}`),
				value: new VBC(`<div class='c-firstDate-value'>${values.C_FirstComplaint}</div>`, {}, `.c-firstDate-value {${style}}`)
			},
			{
				key: new VBC(`<div class='c-lastDate-key'>Дата последней жалобы:</div>`, {}, `.c-lastDate-key {${style}}`),
				value: new VBC(`<div class='c-lastDate-value'>${values.C_LastComplaint}</div>`, {}, `.c-lastDate-value {${style}}`)
			},
		];
		const main = new Compounder();

		main.down('admin', `
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
		`);
		const title1 = new VBC(
			`<p class="title1">Статистика по отзывам</p>`, {},
			`.title1 {
				font-weight: 700;
				font-size: 20px;
				color: #4A4A4A;
			}`
		);
		const title2 = new VBC(
			`<p class="title2">Статистика по жалобам</p>`, {},
			`.title2 {
				font-weight: 700;
				font-size: 20px;
				color: #4A4A4A;
			}`
		);
		const table1 = new VTable(data1);
		const table2 = new VTable(data2);

		main.add(title1).add(table1);
		main.add(title2).add(table2);

		super(main.getTemplate());
		this.vdom = main.getVDOM();
		this.setID();
	}
}
