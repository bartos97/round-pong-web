import { ComponentController } from '../../core/component-controller';

export class HomeScreenController extends ComponentController {
    constructor(templateHook: HTMLElement) {
        super(templateHook);
        this.registerEvent(this.getElement('#startButton'), 'click', this.openGame);
    }

    private openGame(): void {
        this.TEMPLATE.hidden = true;
        const game = document.getElementById('game-screen');        
        let event = new Event('gamestart');
        game.dispatchEvent(event);
    }
}