import {Component, Input, input} from '@angular/core';
import {Area} from '../../model/area';
import {MatDividerModule} from '@angular/material/divider';
import {CheckComponent} from '../check/check.component';
import {World} from '../../model/world';

@Component({
    selector: 'bridge-area',
    standalone: true,
    imports: [MatDividerModule, CheckComponent],
    templateUrl: './area.component.html',
    styleUrl: './area.component.less',
})
export class AreaComponent {
    public readonly area = input.required<Area>();

    constructor(protected readonly world: World) {}
}
