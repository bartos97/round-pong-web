export abstract class ComponentController {
    protected readonly TEMPLATE: HTMLElement;

    protected constructor(templateHook: HTMLElement) {
        this.TEMPLATE = templateHook;
    }

    protected getElement(selector: string): HTMLElement {
        return this.TEMPLATE.querySelector(selector);
    }

    protected registerEvent(element: HTMLElement, eventName: string, callback: (event?: Event) => void) {
        element.addEventListener(eventName, callback.bind(this));
    }
}