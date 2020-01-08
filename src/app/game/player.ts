import { Ball } from "./ball";

export enum PlayerType {
    LEFT,
    RIGHT
}

export class Player {
    //#region members
    public get ID(): PlayerType {
        return this._type;
    }

    private readonly _type: PlayerType
    private rotationAngle: number;
    //#endregion

    constructor(type: PlayerType) {
        this._type = type;
    }

    //#region methods
    public checkCollision(ball: Ball): boolean {
        return false;
    }

    public goUp(): void {}
    public goDown(): void {}

    private setPosition(angle: number): void {}
    //#endregion methods
}