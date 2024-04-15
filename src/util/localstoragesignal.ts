import {WritableSignal, effect, signal} from '@angular/core';

/**
 * Creates a writable signal whose value is stored in and synced with browser LocalStorage.
 * When the value matches the default value, the item is removed from LocalStorage.
 *
 * @param key the key for the data in LocalStorage
 * @param defaultValue the value when the key is not in LocalStorage
 * @param reviver passed into {@link JSON.parse} for reading from LocalStorage
 * @param replacer passed into {@link JSON.stringify} for writing to LocalStorage
 * @returns a writable signal whose value is stored in and synced with browser LocalStorage
 */
export function localStorageSignal<T>(
    key: string,
    defaultValue: T,
    reviver?: (key: string, value: string) => T,
    replacer?: (key: string, value: T) => string | undefined,
): WritableSignal<T> {
    const preexistingStringifiedValue = window.localStorage.getItem(key);
    const _localStorageSignal = signal<T>(
        typeof preexistingStringifiedValue === 'string'
            ? JSON.parse(preexistingStringifiedValue, reviver)
            : defaultValue,
    );

    window.addEventListener('storage', (event) => {
        if (event.key === key) {
            _localStorageSignal.set(
                event.newValue ? JSON.parse(event.newValue, reviver) ?? defaultValue : defaultValue,
            );
        }
    });

    effect(() => {
        const value = _localStorageSignal();
        if (value === defaultValue) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, JSON.stringify(value, replacer));
        }
    });

    return _localStorageSignal;
}
