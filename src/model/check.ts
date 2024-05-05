import {computed} from '@angular/core';
import {localStorageSignal} from '../util/localstoragesignal';
import {Obtainable, World} from './world';

const sphere0 = computed(() => true);

export class Check {
    public readonly checked = localStorageSignal<boolean>(`${this.name} [CHECKED]`, false);
    public readonly item = localStorageSignal<Obtainable | undefined>(
        `${this.name} [OBTAINABLE]`,
        undefined,
        (_key, value: unknown): Obtainable | undefined =>
            typeof value === 'string' ? this.world.allObtainables.find((item) => item.name === value) : undefined,
        (_key, value: Obtainable | undefined): string | undefined => value?.name,
    );

    constructor(
        private readonly world: World,
        public readonly name: string,
        public readonly pool: readonly Obtainable[],
        public readonly available: () => boolean = sphere0,
    ) {}
}
