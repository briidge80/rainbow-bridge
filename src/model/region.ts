import {Check} from './check';

export class Region {
    constructor(
        public readonly name: string,
        public readonly checks: readonly Check[]
    ) {}
}
