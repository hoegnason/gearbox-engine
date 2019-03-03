// import { shallow } from 'enzyme';
// import {render} from 'react-testing-library'

// import Body from '../../components/body/Body';
import { PhysicsEngine } from '../../core/physics/physics-engine';

/*
function timeout(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/

describe('Physics Engine', async () => {

  let engine: PhysicsEngine;

  beforeEach(() => {

   // const calledCollision = jest.fn();
   // const calledUpdate = jest.fn();

    engine = new PhysicsEngine();
/*
    engine.addBody({
      bodyName: 'DynamicTestBody',
      colided: false,
      dynamic: true,
      height: 100,
      prevX: 100,
      prevY: 100,
      trigger: false,
      velocity: {x: 0, y: 0},
      width: 100,
      x: 100,
      y: 100
    })

    engine.addBody({
      bodyName: 'DynamicTestBodyWithUpdate',
      colided: false,
      dynamic: true,
      height: 100,
      onUpdate: calledUpdate,
      prevX: 100,
      prevY: 100,
      trigger: false,
      velocity: {x: 0, y: 0},
      width: 100,
      x: 100,
      y: 100
    })

    engine.addBody({
      bodyName: 'DynamicTestWithCollision',
      colided: false,
      dynamic: true,
      height: 100,
      onCollision: calledCollision,
      prevX: 100,
      prevY: 100,
      trigger: false,
      velocity: {x: 0, y: 0},
      width: 100,
      x: 100,
      y: 100
    })
*/
    engine.addBody({
      bodyName: 'CeilingBody',
      colided: false,
      dynamic: false,
      height: 100,
      prevX: 0,
      prevY: 0,
      trigger: false,
      velocity: {x: 0, y: 0},
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
      velocity: {x: 0, y: 0},
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
      velocity: {x: 0, y: 0},
      width: 100,
      x: 0,
      y: 0
    })

    engine.addBody({
      bodyName: 'LeftWallBody',
      colided: false,
      dynamic: false,
      height: 2500,
      prevX: 2500,
      prevY: 0,
      trigger: false,
      velocity: {x: 0, y: 0},
      width: 100,
      x: 2500,
      y: 0
    })

    engine.addBody({
      bodyName: 'TriggerBody',
      colided: false,
      dynamic: false,
      height: 500,
      prevX: 500,
      prevY: 500,
      trigger: true,
      velocity: {x: 0, y: 0},
      width: 500,
      x: 500,
      y: 500
    })
  });


  it("Should make dynamic body fall by gravity", () => {

    /*
    const tbody = document.createElement('tbody')
    const {tagbyid} = render(<Body bodyName={'DynamicTestBody'} colided={false} dynamic={true} height={100} prevX={100} prevY={100}
    trigger={false} velocity={{x: 0, y: 0}} width={100} x={100} y={100}>, container: document.body.appendChild(tbody))
    expect()*/

    for (let ticks=0; ticks< 10; ticks++){
        engine.tick();
    };


  });
});