import { ComponentController } from '../../core/component-controller';

export class HomeScreenController extends ComponentController {
    private name: string;
    private button: Element;

    constructor(templateHook: Element) {
        super(templateHook);
        this.name = 'dupa' + Math.floor(Math.random() * 1000);
        console.log(this.name + ' here!');
        this.button = this.getElement('button');
        this.regiterEvent(this.button, 'click', this.buttonOnClick);
    }

    private buttonOnClick(): void {
        console.log(this.name + ' clicked!');
    }
}