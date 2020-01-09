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
    boardSize: number;
    ballRadius: number;
    playerThickness: number;
    playerSizeAngle: number;
    playerAngleIncrement: number;
    charactersColor: string;
    gameStartDelay: number;
}

export interface Renderable {
    render(context: CanvasRenderingContext2D): void;
    onUpdate(deltaTime: number): void;
}