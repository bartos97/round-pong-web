import { Vector2D } from "../core/maths/vector2D";
import { GameManager } from "./game-manager";
import { Renderable } from "./interfaces";
import { VectorUtils } from "../core/maths/vector-utils";

export class Ball implements Renderable {
    
    //#region members
    public get position(): Vector2D {
        return this._position;
    }
    
    private readonly _constVelocity: number = GameManager.CONFIG.boardSize;
    private readonly _radius: number = GameManager.CONFIG.ballRadius;
    private _position: Vector2D;
    private _speed: Vector2D;
    //#endregion

    constructor(position: Vector2D = new Vector2D(0, 0)) {
        this._position = position;

        // TODO: random direction
        this._speed = VectorUtils.normalize(new Vector2D(5, 25));
        this._speed = this._speed.multiply(this._constVelocity);
    }

    //#region methods
    public render(context: CanvasRenderingContext2D): void {
        context.save();
        context.beginPath();
        context.ellipse(this._position.x, this._position.y, this._radius, this._radius, 0, 0, 2 * Math.PI);
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
        let distance = this._position.length + this._radius;
        let maxRadius = GameManager.CONFIG.boardSize / 2 - GameManager.CONFIG.playerThickness;

        if (distance >= maxRadius) {
            let displacement = distance - maxRadius;
            this._position.subtract(displacement);
            this.bounceFromBoard();
            return true;
        }

        return false;
    }

    private bounceFromBoard(): void {
        let normal = VectorUtils.normalize(new Vector2D(-this.position.x, -this.position.y));
        let newSpeed = VectorUtils.reflect(VectorUtils.normalize(this._speed), normal);
        this._speed = newSpeed.multiply(this._constVelocity);
    }
    //#endregion methods
}