import { Vector2D } from "./vector2D";

export class VectorUtils {
    public static vectorLength(vec: Vector2D): number {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    }

    public static dot(vec1: Vector2D, vec2: Vector2D): number {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

    public static normalize(vec: Vector2D): Vector2D {
        return new Vector2D(vec.x / vec.length,  vec.y / vec.length);
    }

    public static newUnitVector(x: number, y: number): Vector2D {
        let length = Math.sqrt(x * x + y * y);
        return new Vector2D(x / length, y / length);
    }

    public static distance(pointFrom: Vector2D, pointTo: Vector2D): number {
        return this.vectorLength(pointFrom.subtract(pointTo));
    }

    public static reflect(incidentUnitVector: Vector2D, normal: Vector2D): Vector2D {
        return incidentUnitVector.subtract(
            normal.multiply(2 * this.dot(normal, incidentUnitVector))
        );
    }

    private constructor(){}
}