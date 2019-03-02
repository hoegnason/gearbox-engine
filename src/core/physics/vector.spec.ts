import { Vector } from './vector';

describe('Vector', () => {
    it('should add vectors <2,1> and <2,1> to create the vector <4, 2>', () => {
        const vec1 = {x: 2, y: 1};
        const vec2 = {x: 2, y: 1};
        
        expect(Vector.add(vec1, vec2)).toEqual({x: 4, y: 2});
    });

    it('should substract vectors <2,1> and <4,2> to create the vector <-2, -1>', () => {
        const vec1 = {x: 2, y: 1};
        const vec2 = {x: 4, y: 2};
        
        expect(Vector.substract(vec1, vec2)).toEqual({x: -2, y: -1});
    });
});