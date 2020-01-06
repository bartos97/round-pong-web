import { ComponentController } from '../../core/component-controller';

export class HomeScreenController extends ComponentController {
    constructor(templateHook: HTMLElement) {
        super(templateHook);
        this.regiterEvent(this.getElement('#startButton'), 'click', this.buttonOnClick);
    }

    private buttonOnClick(): void {
        const game = document.getElementById('game-screen');
        this.TEMPLATE.hidden = true;
        game.hidden = false;
        // game.classList.add('show');
    }
}