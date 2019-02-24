import { Directive, OnInit, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

    @HostBinding('class.open') isOpen: boolean = false;
    
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {

    }

    @HostListener('click')
    mouseWasClicked() {
        this.isOpen = !this.isOpen;
    }
}