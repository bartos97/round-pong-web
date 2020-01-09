import { ComponentController } from '../../core/component-controller';

export class HomeScreenController extends ComponentController {
    constructor(templateHook: HTMLElement) {
        super(templateHook);
        this.registerEvent(this.getElement('#startButton'), 'click', this.openGame);
    }

    private openGame(): void {
        const game = document.getElementById('game-screen');
        this.TEMPLATE.hidden = true;
        game.hidden = false;
    }
}