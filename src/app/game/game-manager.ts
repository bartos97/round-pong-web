import { Player } from "./player";
import { Ball } from "./ball";
import { Vector2D } from "../core/maths/vector2D";
import { GameConfig, GameEvents, Renderable, PlayerType } from "./interfaces";

/**
 * Singleton
 */
export class GameManager {
    //#region members
    public static readonly CONFIG: GameConfig = {
        boardSize: 600,
        ballRadius: 25,
        ballSpeed: 600 / 2,
        playerThickness: 50,
        playerSizeAngle: Math.PI / 6.0,
        playerAngleIncrement: Math.PI,
        charactersColor: 'rgb(77, 128, 153)',
        gameStartDelay: 1000,
        helpers: {
            innerRadius: 600 / 2 - 50, //boardSize / 2 - playerThickness
            ballHalfAngle: Math.atan2(25, 600 - 25) //y = ballRadius, x = boardSize - ballRadius
        }
    }

    private static _instance: GameManager;
    private static _isInitialized: boolean = false;

    private _context: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _callbacks: GameEvents = {};
    private _lastFrameTime: DOMHighResTimeStamp = 0;
    private _deltaTime: DOMHighResTimeStamp = 0;
    private _isRunning: boolean = false;
    private _keyPressed = {};
    
    private _renderables: Renderable[];
    private _playerLeft: Player;
    private _playerRight: Player;
    private _ball: Ball;

    private _onUpdateBind: any;
    //#endregion

    public static get instance(): GameManager {
        return this._instance || (this._instance = new this());
    }

    public init(canvas: HTMLCanvasElement, eventsCallbacks?: GameEvents): void {
        if (GameManager._isInitialized) return;

        this._canvas = canvas;
        this._callbacks.onScore = eventsCallbacks?.onScore;
        this._callbacks.onWin = eventsCallbacks?.onWin;

        this._canvas.style.width = GameManager.CONFIG.boardSize + 'px';
        this._canvas.style.height = GameManager.CONFIG.boardSize + 'px';
        this._canvas.width = GameManager.CONFIG.boardSize * window.devicePixelRatio;
        this._canvas.height = GameManager.CONFIG.boardSize * window.devicePixelRatio;

        this._context = this._canvas.getContext("2d");
        this._context.translate(this._canvas.width / 2, this._canvas.width / 2);
        this._context.scale(window.devicePixelRatio, -window.devicePixelRatio);
        this._context.fillStyle = GameManager.CONFIG.charactersColor;
        this._context.save();        
        
        this._renderables = [
            this._playerLeft = new Player(PlayerType.LEFT),
            this._playerRight = new Player(PlayerType.RIGHT),
            this._ball = new Ball()
        ];

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this))

        this._onUpdateBind = this.onUpdate.bind(this);
        GameManager._isInitialized = true;
        window.requestAnimationFrame(this._onUpdateBind);
    }

    private constructor() {}

    //#region methods
    public start(): void {
        this._isRunning = true;
    }

    public stop(): void {
        this._isRunning = false;
    }

    public restartGame(): void {
        this._ball.restart();
        this._playerLeft.restart();
        this._playerRight.restart();

        setTimeout(() => {
            this.start();
        }, GameManager.CONFIG.gameStartDelay);
    }

    private onUpdate(timestamp: DOMHighResTimeStamp): void {
        this._context.clearRect(
            -GameManager.CONFIG.boardSize / 2,
            -GameManager.CONFIG.boardSize / 2,
             GameManager.CONFIG.boardSize,
             GameManager.CONFIG.boardSize
        );
        this._deltaTime = timestamp - this._lastFrameTime;
        this._lastFrameTime = timestamp;

        if (this._isRunning) {
            if ((this._keyPressed as any)['arrowup']) this._playerRight.goUp(this._deltaTime);
            if ((this._keyPressed as any)['arrowdown']) this._playerRight.goDown(this._deltaTime);
            if ((this._keyPressed as any)['w']) this._playerLeft.goUp(this._deltaTime);
            if ((this._keyPressed as any)['s']) this._playerLeft.goDown(this._deltaTime);

            this.updatePositions();
            this.checkCollisions();
        } 

        this.render();
        window.requestAnimationFrame(this._onUpdateBind);
    }
    
    private updatePositions(): void {
        for (const renderable of this._renderables) {
            renderable.onUpdate(this._deltaTime);
        }
    }
    
    private checkCollisions(): void {
        if (this._ball.checkBoardCollision()) {
            if (this._playerLeft.checkCollision(this._ball) || this._playerRight.checkCollision(this._ball)) {
                return;
            }

            if (this._ball.position.x >= 0.0) {
                this.playerScored(this._playerLeft);
            }
            else {
                this.playerScored(this._playerRight);
            }
        }
    }

    private playerScored(player: Player): void {
        player.scored();
        this._callbacks.onScore?.(player, player.score);

        if (player.score >= 10) {
            this.stop();
            this._callbacks.onWin?.(player);
        }
    }
    
    private render(): void {
        for (const renderable of this._renderables) {
            renderable.render(this._context);
        }
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (!this._isRunning) return;
        (this._keyPressed as any)[event.key.toLowerCase()] = true;
    }

    private onKeyUp(event: KeyboardEvent): void {
        // console.log("Key up: " + event.key);
        // if (!this._isRunning) return;
        (this._keyPressed as any)[event.key.toLowerCase()] = false;
    }
    //#endregion
}