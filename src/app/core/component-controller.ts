export abstract class ComponentController {
    readonly TEMPLATE: Element;

    protected constructor(templateHook: Element) {
        this.TEMPLATE = templateHook;
    }

    protected getElement(selector: string): Element {
        return this.TEMPLATE.querySelector(selector);
    }

    protected regiterEvent(element: Element, eventName: string, callback: () => void) {
        element.addEventListener(eventName, callback.bind(this));
    }
}