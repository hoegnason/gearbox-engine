// import {render} from 'react-testing-library'

import { PhysicsEngine } from '../../core/physics/physics-engine';

/*
function timeout(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/

describe('Physics Engine', async () => {

  let engine: PhysicsEngine;
  let calledUpdate: any;
  let calledCollision: any;

  beforeEach(() => {
    calledUpdate = jest.fn();
    calledCollision = jest.fn();

    engine = new PhysicsEngine();

    // Add ground, ceiling and walls
    engine.addBody({
      bodyName: 'CeilingBody',
      colided: false,
      dynamic: false,
      height: 100,
      prevX: 0,
      prevY: 0,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 1000,
      x: 0,
      y: 0
    })

    engine.addBody({
      bodyName: 'GroundBody',
      colided: false,
      dynamic: false,
      height: 100,
      prevX: 0,
      prevY: 1000,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 1000,
      x: 0,
      y: 1000
    })

    engine.addBody({
      bodyName: 'LeftWallBody',
      colided: false,
      dynamic: false,
      height: 1000,
      prevX: 0,
      prevY: 0,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 100,
      x: 0,
      y: 0
    })

    engine.addBody({
      bodyName: 'RightWallBody',
      colided: false,
      dynamic: false,
      height: 1000,
      prevX: 1000,
      prevY: 0,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 100,
      x: 1000,
      y: 0
    })
  });

  it('should collide with trigger, and trigger calls onCollision', () => {

    const triggerCollision = jest.fn();

    engine.addBody({
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 250,
      prevY: 250,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 50,
      x: 250,
      y: 250
    })

    engine.addBody({
      bodyName: 'TriggerBody',
      colided: false,
      dynamic: false,
      height: 500,
      onCollision: triggerCollision,
      prevX: 250,
      prevY: 250,
      trigger: true,
      velocity: { x: 0, y: 0 },
      width: 500,
      x: 250,
      y: 250
    })


      engine.tick();


    // Dynamic body collided wtih trigger
    expect(calledCollision).toHaveBeenCalledWith({
      bodyID: 7,
      bodyName: 'TriggerBody',
      colided: false,
      dynamic: false,
      height: 500,
      onCollision: triggerCollision,
      prevX: 250,
      prevY: 250,
      trigger: true,
      velocity: { x: 0, y: 0 },
      width: 500,
      x: 250,
      y: 250
    });

    // Trigger collided with dynamic body
    expect(triggerCollision).toHaveBeenCalled();
  })

  it('Should make dynamic body fall by gravity (and collide with top of static body)', () => {

    engine.addBody({
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 250,
      prevY: 250,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 50,
      x: 250,
      y: 250
    })


    for (let ticks = 0; ticks < 100; ticks++) {
      engine.tick();
    };

    // Collided with ground
    expect(calledCollision).toHaveBeenCalledWith({
      bodyID: 3,
      bodyName: 'GroundBody',
      colided: false,
      dynamic: false,
      height: 100,
      prevX: 0,
      prevY: 1000,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 1000,
      x: 0,
      y: 1000
    });

    expect(calledUpdate).toHaveBeenCalled();

  });


  it('Should collide with ceiling', () => {

    // Body with upward velocity
    engine.addBody({
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 100,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 100,
      prevY: 100,
      trigger: false,
      velocity: { x: 0, y: -2 },
      width: 100,
      x: 100,
      y: 100
    })


    for (let ticks = 0; ticks < 100; ticks++) {
      engine.tick();
    };

    // Collided with ceiling
    expect(calledCollision).toHaveBeenCalledWith({
      bodyID: 2,
      bodyName: 'CeilingBody',
      colided: false,
      dynamic: false,
      height: 100,
      prevX: 0,
      prevY: 0,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 1000,
      x: 0,
      y: 0
    });

  });

  it('Should collide with left side of static body', () => {

    // Body with left velocity and hovering
    engine.addBody({
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 100,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 100,
      prevY: 100,
      trigger: false,
      velocity: { x: -1, y: -1 },
      width: 100,
      x: 100,
      y: 100
    })


    for (let ticks = 0; ticks < 100; ticks++) {
      engine.tick();
    };

    // Collided with left wall
    expect(calledCollision).toHaveBeenCalledWith({
      bodyID: 4,
      bodyName: 'LeftWallBody',
      colided: false,
      dynamic: false,
      height: 1000,
      prevX: 0,
      prevY: 0,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 100,
      x: 0,
      y: 0
    });

  });

  it('Should collide with right side of static body', () => {

    // Body with right velocity and hovering
    engine.addBody({
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 250,
      prevY: 250,
      trigger: false,
      velocity: { x: 10, y: -1 },
      width: 50,
      x: 250,
      y: 250
    })


    for (let ticks = 0; ticks < 100; ticks++) {
      engine.tick();
    };

    // Collided with right wall
    expect(calledCollision).toHaveBeenCalledWith({
      bodyID: 5,
      bodyName: 'RightWallBody',
      colided: false,
      dynamic: false,
      height: 1000,
      prevX: 1000,
      prevY: 0,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 100,
      x: 1000,
      y: 0
    });

  });
});