import BaseComponent from '@basecomp';
import templateHBS from './progressBar.hbs';

interface ProgressBarParams {
	progressPercent: number;
}

const DEFAULT_PARAMS_PROGRESS_BAR: ProgressBarParams = {
    progressPercent: 0,
};

export default class ProgressBar extends BaseComponent {
    constructor(parentElement: HTMLElement, paramsHBS: Partial<ProgressBarParams> = {}) {
        const finalParamsHBS = { ...DEFAULT_PARAMS_PROGRESS_BAR, ...paramsHBS };
        const templateHTML = templateHBS(finalParamsHBS);
        super(templateHTML, parentElement);
    }
}
