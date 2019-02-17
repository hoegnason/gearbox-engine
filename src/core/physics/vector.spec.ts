import { Vector } from './vector';

describe('Vector', () => {
    it('should create the vector <2, 2>', () => {
        const vec1 = {x: 2, y: 1};
        const vec2 = {x: 2, y: 1};
        
        expect(Vector.add(vec1, vec2)).toEqual({x: 4, y: 2});
    });
});