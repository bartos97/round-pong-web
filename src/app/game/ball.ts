import { Vector2D } from "../core/maths/vector2D";
import { GameManager } from "./game-manager";
import { Renderable } from "./interfaces";
import { VectorUtils } from "../core/maths/vector-utils";

export class Ball implements Renderable {
    
    //#region members
    public get position(): Vector2D {
        return this._position;
    }
    
    private readonly _radius: number = GameManager.CONFIG.ballRadius;
    private _position: Vector2D;
    private _speed: Vector2D;
    //#endregion

    constructor() {
        this._position = new Vector2D();
        this._position.y = Math.random() * (GameManager.CONFIG.boardSize / 3) - GameManager.CONFIG.boardSize / 3;
        
        this._speed = VectorUtils.newUnitVector(Math.random() - 0.5, Math.random() - 0.5);
        this._speed = this._speed.multiply(GameManager.CONFIG.ballSpeed);
        // console.log(`Ball speed: ${this._speed.x}, ${this._speed.y}`);
    }

    //#region methods
    public render(context: CanvasRenderingContext2D): void {
        context.save();
        context.beginPath();

        context.ellipse(this._position.x, this._position.y, this._radius, this._radius, 0, 0, 2 * Math.PI);

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
        this._speed = newSpeed.multiply(GameManager.CONFIG.ballSpeed);
    }
    //#endregion methods
}