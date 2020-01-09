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
        playerThickness: 50,
        playerSizeAngle: Math.PI / 6.0,
        playerAngleIncrement: 0.1 * (Math.PI / 2 - Math.PI / 12),
        charactersColor: 'rgb(77, 128, 153)',
        gameStartDelay: 1000
    }

    private static _instance: GameManager;
    private static _isInitialized: boolean = false;

    private _context: CanvasRenderingContext2D;
    private _canvas: HTMLCanvasElement;
    private _callbacks: GameEvents;
    private _lastFrameTime: DOMHighResTimeStamp = 0;
    private _deltaTime: DOMHighResTimeStamp = 0;
    private _isRunning: boolean = false;
    
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
        this._callbacks = eventsCallbacks;
        this._context = this._canvas.getContext("2d");
        this._context.translate(GameManager.CONFIG.boardSize / 2, GameManager.CONFIG.boardSize / 2);
        this._context.save();

        //TODO: test
        this._callbacks.onScore = this._callbacks?.onScore;
        this._callbacks.onWin = this._callbacks?.onWin;
        
        this._renderables = [
            this._playerLeft = new Player(PlayerType.LEFT),
            this._playerRight = new Player(PlayerType.RIGHT),
            this._ball = new Ball()
        ];

        document.addEventListener('keydown', this.onKeyPress.bind(this));

        this._onUpdateBind = this.onUpdate.bind(this);
        window.requestAnimationFrame(this._onUpdateBind);
        GameManager._isInitialized = true;
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
            if (this._playerLeft.checkCollision(this._ball)) {
                console.log('Collision with LEFT');
            }
            
            else if (this._playerRight.checkCollision(this._ball)) {
                console.log('Collision with RIGHT');
            }
            
            else {
                if (this._ball.position.x >= 0.0) 
                    this.playerScored(this._playerLeft);
                else 
                    this.playerScored(this._playerRight);
            }
        }
    }

    private playerScored(player: Player): void {
        player.scored();
        this._callbacks.onScore(player, player.score);

        if (player.score >= 10) {
            this.stop();
            this._callbacks.onWin(player);
        }
    }
    
    private render(): void {
        for (const renderable of this._renderables) {
            renderable.render(this._context);
        }
    }

    private onKeyPress(event: KeyboardEvent): void {
        // if (!this._isRunning) return;

        // console.log("Key pressed: " + event.key);
        switch (event.key) {
            case 'ArrowUp':
                // this._playerRight.goUp();
                this.playerScored(this._playerLeft);
                break;

            case 'ArrowDown':
                // this._playerRight.goDown();
                this.playerScored(this._playerRight);
                break;

            case 'W':
            case 'w':
                this._playerLeft.goUp();
                break;

            case 'S':
            case 's':
                this._playerLeft.goDown();
                break;

            case ' ':
                this._isRunning = !this._isRunning;
                break;
        
            default:
                break;
        }
    }
    //#endregion
}