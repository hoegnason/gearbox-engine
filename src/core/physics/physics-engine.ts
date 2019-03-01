import * as PropTypes from 'prop-types';
import { CollisionDection, IRect } from './collision-detection';
import { IVector, Vector } from './vector';

export interface IBody extends IRect {
    bodyID?: number;
    bodyName?: string;
    dynamic: boolean;
    trigger: boolean;
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

    public update?: () => void = undefined;

    private world: IBody[];

    private collisionDection: CollisionDection;
    private gravity: IVector;

    private nextAutoIncrement = 1;

    constructor(options?: IPhysicsEngineOptions) {
        this.collisionDection = new CollisionDection();
        this.gravity = { x: 0, y: 1 };

        this.world = [];
    }

    public addBody(body: IBody): void {

        body.bodyID = this.autoIncrement();
        
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


        this.resolveCollisions(this.checkCollisions(staticBodies, dynamicBodies));
        this.applyVelocity(dynamicBodies);
        

        dynamicBodies.forEach((body: IBody) => {
            if (null != body.shouldUpdate && body.shouldUpdate && null != body.onUpdate) {
                body.onUpdate();
            }
        })


        if (null != this.update) {
            this.update();
        }
    }

    private autoIncrement(): number {
        this.nextAutoIncrement = this.nextAutoIncrement + 1;

        return this.nextAutoIncrement;
    }

    private applyVelocity(dynamicBodies: IBody[]) {

        dynamicBodies.forEach((body: IBody) => {


            const res = Vector.add(body, body.velocity);
            body.x = res.x;
            body.y = res.y;

            body.velocity.x += (body.x - body.prevX)*0.0166;
            body.prevX = body.x;
            body.velocity.y += (body.y - body.prevY)*0.0166;
            body.prevY = body.y;

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

/*
            
  // Calculate relative velocity
  Vec2 rv = B.velocity - A.velocity
 
  // Calculate relative velocity in terms of the normal direction
  float velAlongNormal = DotProduct( rv, normal )
 
  // Do not resolve if velocities are separating
  if(velAlongNormal > 0)
    return;
 
  // Calculate restitution
  float e = min( A.restitution, B.restitution)
 
  // Calculate impulse scalar
  float j = -(1 + e) * velAlongNormal
  j /= 1 / A.mass + 1 / B.mass
 
  // Apply impulse
  Vec2 impulse = j * normal
  A.velocity -= 1 / A.mass * impulse
  B.velocity += 1 / B.mass * impulse


  const float percent = 0.2 // usually 20% to 80%
  Vec2 correction = penetrationDepth / (A.inv_mass + B.inv_mass)) * percent * n
  A.position -= A.inv_mass * correction
  B.position += B.inv_mass * correction

  var length:Number = box2.x - box1.x;
  var half_width_box1:Number = box1.width*0.5;
  var half_width_box2:Number = box2.width*0.5;

  var gap_between_boxes:Number = length - half_width_box1 - half_width_box2;

            const lengthX: number = Math.abs((collision.bodyA.x+collision.bodyA.width*0.5) - (collision.bodyB.x+collision.bodyB.width*0.5));
            const lengthY: number = Math.abs((collision.bodyA.y+collision.bodyA.height*0.5) - (collision.bodyB.y+collision.bodyB.height*0.5));
            const halfWidthA: number = collision.bodyA.width*0.5;
            const halfWidthB: number = collision.bodyB.width*0.5;
            const halfHeightA: number = collision.bodyA.height*0.5;
            const halfHeightB: number = collision.bodyB.height*0.5;

            const gapX: number = lengthX - halfWidthA - halfWidthB;
            const gapY: number = lengthY - halfHeightA - halfHeightB;*/

            if(collision.bodyA.dynamic){
                if(!collision.bodyB.trigger){
                    if (collision.bodyA.velocity.y > 0){
                    

                            // collision.bodyA.y = collision.bodyA.y - (collision.bodyA.width-(collision.bodyB.y - collision.bodyA.y));
                            collision.bodyA.velocity.y *= -0.5;
                        }
                    if (collision.bodyA.velocity.x !== 0){
                            // collision.bodyA.x = collision.bodyA.x - (collision.bodyA.width-(collision.bodyB.x - collision.bodyA.x));
                            collision.bodyA.velocity.x *= -0.5;
                        }
                }
                
            }
            
            // collision.bodyA.velocity.x = 0;
            // collision.bodyA.velocity.y = 0;

           // collision.bodyB.velocity.x = 0;
           // collision.bodyB.velocity.y = 0;
            

            if (null != collision.bodyA.onCollision) {

                collision.bodyA.onCollision(collision.bodyB);
            }

            if (null != collision.bodyB.onCollision) {
                collision.bodyB.onCollision(collision.bodyA);
            }
        });
    }
}