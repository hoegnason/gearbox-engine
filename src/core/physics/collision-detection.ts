

export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class CollisionDection {

    // Axis-Aligned Bounding Box
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    /*
    public rectOnRect(rect1: IRect, rect2: IRect): boolean {
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {

            return true;

        } else {

            return false;
        }
    }
    */

   public rectOnRect(rect1: IRect, rect2: IRect): boolean {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {

        return true;

    } else {

        return false;
    }
}
}