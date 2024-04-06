import {Component, Input} from '@angular/core';
import {Area} from '../../model/area';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';

@Component({
    selector: 'bridge-area',
    standalone: true,
    imports: [MatCheckboxModule, MatDividerModule],
    templateUrl: './area.component.html',
    styleUrl: './area.component.less',
})
export class AreaComponent {
    @Input({required: true}) public area!: Area;
}
