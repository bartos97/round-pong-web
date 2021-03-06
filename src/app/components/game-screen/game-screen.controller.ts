import { ComponentController } from '../../core/component-controller';
import { DialogController, DialogData } from '../dialog/dialog.controller';
import { GameEvents, PlayerType } from '../../game/interfaces';
import { Player } from '../../game/player';
import { GameManager } from '../../game/game-manager';

export class GameScreenController extends ComponentController {
    //#region members
    private _elemScoreLeft: HTMLElement;
    private _elemScoreRight: HTMLElement;
    private _elemButtonPause: HTMLElement;   
    private _elemButtonPlay: HTMLElement;   
    private _elemLoader: HTMLElement; 
    private _dialog: DialogController;
    //#endregion

    constructor(templateHook: HTMLElement) {
        super(templateHook);
        this._elemButtonPause = this.getElement('#buttonPause');
        this._elemButtonPlay = this.getElement('#buttonPlay');
        this._elemScoreLeft = this.getElement("#scoreLeft");
        this._elemScoreRight = this.getElement("#scoreRight");
        this._elemLoader = this.getElement("#loader");
        this._dialog = DialogController.instance;

        GameManager.instance.init(<HTMLCanvasElement>this.getElement("#gameCanvas"), <GameEvents>{
            onScore: this.onScore.bind(this),
            onWin: this.onWin.bind(this)
        });

        this.registerEvent(this._elemButtonPlay, 'click', this.onResume);
        this.registerEvent(this._elemButtonPause, 'click', this.onPause);

        document.addEventListener('keypress', (event: KeyboardEvent) => {
            event.stopPropagation();
            if (event.key == ' ') {
                this.onPause();   
            }
        });

        this.TEMPLATE.addEventListener('gamestart', () => {
            this.TEMPLATE.hidden = false;
            this._elemLoader.style.animationPlayState = 'running';
            setTimeout(() => {
                GameManager.instance.start();
            }, GameManager.CONFIG.gameStartDelay);
        });
    }

    //#region methods
    private onPause(): void {
        GameManager.instance.stop();
        this._elemButtonPause.hidden = true;
        this._elemButtonPlay.hidden = false;

        this._dialog.open(<DialogData>{
            title: 'Gra wstrzymana',
            onClose: () => {
                
            },
            saveButtonData: {
                title: 'Wznów',
                onSave: this.onResume.bind(this)
            }
        });
    }

    private onResume(): void {
        this._elemButtonPause.hidden = false;
        this._elemButtonPlay.hidden = true;
        GameManager.instance.start();
    }
    
    private onRestart(): void {
        GameManager.instance.restartGame();
        this._elemScoreLeft.innerHTML = '0';
        this._elemScoreRight.innerHTML = '0';
        this.resetLoader();
    }

    private onScore(player: Player, score: number): void {
        if (player.ID == PlayerType.LEFT) {
            this._elemScoreLeft.innerHTML = `${score}`;
        }
        else {
            this._elemScoreRight.innerHTML = `${score}`;
        }
    }

    private onWin(player: Player): void {
        let who = player.ID == PlayerType.LEFT ? 'lewy' : 'prawy';

        this._dialog.open(<DialogData>{
            title: 'Wygrał gracz ' + who,
            saveButtonData: {
                title: 'Start',
                onSave: this.onRestart.bind(this)
            }
        });
    }

    private resetLoader(): void {
        this._elemLoader.classList.remove('run-animation');
        void this._elemLoader.offsetHeight;
        this._elemLoader.classList.add('run-animation');
    }
    //#endregion
}