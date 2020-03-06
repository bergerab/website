/*
 * Takes a min and max value
 * Interpolation can be done with linear/square functions, you must give a value 'p' that is between 0 and 1
 */
class Interpolator {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    interp(p, type='linear') {
        if (type === 'linear')
            return this.linear(p);
        if (type === 'cubic')
            return this.cubed(p);
    }

    // other interpolations can be expressed as modifications to linear interpolation
    linear(p) {
        var v = this.a + (this.b - this.a) * p;
        if (this.a > this.b)
            return Math.max(Math.min(v, this.a), this.b);
        else
            return Math.min(Math.max(v, this.a), this.b);            
    }

    square(p) {
        return this.linear(p*p);
    }

    cubed(p) {
        return this.linear(p*p*p);
    }
}
