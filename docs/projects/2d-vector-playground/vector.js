/*
 * Vector classes for 2D, 3D, and 4D vectors
 *
 * All functions that modify vectors are side effecting
 * To do non-sid-effecting vector operations, clone before mathod calls
 *
 * Code duplication is on purpose, _0 _1 _2 _3 naming is on purpose too
 * The naming keeps the vectors vague enough that they can be used for
 * different applications (a 3D vector could represent a 3D point in space,
 * or it could represent a 2D homogenous point in space. Naming the 3rd component
 * "z" wouldn't align with the common name of "h" or "w" for homogenous coordinates).
 *
 * Code duplication is necessary because if this has some sort of generic vector class
 * it would have to store the components as a list, and creating a list is not free. And
 * Then we would have to perform operations on the list such as for loops which require
 * temporary counter variables and jumps.
 *
 * Pretty names are granted by use of functions for example `new Vec2(1, 2).x()` will 
 * return the x component of the vector and `new Vec2(1, 2).x(9)` will set the x component
 * to 9 and return the resulting vector (done with side effect).
 */
class Vec2 {
    constructor(_0=0, _1=0) {
        this._0 = _0;
        this._1 = _1;
    }

    x(val) {
        if (val !== undefined) {
            this._0 = val;
            return this;
        } else {
            return this._0;
        }
    }
    
    y(val) {
        if (val !== undefined) {
            this._1 = val;
            return this;
        } else {
            return this._1;
        }
    }

    add(o) {
        this._0 += o._0;
        this._1 += o._1;
        return this;
    }

    sub(o) {
        this._0 -= o._0;
        this._1 -= o._1;
        return this;
    }

    mul(s) {
        this._0 *= s;
        this._1 *= s;
        return this;
    }

    div(s) {
        this._0 /= s;
        this._1 /= s;
        return this;
    }

    dot(o) {
        return this._0*o._0 + this._1*o._1;
    }

    sq() {
        this._0 = this._0*this._0;
        this._1 = this._1*this._1;
        return this;
    }

    mag() {
        return Math.hypot(this._0, this._1);
    }

    dir() {
        return Math.atan2(-this._1, this._0);
    }

    norm() {
        const dir = this.dir();
        this._0 = Math.cos(dir);
        this._1 = -Math.sin(dir);
        return this;
    }

    // the left normal to this
    lnorm() {
        const temp = this._0;
        this._0 = -this._1;
        this._1 = temp;
        return this;
    }

    // the right normal to this
    rnorm() {
        const temp = this._0;
        this._0 = this._1;
        this._1 = -temp;
        return this;
    }

    max() {
        return Math.max(this._0, this._1);
    }

    min() {
        return Math.min(this._0, this._1);
    }

    clone() {
        return new this.constructor(this._0, this._1);
    }

    neg() {
        this._0 = -this._0;
        this._1 = -this._1;
        return this;
    }

    abs() {
        this._0 = Math.abs(this._0);
        this._1 = Math.abs(this._1);
        return this;
    }

    toVec3(_2=1) {
        return new Vec3(this._0, this._1, _2);
    }

    toVec4(_2=1, _3=1) {
        return new Vec4(this._0, this._1, _2, _3);
    }
}

class Vec3 {
    constructor(_0=0, _1=0, _2=0) {
        this._0 = _0;
        this._1 = _1;
        this._2 = _2;        
    }
    
    x(val) {
        if (val !== undefined) {
            this._0 = val;
            return this;
        } else {
            return this._0;
        }
    }
    
    y(val) {
        if (val !== undefined) {
            this._1 = val;
            return this;
        } else {
            return this._1;
        }
    }

    z(val) {
        if (val !== undefined) {
            this._2 = val;
            return this;
        } else {
            return this._2;
        }
    }

    add(o) {
        this._0 += o._0;
        this._1 += o._1;
        this._2 += o._2;
        return this;
    }

    sub(o) {
        this._0 -= o._0;
        this._1 -= o._1;
        this._2 -= o._2;
        return this;
    }

    mul(s) {
        this._0 *= s;
        this._1 *= s;
        this._2 *= s;        
        return this;
    }

    dot(o) {
        return this._0*o._0 + this._1*o._1 + this._2*o._2;
    }

