class Quadtree {
    static fromMatrix(mat, equal=(x, y) => x == y) {
        return new Quadtree();
    }
    
    constructor(val=null, nw=null, ne=null, sw=null, se=null) {
        this.val = val;
        
        this.nw = nw; this.ne = ne;
        this.sw = sw; this.se = se;
    }
}

const mat1 = [
    [0, 0,  1, 0,   1, 1,  1, 1],
    [1, 1,  1, 1,   0, 1,  1, 1],
    
    [1, 1,  1, 0,   0, 0,  1, 1],
    [1, 1,  0, 0,   0, 1,  1, 1],


    
    [0, 0,  0, 1,   0, 1,  1, 1],
    [1, 0,  0, 0,   1, 1,  0, 0],
    
    [1, 1,  1, 1,   1, 1,  1, 1],
    [0, 0,  1, 1,   0, 0,  0, 0],
];
