import {Check} from './check';
import {Area} from './area';
import {Item} from './item';
import {Injectable, Signal, computed} from '@angular/core';
import {Song} from './song';

export interface Obtainable {
    readonly name: string;
    readonly checkImage: string;
}

export type Pool = ReadonlyArray<Obtainable>;

@Injectable({providedIn: 'root'})
export class World {
    public readonly items: Item[] = [];
    public readonly songs: Song[] = [];

    private _has(item: Obtainable, count: number = 1): boolean {
        return this.allChecks.filter((check) => check.item() === item && check.checked()).length >= count;
    }

    private has(item: Obtainable, count: number = 1): Signal<boolean> {
        return computed((): boolean => this._has(item, count));
    }

    public count(item: Obtainable): number {
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

    // Child songs
    public readonly ZeldasLullaby = new Song(this, "Zelda's Lullaby", '/assets/zeldas-lullaby.png');
    public readonly EponasSong = new Song(this, "Epona's Song", '/assets/eponas-song.png');
    public readonly SariasSong = new Song(this, "Saria's Song", '/assets/sarias-song.png');
    public readonly SunsSong = new Song(this, "Sun's Song", '/assets/suns-song.png');
    public readonly SongOfTime = new Song(this, 'Song of Time', '/assets/song-of-time.png');
    public readonly SongOfStorms = new Song(this, 'Song of Storms', '/assets/song-of-storms.png');

    // Warp songs
    public readonly MinuetOfForest = new Song(this, 'Minuet of Forest', '/assets/minuet-of-forest.png');
    public readonly BoleroOfFire = new Song(this, 'Bolero of Fire', '/assets/bolero-of-fire.png');
    public readonly SerenadeOfWater = new Song(this, 'Serenade of Water', '/assets/serenade-of-water.png');
    public readonly RequiemOfSpirit = new Song(this, 'Requiem of Spirit', '/assets/requiem-of-spirit.png');
    public readonly NoctureOfShadow = new Song(this, 'Nocturne of Shadow', '/assets/nocturne-of-shadow.png');
    public readonly PreludeOfLight = new Song(this, 'Prelude of Light', '/assets/prelude-of-light.png');

    // Must be created after all the obtainables, but before all the checks.
    // Otherwise, the check might not be able to find the item from localstorage
    // and will clean the localstorage for that check because it assumes it is the default value.
    // This could probably be refactored to be less fragile.
    public readonly allObtainables: readonly Obtainable[] = [...this.items, ...this.songs];

    // TODO medallions

    private readonly Requirements = {
        SacredForestMeadowAdultAccess: computed(() => this._has(this.SariasSong) || this._has(this.MinuetOfForest)),
    };
    public readonly areas: ReadonlyArray<Area> = [
        new Area('Kokiri Forest', [
            new Check(this, 'Midos Top Left Chest', this.items),
            new Check(this, 'Midos Top Right Chest', this.items),
            new Check(this, 'Midos Bottom Left Chest', this.items),
            new Check(this, 'Midos Bottom Right Chest', this.items),
            new Check(this, 'Kokiri Sword Chest', this.items),
            new Check(this, 'Storms Grotto Chest', this.items),
            new Check(this, 'Outside Storms Hint', this.items),
            new Check(this, 'Storms Grotto Hint', this.items),
        ]),
        new Area(
            'Deku Tree',
            [
                new Check(this, 'Map Chest', this.items),
                new Check(this, 'Slingshot Room Side Chest', this.items),
                new Check(this, 'Slingshot Chest', this.items),
                new Check(this, 'Compass Chest', this.items),
                new Check(this, 'Compass Room Side Chest', this.items),
                new Check(this, 'Basement Chest', this.items),
                new Check(this, 'Queen Gohma Heart', this.items),
            ],
            this.has(this.KokiriSword),
        ),
        new Area('Lost Woods', [
            new Check(this, 'Ocarina Memory Game', this.items),
            new Check(this, 'Target in Woods', this.items, this.has(this.Slingshot)),
            new Check(this, 'Near Shortcuts Grotto Chest', this.items, this.has(this.BombBag)),
            new Check(this, 'Deku Theater Skull Mask', this.items),
            new Check(this, 'Deku Theater Mask of Truth', this.items),
            new Check(this, 'Skull Kid', this.items /*, Saria's song*/),
            new Check(this, 'Deku Scrub Near Bridge', this.items),
            new Check(
                this,
                'Deku Scrub Grotto Front',
                this.items,
                computed(
                    () =>
                        this._has(this.BombBag) ||
                        (this._has(this.MegatonHammer) && this.Requirements.SacredForestMeadowAdultAccess()),
                ),
            ),
        ]),
        new Area('Sacred Forest Meadow', [
            new Check(
                this,
                "Wolfo's Grotto",
                this.items,
                computed(
                    () =>
                        this._has(this.BombBag) ||
                        (this._has(this.MegatonHammer) && this.Requirements.SacredForestMeadowAdultAccess()),
                ),
            ),
            new Check(this, 'Song from Saria', this.songs),
            new Check(this, 'Sheik in Forest', this.songs, this.Requirements.SacredForestMeadowAdultAccess),
        ]),
    ];

    private readonly allChecks = this.areas.reduce<Check[]>((checks, area) => checks.concat(area.checks), []);
}
