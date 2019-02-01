import { CollisionDection, IRect } from './collision-detection';

export interface IBody extends IRect {
    dynamic: boolean;
    velocity: IVector;
    colided: boolean;
};

export interface IPoint {
    x: number;
    y: number;
}

export interface IVector {
    x: number;
    y: number;
}

export interface IPhysicsEngineOptions {
    gravity: IVector;
}

export interface IBodyCollision {
    bodyA: IBody;
    bodyB: IBody;
}

export class PhysicsEngine {

    private collisionDection: CollisionDection;
    private gravity: IVector;

    constructor(options?: IPhysicsEngineOptions) {
        this.collisionDection = new CollisionDection();
        this.gravity = {x: 0, y: 1};
    }

    public tick(bodies: IBody[]) {     
        const staticBodies = bodies.filter((body: IBody) => !body.dynamic);
        const dynamicBodies = bodies.filter((body: IBody) => body.dynamic);

        this.applyGravity(dynamicBodies);
        this.checkCollisions(staticBodies, dynamicBodies);
    }

    private applyGravity(dynamicBodies: IBody[]) {
        dynamicBodies.forEach((body: IBody) => {
            body.velocity.x = body.velocity.x + this.gravity.x;
            body.velocity.y = body.velocity.y + this.gravity.y;
        });
    }

    private checkCollisions(staticBodies: IBody[], dynamicBodies: IBody[]): IBodyCollision[] {
        const collisions: IBodyCollision[] = [];

        if (null != dynamicBodies && null != staticBodies) {

            staticBodies.forEach((staticBody: IBody) => {

                dynamicBodies.forEach((dynamicBody: IBody) => {
                    const colided = this.collisionDection.rectOnRect(staticBody, dynamicBody);

                    if (colided) {
                        collisions.push({bodyA: dynamicBody, bodyB: staticBody});
                    }
                });
            });
        }

        return collisions;
    }
}