    div(s) {
        this._0 /= s;
        this._1 /= s;
        this._2 /= s;        
        return this;
    }

    sq() {
        this._0 = this._0*this._0;
        this._1 = this._1*this._1;
        this._2 = this._2*this._2;
        return this;
    }

    max() {
        return Math.max(this._0, this._1, this._2);
    }

    min() {
        return Math.min(this._0, this._1, this._2);
    }

    
    // homogenous coordinate normalization
    hnorm() {
        this._0 /= this._3;
        this._1 /= this._3;
        this._2 = 1;
        return this;
    }

    cross(o) {
        var _0 = this._1*o._2 - this._2*o._1,
            _1 = this._2*o._0 - this._0*o._2,
            _2 = this._0*o._1 - this._1*o._0;

        this._0 = _0;
        this._1 = _1;
        this._2 = _2;
        return this;
    }

    neg() {
        this._0 = -this._0;
        this._1 = -this._1;
        this._2 = -this._2;
        return this;
    }
    
    abs() {
        this._0 = Math.abs(this._0);
        this._1 = Math.abs(this._1);
        this._2 = Math.abs(this._2);
        return this;
    }

    clone() {
        return new this.constructor(this._0, this._1, this._2);
    }

    toVec2() {
        return new Vec2(this._0, this._1);
    }

    toVec4(_3=1) {
        return new Vec4(this._0, this._1, this._2, _3);
    }
}

class Vec4 {
    constructor(_0=0, _1=0, _2=0, _3=0) {
        this._0 = _0;
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;        
    }

    x(val) {
        if (val !== undefined) {
            this._0 = val;
            return this;
        } else {
            return this._0;
        }
    }
    
    y(val) {
        if (val !== undefined) {
            this._1 = val;
            return this;
        } else {
            return this._1;
        }
    }

    z(val) {
        if (val !== undefined) {
            this._2 = val;
            return this;
        } else {
            return this._2;
        }
    }

    // helper for referring to a homogenous coordinate
    w(val) {
        if (val !== undefined) {
            this._3 = val;
            return this;
        } else {
            return this._3;
        }
    }

    // helper for referring to a homogenous coordinate    
    h(val) {
        return this.w(val);
    }

    add(o) {
        this._0 += o._0;
        this._1 += o._1;
        this._2 += o._2;
        this._3 += o._3;
        return this;
    }

    sub(o) {
        this._0 -= o._0;
        this._1 -= o._1;
        this._2 -= o._2;
        this._3 -= o._3;
        return this;
    }

    mul(s) {
        this._0 *= s;
        this._1 *= s;
        this._2 *= s;
        this._3 *= s;                
        return this;
    }

    div(s) {
        this._0 /= s;
        this._1 /= s;
        this._2 /= s;
        this._3 /= s;        
        return this;
    }

    sq() {
        this._0 = this._0*this._0;
        this._1 = this._1*this._1;
        this._2 = this._2*this._2;
        this._3 = this._3*this._3;
        return this;
    }

    max() {
        return Math.max(this._0, this._1, this._2, this._3);
    }

    min() {
        return Math.min(this._0, this._1, this._2, this._3);
    }

    // homogenous coordinate normalization
    hnorm() {
        this._0 /= this._3;
        this._1 /= this._3;
        this._2 /= this._3;
        this._3 = 1;
        return this;
    }

    clone() {
        return new this.constructor(this._0, this._1, this._2, this._3);
    }
    
    cross(o) {
        var _0 = this._1*o._2 - this._2*o._1,
            _1 = this._2*o._0 - this._0*o._2,
            _2 = this._0*o._1 - this._1*o._0;

        this._0 = _0;
        this._1 = _1;
        this._2 = _2;
        return this;
    }

    neg() {
        this._0 = -this._0;
        this._1 = -this._1;
        this._2 = -this._2;
        this._3 = -this._3;        
        return this;
    }

    abs() {
        this._0 = Math.abs(this._0);
        this._1 = Math.abs(this._1);
        this._2 = Math.abs(this._2);
        this._3 = Math.abs(this._3);        
        return this;
    }

    toVec2() {
        return new Vec2(this._0, this._1);
    }

    toVec3() {
        return new Vec3(this._0, this._1, this._2);
    }
}
