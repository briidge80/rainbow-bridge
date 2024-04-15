import {Check} from './check';
import {Area} from './area';
import {Item} from './item';
import {Injectable, Signal, computed} from '@angular/core';

@Injectable({providedIn: 'root'})
export class World {
    private readonly has = (item: Item, count: number = 1) =>
        computed(
            (): boolean => this.allChecks.filter((check) => check.item() === item && check.checked()).length >= count,
        );

    public readonly areas: ReadonlyArray<Area> = [
        new Area('Kokiri Forest', [
            new Check('Midos Top Left Chest'),
            new Check('Midos Top Right Chest'),
            new Check('Midos Bottom Left Chest'),
            new Check('Midos Bottom Right Chest'),
            new Check('Kokiri Sword Chest'),
            new Check('Storms Grotto Chest'),
            new Check('Outside Storms Hint'),
            new Check('Storms Grotto Hint'),
        ]),
        new Area(
            'Deku Tree',
            [
                new Check('Map Chest'),
                new Check('Slingshot Room Side Chest'),
                new Check('Slingshot Chest'),
                new Check('Compass Chest'),
                new Check('Compass Room Side Chest'),
                new Check('Basement Chest'),
                new Check('Queen Gohma Heart'),
            ],
            this.has(Item.KokiriSword),
        ),
        new Area('Lost Woods', [
            new Check('Ocarina Memory Game'),
            new Check('Target in Woods', this.has(Item.Slingshot)),
            new Check('Near Shortcuts Grotto Chest', this.has(Item.BombBag)),
            new Check('Deku Theater Skull Mask'),
            new Check('Deku Theater Mask of Truth'),
            new Check('Skull Kid' /*, Saria's song*/),
            new Check('Deku Scrub Near Bridge'),
            new Check('Deku Scrub Grotto Front', this.has(Item.BombBag)),
        ]),
    ];

    private readonly allChecks = this.areas.reduce<Check[]>((checks, area) => checks.concat(area.checks), []);
}
