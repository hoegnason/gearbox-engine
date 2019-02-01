import { CollisionDection, IRect } from './collision-detection';

export interface IBody extends IRect {
    dynamic: boolean;
    velocity: [number, number];
    colided: boolean;
};

export class PhysicsEngine {

    private collisionDection: CollisionDection;

    constructor() {
        this.collisionDection = new CollisionDection();
    }


    public tick(bodies: IBody[], options: any[]) {     
        const staticBodies = bodies.filter((body: IBody) => !body.dynamic);
        const dynamicBodies = bodies.filter((body: IBody) => body.dynamic);

        this.applyGravity(bodies, 1);
        this.checkCollisions(staticBodies, dynamicBodies);
    }

    private applyGravity(dynamicBodies: IBody[], gravity: number) {
        /* */
    }

    private checkCollisions(staticBodies: IBody[], dynamicBodies: IBody[]) {
        if (null != dynamicBodies && null != staticBodies) {

            staticBodies.forEach((staticBody: IBody) => {

                dynamicBodies.forEach((dynamicBody: IBody) => {
                    const colided = this.collisionDection.rectOnRect(staticBody, dynamicBody);

                    if (colided) {
                        /* */
                    }
                });
            });
        }
    }
}