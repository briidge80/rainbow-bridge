import {Component, Input} from '@angular/core';
import {Region} from '../../model/region';
import {NgFor} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';

@Component({
    selector: 'bridge-region',
    standalone: true,
    imports: [NgFor, MatCheckboxModule, MatDividerModule],
    templateUrl: './region.component.html',
    styleUrl: './region.component.less',
})
export class RegionComponent {
    @Input({required: true}) public region!: Region;
}
