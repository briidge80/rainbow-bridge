import {computed} from '@angular/core';
import {Item} from './item';
import {localStorageSignal} from '../util/localstoragesignal';

const sphere0 = computed(() => true);

export class Check {
    public readonly checked = localStorageSignal<boolean>(`${this.name} [CHECKED]`, false);
    public readonly item = localStorageSignal<Item | undefined>(
        `${this.name} [ITEM]`,
        undefined,
        (_key, value: unknown): Item | undefined => (typeof value === 'string' ? Item.get(value) : undefined),
        (_key, value: Item | undefined): string | undefined => value?.name,
    );

    constructor(
        public readonly name: string,
        public readonly available: () => boolean = sphere0,
    ) {}
}
