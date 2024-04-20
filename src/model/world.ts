import {Check} from './check';
import {Area} from './area';
import {Item} from './item';
import {Injectable, Signal, computed} from '@angular/core';

@Injectable({providedIn: 'root'})
export class World {
    public readonly allItems: Item[] = [];

    constructor() {
        this.allItems = this.allItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    private has(item: Item, count: number = 1): Signal<boolean> {
        return computed(
            (): boolean => this.allChecks.filter((check) => check.item() === item && check.checked()).length >= count,
        );
    }

    public count(item: Item): number {
        return this.allChecks.filter((check) => check.item() === item && check.checked()).length;
    }

    public readonly BombBag = new Item(this, 'Bomb bag', ['/assets/bomb-bag.png']);
    public readonly Bow = new Item(this, 'Bow', ['/assets/bow.png']);
    public readonly FireArrows = new Item(this, 'Fire arrows', ['/assets/fire-arrows.png']);
    public readonly LightArrows = new Item(this, 'Light arrows', ['/assets/light-arrows.png']);
    public readonly DinsFire = new Item(this, "Din's Fire", ['/assets/dins-fire.png']);
    public readonly KokiriSword = new Item(this, 'Kokiri sword', ['/assets/kokiri-sword.png']);
    public readonly Slingshot = new Item(this, 'Slingshot', ['/assets/slingshot.png']);
    public readonly Hookshot = new Item(this, 'Hookshot', ['/assets/hookshot.png', '/assets/longshot.png']);
    public readonly MirrorShield = new Item(this, 'Mirror shield', ['/assets/mirror-shield.png']);
    public readonly Boomerang = new Item(this, 'Boomerang', ['/assets/boomerang.png']);
    public readonly LensOfTruth = new Item(this, 'Lens of Truth', ['/assets/lens-of-truth.png']);
    public readonly MegatonHammer = new Item(this, 'Megaton hammer', ['/assets/megaton-hammer.png']);
    public readonly GoronTunic = new Item(this, 'Goron tunic', ['/assets/goron-tunic.png']);
    public readonly ZoraTunic = new Item(this, 'Zora tunic', ['/assets/zora-tunic.png']);
    public readonly Wallet = new Item(this, 'Wallet', ['/assets/adult-wallet.png', '/assets/giants-wallet.png']);
    public readonly Bottle = new Item(this, 'Bottle', ['/assets/bottle.png']);
    public readonly RutosLetter = new Item(this, "Ruto's Letter", ['/assets/rutos-letter.png']);
    public readonly IronBoots = new Item(this, 'Iron boots', ['/assets/iron-boots.png']);
    public readonly HoverBoots = new Item(this, 'Hover boots', ['/assets/hover-boots.png']);
    public readonly Scale = new Item(this, 'Scale', ['/assets/silver-scale.png', '/assets/golden-scale.png']);
    public readonly Magic = new Item(this, 'Magic', ['/assets/magic.png']);
    public readonly Strength = new Item(this, 'Strength', [
        '/assets/goron-bracelet.png',
        '/assets/silver-gauntlets.png',
        '/assets/golden-gauntlets.png',
    ]);

    public readonly areas: ReadonlyArray<Area> = [
        new Area('Kokiri Forest', [
            new Check(this, 'Midos Top Left Chest'),
            new Check(this, 'Midos Top Right Chest'),
            new Check(this, 'Midos Bottom Left Chest'),
            new Check(this, 'Midos Bottom Right Chest'),
            new Check(this, 'Kokiri Sword Chest'),
            new Check(this, 'Storms Grotto Chest'),
            new Check(this, 'Outside Storms Hint'),
            new Check(this, 'Storms Grotto Hint'),
        ]),
        new Area(
            'Deku Tree',
            [
                new Check(this, 'Map Chest'),
                new Check(this, 'Slingshot Room Side Chest'),
                new Check(this, 'Slingshot Chest'),
                new Check(this, 'Compass Chest'),
                new Check(this, 'Compass Room Side Chest'),
                new Check(this, 'Basement Chest'),
                new Check(this, 'Queen Gohma Heart'),
            ],
            this.has(this.KokiriSword),
        ),
        new Area('Lost Woods', [
            new Check(this, 'Ocarina Memory Game'),
            new Check(this, 'Target in Woods', this.has(this.Slingshot)),
            new Check(this, 'Near Shortcuts Grotto Chest', this.has(this.BombBag)),
            new Check(this, 'Deku Theater Skull Mask'),
            new Check(this, 'Deku Theater Mask of Truth'),
            new Check(this, 'Skull Kid' /*, Saria's song*/),
            new Check(this, 'Deku Scrub Near Bridge'),
            new Check(this, 'Deku Scrub Grotto Front', this.has(this.BombBag)),
        ]),
    ];

    private readonly allChecks = this.areas.reduce<Check[]>((checks, area) => checks.concat(area.checks), []);
}
