import { VectorUtils } from "./vector-utils";

export class Vector2D {
    public x: number;
    public y: number;

    public get length(): number {
        return VectorUtils.vectorLength(this);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public multiply(vec: Vector2D): Vector2D;
    public multiply(val: number): Vector2D;
    public multiply(x: any): Vector2D {
        if (typeof x == "object") {
            return new Vector2D(this.x * x.x, this.y * x.y);
        }

        if (typeof x == "number") {
            return new Vector2D(this.x * x, this.y * x);
        }
    }     

    public add(vec: Vector2D): Vector2D;
    public add(val: number): Vector2D;
    public add(x: any): Vector2D  {
        if (typeof x == "object") {
            return new Vector2D (this.x + x.x, this.y + x.y);
        }

        if (typeof x == "number") {
            return new Vector2D (this.x + x, this.y + x);
        }        
    }

    public subtract(vec: Vector2D): Vector2D;
    public subtract(val: number): Vector2D;
    public subtract(x: any): Vector2D  {
        if (typeof x == "object") {
            return new Vector2D (this.x - x.x, this.y - x.y);
        }

        if (typeof x == "number") {
            return new Vector2D (this.x - x, this.y - x);
        }        
    }
}