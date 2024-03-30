import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RegionComponent} from './region/region.component';
import {Region} from '../model/region';
import {Check} from '../model/check';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RegionComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    protected readonly region = new Region('Kokiri Forest', [
        new Check('Midos Top Left Chest'),
        new Check('Midos Top Right Chest'),
        new Check('Midos Bottom Left Chest'),
        new Check('Midos Bottom Right Chest'),
        new Check('Kokiri Sword Chest'),
        new Check('Storms Grotto Chest'),
        new Check('Outside Storms Hint'),
        new Check('Storms Grotto Hint'),
    ]);
}
