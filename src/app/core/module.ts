import {ComponentController} from './component-controller';

export class Module {
    static register(templateSelector: string, 
                    factory: (templateHook: Element) => ComponentController): ComponentController[] {
        const components = document.querySelectorAll(templateSelector);
        let controllers: ComponentController[] = [];
        components.forEach((item: Element) => {
            controllers.push(factory(item));
        });
        return controllers;
    }
}