import { PhysicsEngine } from '../../core/physics/physics-engine';

describe('Physics Engine', async () => {

  let engine: PhysicsEngine;
  let calledUpdate: any;
  let calledCollision: any;
  let calledGround: any;

  beforeEach(() => {
    calledUpdate = jest.fn();
    calledCollision = jest.fn();
    calledGround = jest.fn();

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
      onCollision: calledGround,
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
      onCollision: calledGround,
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
      prevX: 350,
      prevY: 350,
      trigger: false,
      velocity: { x: 50, y: -2 },
      width: 50,
      x: 350,
      y: 350
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

  it('Should keep body in place because of resting state', () => {

    engine.addBody({
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 250,
      prevY: 952,
      rest: true,
      trigger: false,
      velocity: { x: 0, y:0  },
      width: 50,
      x: 250,
      y: 952
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
      onCollision: calledGround,
      prevX: 0,
      prevY: 1000,
      trigger: false,
      velocity: { x: 0, y: 0 },
      width: 1000,
      x: 0,
      y: 1000
    });

    // Ground collided with dynamic body
    expect(calledGround).toHaveBeenCalledWith({
      bodyID: 6,
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: calledCollision,
      onUpdate: calledUpdate,
      prevX: 250,
      prevY: 952,
      rest: true,
      shouldUpdate: true,
      trigger: false,
      velocity: { x: 0, y:-0.09090909090909094  },
      width: 50,
      x: 250,
      y: 952
    })

  });
  
  it('Should top and bottom collide with dynamic body', () => {

    const upperCollision = jest.fn();
    const lowerCollision = jest.fn();

    engine.addBody({
      bodyName: 'UpperDynamicBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: upperCollision,
      onUpdate: calledUpdate,
      prevX: 250,
      prevY: 952,
      rest: true,
      trigger: false,
      velocity: { x: 0, y:0  },
      width: 50,
      x: 250,
      y: 952
    })

    engine.addBody({
      bodyName: 'LowerDynamicBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: lowerCollision,
      onUpdate: calledUpdate,
      prevX: 250,
      prevY: 652,
      rest: true,
      trigger: false,
      velocity: { x: 0, y:0  },
      width: 50,
      x: 250,
      y: 652
    })


    for (let ticks = 0; ticks < 100; ticks++) {
      engine.tick();
    };

    // Collided Upper Body
    expect(lowerCollision).toHaveBeenCalledWith({
      bodyID: 6,
      bodyName: 'UpperDynamicBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: upperCollision,
      onUpdate: calledUpdate,
      prevX: 250,
      prevY: 952.029292929293,
      rest: true,
      shouldUpdate: true,
      trigger: false,
      velocity: { x: 0, y:-0.29292929292929326  },
      width: 50,
      x: 250,
      y: 950.1
    });
  });

  it('Should collide with left and right of dynamic bodies', () => {

    const leftCollision = jest.fn();
    const rightCollision = jest.fn();

    engine.addBody({
      bodyName: 'LeftDynamicBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: leftCollision,
      onUpdate: calledUpdate,
      prevX: 300,
      prevY: 600,
      rest: true,
      trigger: false,
      velocity: { x: 1, y:0  },
      width: 50,
      x: 300,
      y: 500
    })

    engine.addBody({
      bodyName: 'RightDynamicBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: rightCollision,
      onUpdate: calledUpdate,
      prevX: 340,
      prevY: 600,
      rest: true,
      trigger: false,
      velocity: { x: -1, y:0  },
      width: 50,
      x: 340,
      y: 500
    })


    for (let ticks = 0; ticks < 100; ticks++) {
      engine.tick();
    };

    // Collided right Body
    expect(rightCollision).toHaveBeenCalled();
  });

  it('Should push a body inside another body upward', () => {

    const insideCollision = jest.fn();
    const outsideCollision = jest.fn();

    engine.addBody({
      bodyName: 'SmallDynamicBody',
      colided: false,
      dynamic: true,
      height: 50,
      onCollision: insideCollision,
      onUpdate: calledUpdate,
      prevX: 400,
      prevY: 600,
      rest: true,
      trigger: false,
      velocity: { x: 0, y:0  },
      width: 50,
      x: 400,
      y: 600
    })

    engine.addBody({
      bodyName: 'LargeDynamicBody',
      colided: false,
      dynamic: true,
      height: 200,
      onCollision: outsideCollision,
      onUpdate: calledUpdate,
      prevX: 350,
      prevY: 550,
      rest: true,
      trigger: false,
      velocity: { x: 0, y:0  },
      width: 200,
      x: 350,
      y: 550
    })


    for (let ticks = 0; ticks < 100; ticks++) {
      engine.tick();
    };

    // Collided inside body
    expect(outsideCollision).toHaveBeenCalled();
  });
});