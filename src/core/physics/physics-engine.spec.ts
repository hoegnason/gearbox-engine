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
      width: 2500,
      x: 0,
      y: 0
    })

    engine.addBody({
      bodyName: 'GroundBody',
      colided: false,
      dynamic: false,
      height: 100,
      prevX: 0,
      prevY: 1500,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 2500,
      x: 0,
      y: 1500
    })

    engine.addBody({
      bodyName: 'LeftWallBody',
      colided: false,
      dynamic: false,
      height: 2500,
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
      height: 2500,
      prevX: 2500,
      prevY: 0,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 100,
      x: 2500,
      y: 0
    })
  });

  it('should collide with trigger, and trigger calls onCollision', () => {

    const triggerCollision = jest.fn();

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
      velocity: { x: 0, y: 0 },
      width: 100,
      x: 100,
      y: 100
    })

    engine.addBody({
      bodyName: 'TriggerBody',
      colided: false,
      dynamic: false,
      height: 1000,
      onCollision: triggerCollision,
      prevX: 100,
      prevY: 100,
      trigger: true,
      velocity: { x: 0, y: 0 },
      width: 1000,
      x: 100,
      y: 100
    })

    for (let ticks = 0; ticks < 1; ticks++) {
      engine.tick();
    };

    // Dynamic body collided wtih trigger
    expect(calledCollision).toHaveBeenCalledWith({

      bodyID: 7,
      bodyName: 'TriggerBody',
      colided: false,
      dynamic: false,
      height: 1000,
      onCollision: triggerCollision,
      prevX: 100,
      prevY: 100,
      trigger: true,
      velocity: { x: 0, y: 0 },
      width: 1000,
      x: 100,
      y: 100
    });

    // Trigger collided with dynamic body
    expect(triggerCollision).toHaveBeenCalledWith({
      bodyID: 6,
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 100,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 100,
      prevY: 101,
      shouldUpdate: true,
      trigger: false,
      velocity: { x: 0, y: 1.0166 },
      width: 100,
      x: 100,
      y: 101
    });
  })

  it('Should make dynamic body fall by gravity (and collide with top of static body)', () => {

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
      velocity: { x: 0, y: 0 },
      width: 100,
      x: 100,
      y: 100
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
      prevY: 1500,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 2500,
      x: 0,
      y: 1500
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
      width: 2500,
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
      height: 2500,
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
      height: 100,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 100,
      prevY: 100,
      trigger: false,
      velocity: { x: 10, y: -1.5 },
      width: 100,
      x: 100,
      y: 100
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
      height: 2500,
      prevX: 2500,
      prevY: 0,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 100,
      x: 2500,
      y: 0
    });

  });
});