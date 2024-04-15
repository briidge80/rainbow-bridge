import {Signal, computed} from '@angular/core';
import {Check} from './check';

/**
 * An area is a group of checks that can be hinted for a path.
 * e.g. Graveyard on the path to Morpha --> "Graveyard" is an "area"
 */
export class Area {
    constructor(
        public readonly name: string,
        public readonly checks: readonly Check[],
        public readonly requirements?: Signal<boolean>,
    ) {}

    public readonly availableChecks = computed((): ReadonlyArray<Check> => {
        return this.checks.filter((check) => check.available());
    });
}
