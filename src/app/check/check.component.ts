import {ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild, signal} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Check} from '../../model/check';
import {World} from '../../model/world';
import {Item} from '../../model/item';

@Component({
    selector: 'bridge-check',
    standalone: true,
    imports: [MatCheckboxModule],
    templateUrl: './check.component.html',
    styleUrl: './check.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckComponent implements OnDestroy {
    @Input({required: true}) public check!: Check;

    protected readonly showPopup = signal<boolean>(false);

    @ViewChild('itemCombobox', {read: ElementRef})
    protected itemCombobox: ElementRef<HTMLElement> | undefined = undefined;

    @ViewChild('itemListbox', {read: ElementRef})
    protected set itemListbox(itemListboxElementRef: ElementRef<HTMLElement> | undefined) {
        if (itemListboxElementRef) {
            window.addEventListener('click', this.closeOnOutsideClick);
            window.addEventListener('keydown', this.closeOnEscape);

            const listboxElement = itemListboxElementRef.nativeElement;
            let squished = false;
            if (listboxElement.getBoundingClientRect().bottom > window.innerHeight) {
                listboxElement.style.top = '';
                listboxElement.style.bottom = '100%';

                if (listboxElement.getBoundingClientRect().top < 0 && this.itemCombobox) {
                    listboxElement.style.bottom = '';

                    const comboboxRect = this.itemCombobox.nativeElement.getBoundingClientRect();
                    listboxElement.style.top = `${-comboboxRect.top}px`;
                    listboxElement.style.left = '100%';
                    squished = true;
                }
            }
            if (listboxElement.getBoundingClientRect().right > window.innerWidth) {
                listboxElement.style.left = '';
                listboxElement.style.right = squished ? '100%' : '0';
            }
        } else {
            window.removeEventListener('click', this.closeOnOutsideClick);
            window.removeEventListener('keydown', this.closeOnEscape);
        }
    }

    constructor(
        protected readonly world: World,
        private readonly elementRef: ElementRef<HTMLElement>,
    ) {}

    public ngOnDestroy(): void {
        window.removeEventListener('click', this.closeOnOutsideClick);
        window.removeEventListener('keydown', this.closeOnEscape);
    }

    private readonly closeOnOutsideClick = (event: Event): void => {
        const clickedElement = event.target;
        if (clickedElement instanceof Node && !this.elementRef.nativeElement.contains(clickedElement)) {
            this.showPopup.set(false);
        }
    };

    private readonly closeOnEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            this.showPopup.set(false);
        }
    };

    protected onComboboxClick(): void {
        this.showPopup.update((value) => !value);
    }

    protected onComboboxRightClick(event: Event): void {
        event.preventDefault();
        this.showPopup.set(false);
        this.check.item.set(undefined);
    }

    protected select(item: Item): void {
        this.check.item.set(this.check.item() === item ? undefined : item);
        this.showPopup.set(false);
    }
}
