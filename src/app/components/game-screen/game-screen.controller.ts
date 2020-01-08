import { ComponentController } from '../../core/component-controller';
import { DialogController, DialogData } from '../dialog/dialog.controller';
import { GameManager, GameEvents } from '../../game/game-manager';
import { Player, PlayerType } from '../../game/player';

export class GameScreenController extends ComponentController {
    //#region members
    private _elemScoreLeft: HTMLElement;
    private _elemScoreRight: HTMLElement;
    private _elemButtonPause: HTMLElement;    
    private _dialog: DialogController;
    private _gameManager: GameManager;
    //#endregion

    constructor(templateHook: HTMLElement) {
        super(templateHook);
        this._elemButtonPause = this.getElement('#buttonPause');
        this._elemScoreLeft = this.getElement("#scoreLeft");
        this._elemScoreRight = this.getElement("#scoreRight");
        this._dialog = DialogController.instance;

        this._gameManager = new GameManager(<HTMLCanvasElement>this.getElement("#gameCanvas"), <GameEvents>{
            onScore: this.onScore,
            onWin: this.onWin
        }, this);

        this.registerEvent(this._elemButtonPause, 'click', this.onPause);
    }

    //#region methods
    private onPause(): void {
        console.log('paused');
        this._dialog.open(<DialogData>{
            title: 'Gra wstrzymana',
            onClose: this.onDialogClose,
            saveButtonData: {
                title: 'Wznów',
                onSave: this.onResume
            }
        });
    }

    private onResume(): void {
        console.log('resumed');
    }

    private onDialogClose(): void {
        console.log('dialog closed');
    }

    private onScore(player: Player, score: number): void {
        console.log(`Player ${player.ID} scored!`);
        if (player.ID == PlayerType.LEFT) {
            this._elemScoreLeft.innerHTML = `${score}`;
        }
        else {
            this._elemScoreRight.innerHTML = `${score}`;
        }
    }

    private onWin(player: Player): void {
        console.log(`Player ${player.ID} won!`);
        //TODO: open dialog with `start` button, to restart game
    }
    //#endregion
}