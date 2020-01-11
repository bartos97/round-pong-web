import { Player } from "./player";

export enum PlayerType {
    LEFT,
    RIGHT
}

export interface GameEvents {
    onScore?: (player: Player, score: number) => void;
    onWin?: (player: Player) => void;
}

export interface GameConfig {
    boardSize: number; //side length of square containing game circle
    ballRadius: number;
    ballSpeed: number; // in pixels per second
    playerThickness: number;
    playerSizeAngle: number; // central angle defininf length of player
    playerAngleIncrement: number; // per second
    charactersColor: string; // color of ball and players
    gameStartDelay: number; // delay to start running game after init
    helpers: {
        innerRadius: number; //board inner circle radius
        ballHalfAngle: number; //angle between X-axis and tangent to ball when ball in collision with board
    }
}

export interface Renderable {
    render(context: CanvasRenderingContext2D): void;
    onUpdate(deltaTime: number): void;
}