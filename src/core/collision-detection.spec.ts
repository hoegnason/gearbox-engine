import { CollisionDection, IRect } from './collision-detection';



test('adds 1 + 2 to equal 3', () => {
    const collisionDection = new CollisionDection();

    const rect1: IRect = { x: 10, y: 10, width: 10, height: 10 };
    const rect2: IRect = { x: 20, y: 20, width: 20, height: 20 };


    expect(collisionDection.rectOnRect(rect1, rect2)).toBe(false);
});