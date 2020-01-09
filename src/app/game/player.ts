import { Ball } from "./ball";
import { Renderable, PlayerType } from "./interfaces";

export class Player implements Renderable {
    //#region members
    public get ID(): PlayerType {
        return this._type;
    }
    public get score(): number {
        return this._score;
    }

    private readonly _type: PlayerType
    private _rotationAngle: number;
    private _score: number = 0;
    //#endregion

    constructor(type: PlayerType) {
        this._type = type;
    }

    //#region methods
    public render(context: CanvasRenderingContext2D): void {

    }

    public onUpdate(deltaTime: number): void {

    }

    public restart(): void {
        this._score = 0;
        // TODO: default position
    }

    public scored(): void {
        this._score++;
    }
    
    public checkCollision(ball: Ball): boolean {
        return false;
    }

    public goUp(): void {
        
    }

    public goDown(): void {

    }
    //#endregion methods
}