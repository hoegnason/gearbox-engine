// import { shallow } from 'enzyme';
// import * as React from 'react';

// import Body from '../../components/body/Body';
import { PhysicsEngine } from '../../core/physics/physics-engine';

/*
function timeout(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/

describe('Physics Engine', async () => {

  let engine: PhysicsEngine;

  beforeEach(() => {

    engine = new PhysicsEngine();
  });


  it("Should tick engine", () => {


    for (let ticks=0; ticks< 10; ticks++){
        engine.tick();
    };
  });
});