import {Signal, computed} from '@angular/core';
import {Check} from './check';
import {Pool} from './world';

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

    public availableChecks(pool: Pool): number {
        if (!this.requirements()) {
            return 0;
        }
        return this.checks.filter((check) => check.pool === pool && check.available() && !check.checked()).length;
    }
}
