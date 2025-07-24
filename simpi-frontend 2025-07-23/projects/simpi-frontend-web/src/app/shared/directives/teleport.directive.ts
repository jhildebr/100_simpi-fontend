import { DOCUMENT } from "@angular/common";
import { Directive, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[teleport]',
})
export class TeleportDirective implements OnInit, OnDestroy {
    @Input("teleport") selector: string;

    private host: Element;

    constructor(
        private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit() {
        const viewRef = this.vcr.createEmbeddedView(this.tpl);
        this.host = this.document.querySelector(this.selector);

        viewRef.rootNodes.forEach(node => this.host.appendChild(node));
    }

    ngOnDestroy() {
        this.host.innerHTML = "";
    }
}