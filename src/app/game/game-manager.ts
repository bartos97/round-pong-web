import { Player, PlayerType } from "./player";

//TODO: emmm, just look at it
let bind: any;

export interface GameEvents {
    onScore?: (player: Player, score: number) => void;
    onWin?: (player: Player) => void;
}

export class GameManager {
    //#region members
    private _context: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _callbacks?: GameEvents;
    private _lastFrameTime: DOMHighResTimeStamp = 0;
    private _deltaTime: DOMHighResTimeStamp = 0;
    //#endregion

    constructor(canvas: HTMLCanvasElement, eventsCallbacks?: GameEvents, originator?: any) {
        this._canvas = canvas;
        this._callbacks = eventsCallbacks;
        this._context = this._canvas.getContext("2d");

        //TODO: check if exists blablabla
        this._callbacks.onScore = this._callbacks.onScore.bind(originator);
        this._callbacks.onWin = this._callbacks.onWin.bind(originator);

        bind = this.onUpdate.bind(this);
        window.requestAnimationFrame(bind);
    }

    //#region methods
    public start(): void {}
    public stop(): void {}
    public toggle(): void {}
    public restartGame(): void {}

    private onUpdate(timestamp: DOMHighResTimeStamp) {
        this._context.clearRect(0, 0, 600, 600);
        this._deltaTime = timestamp - this._lastFrameTime;
        this._lastFrameTime = timestamp;

        // console.log(this._deltaTime);

        window.requestAnimationFrame(bind);
    }

    private onKeyPress(event: KeyboardEvent): void {}
    private checkCollisions(): void {}
    //#endregion
}