export interface IVector {
    x: number;
    y: number;
}

export class Vector {
    
    public static add(vec1: IVector, vec2: IVector): IVector {

        return { x: (vec1.x + vec1.x), y: (vec1.y + vec2.y) };
    }
}