import {Component, inject} from '@angular/core';
import {AreaComponent} from './area/area.component';
import {World} from '../model/world';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AreaComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    constructor(protected readonly world: World) {}
}
