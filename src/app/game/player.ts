import { Ball } from "./ball";
import { Renderable, PlayerType } from "./interfaces";
import { GameManager } from "./game-manager";

export class Player implements Renderable {
    //#region members
    public get ID(): PlayerType {
        return this._type;
    }
    public get score(): number {
        return this._score;
    }

    private readonly _type: PlayerType;
    private _rotationAngle: number;
    private _score: number = 0;
    //#endregion

    constructor(type: PlayerType) {
        this._type = type;
        this._rotationAngle = 0;
    }

    //#region methods
    public render(context: CanvasRenderingContext2D): void {
        context.save();

        if (this._type == PlayerType.LEFT) {
            // flip coords in X axis
            context.scale(-1, 1);
        }

        context.beginPath();        
        //outer
        context.arc(
            0, 0, 
            GameManager.CONFIG.boardSize / 2, 
            this._rotationAngle - GameManager.CONFIG.playerSizeAngle / 2,
            this._rotationAngle + GameManager.CONFIG.playerSizeAngle / 2
        );
        //inner
        context.arc(
            0, 0, 
            GameManager.CONFIG.helpers.innerRadius, 
            this._rotationAngle + GameManager.CONFIG.playerSizeAngle / 2,
            this._rotationAngle - GameManager.CONFIG.playerSizeAngle / 2,
            true
        );
        context.fill();

        context.restore();
    }

    public onUpdate(deltaTime: number): void {

    }

    public restart(): void {
        this._score = 0;
        this._rotationAngle = 0;
    }

    public scored(): void {
        this._score++;
    }
    
    public checkCollision(ball: Ball): boolean {
        if (this._type == PlayerType.LEFT && ball.position.x >= 0) 
            return false;
        if (this._type == PlayerType.RIGHT && ball.position.x < 0)
            return false;
            
        let ballX = Math.abs(ball.position.x);
        let ballY = ball.position.y;
        let ballAngle = Math.atan2(ballY, ballX);
        let angleDistanceCCW = Math.abs(ballAngle + GameManager.CONFIG.helpers.ballHalfAngle - this._rotationAngle);
        let angleDistanceCW = Math.abs(ballAngle - GameManager.CONFIG.helpers.ballHalfAngle - this._rotationAngle);
        let angleDistance = angleDistanceCCW > angleDistanceCW ? angleDistanceCW : angleDistanceCCW;
        // let angleDistance = Math.abs(ballAngle - this._rotationAngle);

        // console.log(this._type, ballAngle, this._rotationAngle, angleDistanceCCW, angleDistanceCW, this._playerHalfAngle);
        return angleDistance <= GameManager.CONFIG.playerSizeAngle / 2;
    }

    public goUp(deltaTime: number): void {
        let maxAngle = Math.PI / 2 - GameManager.CONFIG.playerSizeAngle / 2;
        let timestep = deltaTime / 1000; //tiemstep in seconds
        let increment = GameManager.CONFIG.playerAngleIncrement * timestep;
        if (this._rotationAngle + increment >= maxAngle) {
            this._rotationAngle = maxAngle;
            return;
        }
        
        this._rotationAngle += increment;        
    }

    public goDown(deltaTime: number): void {
        let maxAngle = -Math.PI / 2 + GameManager.CONFIG.playerSizeAngle / 2;
        let timestep = deltaTime / 1000; //tiemstep in seconds
        let increment = GameManager.CONFIG.playerAngleIncrement * timestep;
        if (this._rotationAngle - increment <= maxAngle) {
            this._rotationAngle = maxAngle;
            return;
        }

        this._rotationAngle -= increment;        
    }
    //#endregion methods
}