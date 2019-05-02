class Mat2 {
    constructor(_00, _01,
                _10, _11) {
        this._00 = _00; this._01 = _01;
        this._10 = _10; this._11 = _11;
    }

    mmul(m) {
        return new Mat2(
            this._00*m._00 + this._01*m._10, this._00*m._01 + this._01*m._11,
            this._10*m._00 + this._11*m._10, this._10*m._01 + this._11*m._11
        );
    }

    vmul(v) {
        return new Vec2(
            this._00*v._0 + this._01*v._1,
            this._10*v._0 + this._11*v._1
        );
    }

    clone() {
        return new this.constructor(this._00, this._01, this._10, this._11);
    }

    toArray() {
        return [
            [this._00, this._01],
            [this._10, this._11]
        ];
    }
}

class Mat3 {
    constructor(_00, _01, _02,
                _10, _11, _12,
                _20, _21, _22) {
        this._00 = _00; this._01 = _01; this._02 = _02;
        this._10 = _10; this._11 = _11; this._12 = _12;
        this._20 = _20; this._21 = _21; this._22 = _22;
    }

    mmul(m) {
        return new Mat3(
            this._00*m._00 + this._01*m._10 + this._02*m._20, this._00*m._01 + this._01*m._11 + this._02*m._21, this._00*m._02 + this._01*m._12 + this._02*m._22,
            this._10*m._00 + this._11*m._10 + this._12*m._20, this._10*m._01 + this._11*m._11 + this._12*m._21, this._10*m._02 + this._11*m._12 + this._12*m._22,
            this._20*m._00 + this._21*m._10 + this._22*m._20, this._20*m._01 + this._21*m._11 + this._22*m._21, this._20*m._02 + this._21*m._12 + this._22*m._22,
        );
    }

    immul(m) {
        var _00 = this._00*m._00 + this._01*m._10 + this._02*m._20,
            _01 = this._00*m._01 + this._01*m._11 + this._02*m._21,
            _02 = this._00*m._02 + this._01*m._12 + this._02*m._22,
            _10 = this._10*m._00 + this._11*m._10 + this._12*m._20,
            _11 = this._10*m._01 + this._11*m._11 + this._12*m._21,
            _12 = this._10*m._02 + this._11*m._12 + this._12*m._22,
            _20 = this._20*m._00 + this._21*m._10 + this._22*m._20,
            _21 = this._20*m._01 + this._21*m._11 + this._22*m._21,
            _22 = this._20*m._02 + this._21*m._12 + this._22*m._22;
        
        this._00 = _00; this._01 = _01; this._02 = _02;
        this._10 = _10; this._11 = _11; this._12 = _12;
        this._20 = _20; this._21 = _21; this._22 = _22;
    }

    vmul(v) {
        return new Vec3(
            this._00*v._0 + this._01*v._1 + this._02*v._2,
            this._10*v._0 + this._11*v._1 + this._12*v._2,
            this._20*v._0 + this._21*v._1 + this._22*v._2
        );
    }

    clone() {
        return new this.constructor(
            this._00, this._01, this._02,
            this._10, this._11, this._12,
            this._20, this._21, this._22
        );
    }

    toArray() {
        return [
            [this._00, this._01, this._02],
            [this._10, this._11, this._12],
            [this._20, this._21, this._22]
        ];
    }
}

class Mat4 {
    constructor(_00, _01, _02, _03,
                _10, _11, _12, _13,
                _20, _21, _22, _23,
                _30, _31, _32, _33) {
        this._00 = _00; this._01 = _01; this._02 = _02; this._03 = _03;
        this._10 = _10; this._11 = _11; this._12 = _12; this._13 = _13;
        this._20 = _20; this._21 = _21; this._22 = _22; this._23 = _23;
        this._30 = _30; this._31 = _31; this._32 = _32; this._33 = _33;
    }

    mmul(m) {
        return new Mat4(
            this._00*m._00 + this._01*m._10 + this._02*m._20 + this._03*m._30, this._00*m._01 + this._01*m._11 + this._02*m._21 + this._03*m._31, this._00*m._02 + this._01*m._12 + this._02*m._22 + this._03*m._32, this._00*m._03 + this._01*m._13 + this._02*m._23 + this._03*m._33,
            this._10*m._00 + this._11*m._10 + this._12*m._20 + this._13*m._30, this._10*m._01 + this._11*m._11 + this._12*m._21 + this._13*m._31, this._10*m._02 + this._11*m._12 + this._12*m._22 + this._13*m._32, this._10*m._03 + this._11*m._13 + this._12*m._23 + this._13*m._33,
            this._20*m._00 + this._21*m._10 + this._22*m._20 + this._23*m._30, this._20*m._01 + this._21*m._11 + this._22*m._21 + this._23*m._31, this._20*m._02 + this._21*m._12 + this._22*m._22 + this._23*m._32, this._20*m._03 + this._21*m._13 + this._22*m._23 + this._23*m._33,
            this._30*m._00 + this._31*m._10 + this._32*m._20 + this._33*m._30, this._30*m._01 + this._31*m._11 + this._32*m._21 + this._33*m._31, this._30*m._02 + this._31*m._12 + this._32*m._22 + this._33*m._32, this._30*m._03 + this._31*m._13 + this._32*m._23 + this._33*m._33
        );
    }

    vmul(v) {
        return new Vec4(
            this._00*v._0 + this._10*v._1 + this._20*v._2 + this._30*v._3,
            this._01*v._0 + this._11*v._1 + this._21*v._2 + this._31*v._3,
            this._02*v._0 + this._12*v._1 + this._22*v._2 + this._32*v._3,
            this._03*v._0 + this._13*v._1 + this._23*v._2 + this._33*v._3
        );
    }

    clone() {
        return new this.constructor(
            this._00, this._01, this._02, this._03,
            this._10, this._11, this._12, this._13,
            this._20, this._21, this._22, this._23,
            this._30, this._31, this._32, this._33,
        );
    }

    toArray() {
        return [
            [this._00, this._01, this._02, this._03],
            [this._10, this._11, this._12, this._13],
            [this._20, this._21, this._22, this._23],
            [this._30, this._31, this._32, this._33]
        ];
    }
}
