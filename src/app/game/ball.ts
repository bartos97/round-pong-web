import { Vector2D } from "../core/maths/vector2D";

export class Ball {
    static readonly BASE_VELOCITY: number;

    //#region members
    private readonly _radius: number = 50;
    private _position: Vector2D = {x: 0, y: 0}
    private _speed: Vector2D;
    //#endregion

    constructor(position: Vector2D) {
        
    }

    //#region methods
    public render(): void {}
    
    public checkBoardCollision(): boolean {
        return false;
    }

    public bounceFromBoard(): void {}
    //#endregion methods
}