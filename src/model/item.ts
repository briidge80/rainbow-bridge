import {computed} from '@angular/core';
import {Obtainable, World} from './world';

/**
 * Some items are booleans (either you have it or you don't) such as boomerang, hover boots, and hammer
 * Some items are meaninglessly progressive (progressive, but no checks are blocked by the different levels) such as bow, bomb bag, and magic
 *   - Do we need to differentiate between booleans and meaninglessly progressive items?
 * Some items are meaningfully progressive (different lengths or intensities block different checks) such as strength and hookshot
 *   - Do we make different requirements for each? Or do we use a `count` instead of `complete`?
 */
export class Item implements Obtainable {
    public readonly has = computed((): boolean => this.world.count(this) > 0);
    public readonly inventoryImage = computed(
        (): string => this.images[Math.max(0, this.world.count(this) - 1)] ?? this.images.at(-1),
    );
    public readonly checkImage: string = this.images[0];

    constructor(
        protected readonly world: World,
        public readonly name: string,
        public readonly images: [string, ...string[]],
    ) {
        world.items.push(this);
    }
}

// Song, Song Check?

// Medallion/Stone/Dungeon reward?

// Hints/Gossip stones
