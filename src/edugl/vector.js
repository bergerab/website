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

    abs() {
        this._0 = Math.abs(this._0);
        this._1 = Math.abs(this._1);
        this._2 = Math.abs(this._2);
        return this;
    }
}

class Vec4 {
    constructor(x=0, y=0, z=0, h=0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.h = h;        
    }

    add(o) {
        this.x += o.x;
        this.y += o.y;
        this.z += o.z;
        this.h += o.h;
        return this;
    }

    sub(o) {
        this.x -= o.x;
        this.y -= o.y;
        this.z -= o.z;
        this.h -= o.h;
        return this;
    }

    mul(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.h *= s;                
        return this;
    }

    div(s) {
        this.x /= s;
        this.y /= s;
        this.z /= s;
        this.h /= s;        
        return this;
    }

    squared() {
        this.x = this.x*this.x;
        this.y = this.y*this.y;
        this.z = this.z*this.z;
        this.h = this.h*this.h;
        return this;
    }

    max() {
        return Math.max(this.x, this.y, this.z, this.h);
    }

    min() {
        return Math.min(this.x, this.y, this.z, this.h);
    }

    clone() {
        return new Vec4(this._0, this._1, this._2, this._3);
    }

    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        this.h = Math.abs(this.h);        
        return this;
    }
}
