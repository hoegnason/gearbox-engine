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
    rest?: boolean;
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

    private lastTick = 0.001 * Date.now();

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

        const now = 0.001 * Date.now();

        const tickSize = Math.abs(now - this.lastTick);

        dynamicBodies.forEach((body: IBody) => {


            if(body.rest && (body.velocity.x > 1 ||body.velocity.y > 1 || body.velocity.x < -1 || body.velocity.y < -1)){
                body.rest = false;
            }
            if(!body.rest){
                const res = Vector.add(body, body.velocity);
                body.x = res.x;
                body.y = res.y;
    
    
                
                // Verlet Integration
                // body.velocity.x += (body.x - body.prevX)*0.0166; // Frame
                body.velocity.x += (body.x - body.prevX!) * tickSize;
                body.prevX = body.x;
                body.velocity.y += (body.y - body.prevY!) * tickSize;
                body.prevY = body.y;
    
                // shouldUpdate always true?
                body.shouldUpdate = true;
            }

        })

        this.lastTick = now;
    }

    private applyGravity(dynamicBodies: IBody[]) {

        dynamicBodies.forEach((body: IBody) => {

            const res = Vector.add(body.velocity, this.gravity);
            body.velocity.x = res.x * 0.95; // Slow down force
            body.velocity.y = res.y;


            body.shouldUpdate = true;
        });
    }

    private checkCollisions(staticBodies: IBody[], dynamicBodies: IBody[]): IBodyCollision[] {
        const collisions: IBodyCollision[] = [];

        if (null != dynamicBodies && null != staticBodies) {

            // Check static vs dynamic collisions
            staticBodies.forEach((staticBody: IBody) => {

                
                dynamicBodies.forEach((dynamicBody: IBody) => {
                    const colided = this.collisionDection.rectOnRect(staticBody, dynamicBody);

                    if (colided) {
                        collisions.push({ bodyA: dynamicBody, bodyB: staticBody });
                    }
                });
            });

            // Check dynamic vs dynamic collisions
            for(let a = 0; a < dynamicBodies.length; a++){
                for(let b = a; b < dynamicBodies.length; b++){
                    if (dynamicBodies[a].bodyID! !== dynamicBodies[b].bodyID!){
                        const colided = this.collisionDection.rectOnRect(dynamicBodies[a], dynamicBodies[b]);

                        if (colided) {
                            collisions.push({bodyA: dynamicBodies[a], bodyB: dynamicBodies[b]});
                        }
                    }
                }
            }
        }

        return collisions;
    }

    private resolveCollisions(collisions: IBodyCollision[]): void {

        collisions.forEach((collision: IBodyCollision) => {

            const bodyABottom: number = (collision.bodyA.y + collision.bodyA.height);
            const bodyBBottom: number = collision.bodyB.y + collision.bodyB.height;
            const bodyARight: number = collision.bodyA.x + collision.bodyA.width;
            const bodyBRight: number = collision.bodyB.x + collision.bodyB.width;
            
            const bCollision: number = bodyBBottom - collision.bodyA.y;
            const tCollision: number = bodyABottom - collision.bodyB.y;
            const lCollision: number = bodyARight - collision.bodyB.x;
            const rCollision: number = bodyBRight - collision.bodyA.x;




            if(collision.bodyA.dynamic){
                if(!collision.bodyB.trigger){

                    // Apply collision force (Currently weight has no affect)

                    const relativeVel = Vector.substract(collision.bodyB.velocity, collision.bodyA.velocity);

                    const percent = 0.8 // usually 20% to 80%
                    const slop = 0.1 // usually 0.01 to 0.1
                    const mass = 2.5;
                    const invMass = 0.4;
                    const restitution = 1.2;
        
                    let n: IVector;
                    let velAlongNormal;

                    
                    
                    // Top collision
                    if (tCollision < bCollision && tCollision < lCollision && tCollision < rCollision)
                    {                           
                        n = {x: 0, y: 1};
                        velAlongNormal = Vector.dot( relativeVel, n );
                        
                        if (!(velAlongNormal > 0)){


                            // Calculate impulse scalar
                            let j = -(1 + restitution) * velAlongNormal
                            j /= 1 / mass + 1 / mass // j /= 1 / A.mass + 1 / B.mass
                            
                            // Apply impulse
                            const impulse: IVector = {x: j * n.x, y: j * n.y}
                            collision.bodyA.velocity.x -= 1 / mass * impulse.x; //  A.velocity -= 1 / A.mass * impulse
                            collision.bodyA.velocity.y -= 1 / mass * impulse.y;

                            // Vec2 correction = penetrationDepth / (A.inv_mass + B.inv_mass)) * percent * n
                            const correction: IVector = {
                                x:(Math.max( tCollision - slop, 0.0 ) / (invMass + invMass) * percent * n.x),
                                y:(Math.max( tCollision - slop, 0.0 ) / (invMass + invMass) * percent * n.y)
                            };
                            if(!collision.bodyA.rest){
                                collision.bodyA.x -= 1 * correction.x;
                                collision.bodyA.y -= 1 * correction.y;
                            }
                            

                            if (collision.bodyB.dynamic && !collision.bodyB.rest){
                                collision.bodyB.velocity.x += 1 / mass * impulse.x; //  A.velocity -= 1 / A.mass * impulse
                                collision.bodyB.velocity.y += 1 / mass * impulse.y;
                                collision.bodyB.x += 1 * correction.x;
                                collision.bodyB.y += 1 * correction.y;
                            }
                        }
                    }

                    // Bottom collision
                    if (bCollision < tCollision && bCollision < lCollision && bCollision < rCollision){
                        n = {x: 0, y: -1};
                        velAlongNormal = Vector.dot( relativeVel, n );
                        
                        if (!(velAlongNormal > 0)){


                            // Calculate impulse scalar
                            let j = -(1 + restitution) * velAlongNormal
                            j /= 1 / mass + 1 / mass // j /= 1 / A.mass + 1 / B.mass
                            
                            // Apply impulse
                            const impulse: IVector = {x: j * n.x, y: j * n.y}
                            collision.bodyA.velocity.x -= 1 / mass * impulse.x; //  A.velocity -= 1 / A.mass * impulse
                            collision.bodyA.velocity.y -= 1 / mass * impulse.y;

                            // Vec2 correction = penetrationDepth / (A.inv_mass + B.inv_mass)) * percent * n
                            const correction: IVector = {
                                x:(Math.max( bCollision - slop, 0.0 ) / (invMass + invMass) * percent * n.x),
                                y:(Math.max( bCollision - slop, 0.0 ) / (invMass + invMass) * percent * n.y)
                            };
                            collision.bodyA.x -= 1 * correction.x;
                            collision.bodyA.y -= 1 * correction.y;

                            if (collision.bodyB.dynamic){
                                collision.bodyB.velocity.x += 1 / mass * impulse.x; //  A.velocity -= 1 / A.mass * impulse
                                collision.bodyB.velocity.y += 1 / mass * impulse.y;
                                collision.bodyB.x += 1 * correction.x;
                                collision.bodyB.y += 1 * correction.y;
                            }
                        } 
                    }

                    // Right collision
                    if (rCollision < lCollision && rCollision < tCollision && rCollision < bCollision)
                    {
                        n = {x: -1, y: 0};
                        velAlongNormal = Vector.dot( relativeVel, n );

                        if (!(velAlongNormal > 0)){


                            // Calculate impulse scalar
                            let j = -(1 + restitution) * velAlongNormal
                            j /= 1 / mass + 1 / mass // j /= 1 / A.mass + 1 / B.mass
                            
                            // Apply impulse
                            const impulse: IVector = {x: j * n.x, y: j * n.y}
                            collision.bodyA.velocity.x -= 1 / mass * impulse.x; //  A.velocity -= 1 / A.mass * impulse
                            collision.bodyA.velocity.y -= 1 / mass * impulse.y;

                            // Vec2 correction = penetrationDepth / (A.inv_mass + B.inv_mass)) * percent * n
                            
                            const correction: IVector = {
                                x:(Math.max( rCollision - slop, 0.0 ) / (invMass + invMass) * percent * n.x), 
                                y:(Math.max( rCollision - slop, 0.0 ) / (invMass + invMass) * percent * n.y)
                            };
                            collision.bodyA.x -= 1 * correction.x;
                            collision.bodyA.y -= 1 * correction.y;

                            if (collision.bodyB.dynamic){
                                collision.bodyB.velocity.x += 1 / mass * impulse.x; //  A.velocity -= 1 / A.mass * impulse
                                collision.bodyB.velocity.y += 1 / mass * impulse.y;
                                collision.bodyB.x += 1 * correction.x;
                                collision.bodyB.y += 1 * correction.y;
                            }
                        }
                    }

                    // Left collision
                    if (lCollision < rCollision && lCollision < tCollision && lCollision < bCollision){
                        n = {x: 1, y: 0};
                        velAlongNormal = Vector.dot( relativeVel, n );

                        if (!(velAlongNormal > 0)){


                            // Calculate impulse scalar
                            let j = -(1 + restitution) * velAlongNormal
                            j /= 1 / mass + 1 / mass // j /= 1 / A.mass + 1 / B.mass
                            
                            // Apply impulse
                            const impulse: IVector = {x: j * n.x, y: j * n.y}
                            collision.bodyA.velocity.x -= 1 / mass * impulse.x; //  A.velocity -= 1 / A.mass * impulse
                            collision.bodyA.velocity.y -= 1 / mass * impulse.y;

                            // Vec2 correction = penetrationDepth / (A.inv_mass + B.inv_mass)) * percent * n
                            
                            const correction: IVector = {
                                x:(Math.max( lCollision - slop, 0.0 ) / (invMass + invMass) * percent * n.x), 
                                y:(Math.max( lCollision - slop, 0.0 ) / (invMass + invMass) * percent * n.y)
                            };
                            collision.bodyA.x -= 1 * correction.x;
                            collision.bodyA.y -= 1 * correction.y;

                            if (collision.bodyB.dynamic){
                                collision.bodyB.velocity.x += 1 / mass * impulse.x; //  A.velocity -= 1 / A.mass * impulse
                                collision.bodyB.velocity.y += 1 / mass * impulse.y;
                                collision.bodyB.x += 1 * correction.x;
                                collision.bodyB.y += 1 * correction.y;
                            }
                            
                        }
                    }

                    if (collision.bodyA.velocity.y < 0.9 && collision.bodyA.velocity.x < 0.9 &&
                        collision.bodyA.velocity.y > -0.9 && collision.bodyA.velocity.x > -0.9){
                        collision.bodyA.rest = true;
                    }else {
                        collision.bodyA.rest = false;
                    }
                    if(collision.bodyB.dynamic){
                        if (collision.bodyB.velocity.y < 0.9 && collision.bodyB.velocity.x < 0.9 &&
                            collision.bodyB.velocity.y > -0.9 && collision.bodyB.velocity.x > -0.9){
                            collision.bodyB.rest = true;
                        }else {
                            collision.bodyB.rest = false;
                        }
                    }
                    
                    
                }
            }
            

            if (null != collision.bodyA.onCollision) {

                collision.bodyA.onCollision(collision.bodyB);
            }

            if (null != collision.bodyB.onCollision) {
                collision.bodyB.onCollision(collision.bodyA);
            }
        });
    }

    /*
    private sleepResting(restingBodies: IBody[]){
        restingBodies.forEach((body: IBody) => {
            body.x = body.prevX!;
            body.y = body.prevY!;
            body.velocity.x = 0;
            body.velocity.y = 0;
        });
    }*/
}