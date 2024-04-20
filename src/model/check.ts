import {computed} from '@angular/core';
import {Item} from './item';
import {localStorageSignal} from '../util/localstoragesignal';
import {World} from './world';

const sphere0 = computed(() => true);

export class Check {
    public readonly checked = localStorageSignal<boolean>(`${this.name} [CHECKED]`, false);
    public readonly item = localStorageSignal<Item | undefined>(
        `${this.name} [ITEM]`,
        undefined,
        (_key, value: unknown): Item | undefined =>
            typeof value === 'string' ? this.world.allItems.find((item) => item.name === value) : undefined,
        (_key, value: Item | undefined): string | undefined => value?.name,
    );

    constructor(
        private readonly world: World,
        public readonly name: string,
        public readonly available: () => boolean = sphere0,
    ) {}
}
