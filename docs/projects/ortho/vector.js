class Vec2 {
    constructor(_0=0, _1=0) {
        this._0 = _0;
        this._1 = _1;
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

    squared() {
        this._0 = this._0*this._0;
        this._1 = this._1*this._1;
        return this;
    }

    max() {
        return Math.max(this._0, this._1);
    }

    min() {
        return Math.min(this._0, this._1);
    }

    clone() {
        return new Vec2(this._0, this._1);
    }

    abs() {
        this._0 = Math.abs(this._0);
        this._1 = Math.abs(this._1);
        return this;
    }
}

class Vec3 {
    constructor(_0=0, _1=0, _2=0) {
        this._0 = _0;
        this._1 = _1;
        this._2 = _2;        
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

    neg() {
        this._0 = -this._0;
        this._1 = -this._1;
        this._2 = -this._2;
        return this;
    }

    div(s) {
        this._0 /= s;
        this._1 /= s;
        this._2 /= s;        
        return this;
    }

    squared() {
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

    clone() {
        return new Vec3(this._0, this._1, this._2);
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

    toVec4(_3=1) {
        return new Vec4(this._0, this._1, this._2, _3);
    }

    toVec2() {
        return new Vec2(this._0, this._1);
    }

    abs() {
        this._0 = Math.abs(this._0);
        this._1 = Math.abs(this._1);
        this._2 = Math.abs(this._2);
        return this;
    }
}

class Vec4 {
    constructor(_0=0, _1=0, _2=0, _3=0) {
        this._0 = _0;
        this._1 = _1;
        this._2 = _2;
        this._3 = _3;        
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

    squared() {
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

    clone() {
        return new Vec4(this._0, this._1, this._2, this._3);
    }

    toVec2() {
        return new Vec2(this._0, this._1);
    }

    toVec3() {
        return new Vec3(this._0/this._3, this._1/this._3, this._2/this._3);
    }

    abs() {
        this._0 = Math.abs(this._0);
        this._1 = Math.abs(this._1);
        this._2 = Math.abs(this._2);
        this._3 = Math.abs(this._3);        
        return this;
    }
}
