import * as PropTypes from 'prop-types';
import { CollisionDection, IRect } from './collision-detection';
import { IVector, Vector } from './vector';

export interface IBody extends IRect {
    dynamic: boolean;
    velocity: IVector;
    colided: boolean;
    shouldUpdate?: boolean;
    onCollision?: (colidedWith: IBody) => void;
    onUpdate?: () => void;
};

export interface IPoint {
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

    public static contextTypes = {
        Log: PropTypes.func
    };

    private world: IBody[];

    private collisionDection: CollisionDection;
    private gravity: IVector;
    

    constructor(options?: IPhysicsEngineOptions) {
        this.collisionDection = new CollisionDection();
        this.gravity = { x: 0, y: 1 };

        this.world = [];
    }

    public addBody(body: IBody): void {
        this.world.push(body);
    }

    public removeBody(body: IBody): void {


        // tslint:disable-next-line
        // console.log('Removing body', body);

        this.world.filter((targetBody: IBody, index: number) => {

            if (JSON.stringify(body) === JSON.stringify(targetBody)) {

                // tslint:disable-next-line
                // console.log('Found body', body, targetBody);

                this.world.splice(index, 1);
            }
        });
    }

    public tick() {

        const staticBodies = this.world.filter((body: IBody) => !body.dynamic);
        const dynamicBodies = this.world.filter((body: IBody) => body.dynamic);

        this.applyGravity(dynamicBodies);
        
        dynamicBodies.forEach((body: IBody) => {
            if (null != body.shouldUpdate && body.shouldUpdate && null != body.onUpdate) {
                body.onUpdate();
            }
        })

        this.resolveCollisions(this.checkCollisions(staticBodies, dynamicBodies));
        this.applyVelocity(dynamicBodies);
    }

    private applyVelocity(dynamicBodies: IBody[]) {

        dynamicBodies.forEach((body: IBody) => {
            const res = Vector.add(body, body.velocity);
            body.x = res.x;
            body.y = res.y;

            body.shouldUpdate = true;
        })
    }

    private applyGravity(dynamicBodies: IBody[]) {

        dynamicBodies.forEach((body: IBody) => {

            const res = Vector.add(body.velocity, this.gravity);
            body.velocity.x = res.x;
            body.velocity.y = res.y;

            body.shouldUpdate = true;
        });
    }

    private checkCollisions(staticBodies: IBody[], dynamicBodies: IBody[]): IBodyCollision[] {
        const collisions: IBodyCollision[] = [];

        if (null != dynamicBodies && null != staticBodies) {

            staticBodies.forEach((staticBody: IBody) => {

                dynamicBodies.forEach((dynamicBody: IBody) => {
                    const colided = this.collisionDection.rectOnRect(staticBody, dynamicBody);

                    if (colided) {
                        collisions.push({ bodyA: dynamicBody, bodyB: staticBody });
                    }
                });
            });
        }

        return collisions;
    }

    private resolveCollisions(collisions: IBodyCollision[]): void {

        collisions.forEach((collision: IBodyCollision) => {

            collision.bodyA.velocity.x = 0;
            collision.bodyA.velocity.y = 0;

            collision.bodyB.velocity.x = 0;
            collision.bodyB.velocity.y = 0;

            if (null != collision.bodyA.onCollision) {

                collision.bodyA.onCollision(collision.bodyB);
            }

            if (null != collision.bodyB.onCollision) {
                collision.bodyB.onCollision(collision.bodyA);
            }
        });
    }
}