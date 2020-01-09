import { Vector2D } from "../core/maths/vector2D";
import { GameManager } from "./game-manager";
import { Renderable } from "./interfaces";

export class Ball implements Renderable {
    static readonly BASE_VELOCITY: number;

    //#region members
    public get position(): Vector2D {
        return this._position;
    }

    private readonly _radius: number = GameManager.CONFIG.ballRadius;
    private _position: Vector2D;
    private _speed: Vector2D = {x: 10, y: 10};
    //#endregion

    constructor(position: Vector2D = {x: 0, y: 0}) {
        this._position = position;
    }

    //#region methods
    public render(context: CanvasRenderingContext2D): void {
        context.save();
        context.beginPath();
        context.ellipse(this._position.x, this._position.y, this._radius, this._radius, 0, 0, 2 * Math.PI);
        // context.rect(this._position.x, this._position.y, this._radius, this._radius);
        context.fillStyle = GameManager.CONFIG.charactersColor;
        context.fill();
        context.restore();
    }

    public onUpdate(deltaTime: number): void {
        let ts = deltaTime / 1000; //tiemstep in seconds
        this._position.x += this._speed.x * ts;
        this._position.y += this._speed.y * ts;
    }

    public restart(): void {
        this._position.x = 0;
        this._position.y = 0;
    }
    
    public checkBoardCollision(): boolean {
        return false;
    }

    public bounceFromBoard(): void {

    }
    //#endregion methods
}