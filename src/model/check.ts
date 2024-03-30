import {signal} from '@angular/core';

export class Check {
    public readonly checked = signal<boolean>(false);

    constructor(public readonly name: string) {}
}
