import {ComponentController} from './component-controller';

export class Module {
    static register(
        templateSelector: string, 
        factory: (templateHook: HTMLElement) => ComponentController
    ): ComponentController[] {
        const components = document.querySelectorAll(templateSelector);
        let controllers: ComponentController[] = [];
        components.forEach((item: HTMLElement) => {
            controllers.push(factory(item));
        });
        return controllers;
    }
}