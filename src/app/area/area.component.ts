import {Component, Input} from '@angular/core';
import {Area} from '../../model/area';
import {MatDividerModule} from '@angular/material/divider';
import {CheckComponent} from '../check/check.component';

@Component({
    selector: 'bridge-area',
    standalone: true,
    imports: [MatDividerModule, CheckComponent],
    templateUrl: './area.component.html',
    styleUrl: './area.component.less',
})
export class AreaComponent {
    @Input({required: true}) public area!: Area;
}
