import { VectorUtils } from './vector-utils'
import { Vector2D } from './vector2D'

const CONFIG = {
    numberAccuracy: 1e-5
}


test('VectorUtils.vectorLength', () => {
    expect(
        VectorUtils.vectorLength(new Vector2D(2, 0))
    ).toBe(2);
});

test('VectorUtils.newUnitVector', () => {
    expect(
        VectorUtils.newUnitVector(10, 10).length - 1 <= CONFIG.numberAccuracy
    ).toBe(true);
});

test('VectorUtils.normalize', () => {
    expect(
        VectorUtils.normalize(new Vector2D(50, 50)).length - 1 <= CONFIG.numberAccuracy
    ).toBe(true);
});

test('VectorUtils.distance', () => {
    expect(
        VectorUtils.distance(new Vector2D(1,1), new Vector2D(5,1))
    ).toBe(4);
});

test('VectorUtils.reflect', () => {
    const testFunc = (): Boolean => {
        let reflect = VectorUtils.reflect(VectorUtils.newUnitVector(1,1), VectorUtils.newUnitVector(-1,0));
        let correctResult = VectorUtils.newUnitVector(-1, 1);
        return Math.abs(reflect.x - correctResult.x) <= CONFIG.numberAccuracy 
            && Math.abs(reflect.y - correctResult.y) <= CONFIG.numberAccuracy;
    };

    expect(
        testFunc()
    ).toBe(true);
});

test('Vector2D.add', () => {
    const testFunc = (): Boolean => {
        let vec = new Vector2D(5,5).add(5);
        let correctResult = new Vector2D(10, 10);
        return Math.abs(vec.x - correctResult.x) <= CONFIG.numberAccuracy 
            && Math.abs(vec.y - correctResult.y) <= CONFIG.numberAccuracy;
    };

    expect(
        testFunc()
    ).toBe(true);
});

test('Vector2D.subtract', () => {
    const testFunc = (): Boolean => {
        let vec = new Vector2D(5,5).subtract(new Vector2D(3, 2));
        let correctResult = new Vector2D(2, 3);
        return Math.abs(vec.x - correctResult.x) <= CONFIG.numberAccuracy 
            && Math.abs(vec.y - correctResult.y) <= CONFIG.numberAccuracy;
    };

    expect(
        testFunc()
    ).toBe(true);
});