class Color {
    constructor(r=0, g=0, b=0, a=1.0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }

    getRGBColorString() {
        return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    };

    getRGBAColorString() {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ', ' + this.a + ')';
    };

    hash() {
        return this.r + (this.g << 8) + (this.b << 16);
    }

    equals(o) {
        return this.hash() === o.hash();
    }

    interpolate(to, p, interpType) {
        var ri = new Interpolator(this.r, to.r),
            gi = new Interpolator(this.g, to.g),
            bi = new Interpolator(this.b, to.b),
            ai = new Interpolator(this.a, to.a);
        
        return new Color(ri.interp(p, interpType),
                         gi.interp(p, interpType),
                         bi.interp(p, interpType),
                         ai.interp(p, interpType)
                        );
    }
}
