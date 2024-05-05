import {Signal, computed} from '@angular/core';
import {Check} from './check';

const sphere0 = computed(() => true);

/**
 * An area is a group of checks that can be hinted for a path.
 * e.g. Graveyard on the path to Morpha --> "Graveyard" is an "area"
 */
export class Area {
    constructor(
        public readonly name: string,
        public readonly checks: readonly Check[],
        public readonly requirements: Signal<boolean> = sphere0,
    ) {}

    public readonly availableChecks = computed((): ReadonlyArray<Check> => {
        if (!this.requirements()) {
            return [];
        }
        return this.checks.filter((check) => check.available() && !check.checked());
    });
}
