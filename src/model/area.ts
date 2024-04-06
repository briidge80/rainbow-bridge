import {Check} from './check';

export class Area {
    constructor(
        public readonly name: string,
        public readonly checks: readonly Check[],
    ) {}
}
