export abstract class ComponentController {
    readonly TEMPLATE: HTMLElement;

    protected constructor(templateHook: HTMLElement) {
        this.TEMPLATE = templateHook;
    }

    protected getElement(selector: string): HTMLElement {
        return this.TEMPLATE.querySelector(selector);
    }

    protected regiterEvent(element: HTMLElement, eventName: string, callback: () => void) {
        element.addEventListener(eventName, callback.bind(this));
    }
}