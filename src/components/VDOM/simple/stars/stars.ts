import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './stars.hbs'

function convertPoints(point: number): boolean[]{
    let ans: boolean[] = [];
    for(let i=1;i<=5;i++)
        if(i<=point)
            ans.push(true);
        else
            ans.push(false);

    return ans;
}

export class VStars extends VBC{
    constructor(point: number){
        super(
            templateHBS,
            { links: [false, false, false, false, false] },
            '',
            [],
            {links: convertPoints(point)}
        );
    }
}