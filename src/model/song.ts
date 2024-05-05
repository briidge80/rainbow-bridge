import {computed} from '@angular/core';
import {Obtainable, World} from './world';

export class Song implements Obtainable {
    public readonly has = computed((): boolean => this.world.count(this) > 0);
    public readonly inventoryImage = computed((): string => this.image);
    public readonly checkImage: string = this.image;

    constructor(
        private readonly world: World,
        public readonly name: string,
        public readonly image: string,
    ) {
        this.world.songs.push(this);
    }
}

// Song, Song Check?

// Medallion/Stone/Dungeon reward?

// Hints/Gossip stones
