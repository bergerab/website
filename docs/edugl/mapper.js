class Mapper {
    constructor(smin, smax, dmin, dmax) {
        this.smin = smin;
        this.smax = smax;
        this.dmin = dmin;
        this.dmax = dmax;
    }

    map(sval) {
        var p = (sval-this.smin)/(this.smax-this.smin);
        var v = p*(this.dmax-this.dmin)+this.dmin;
        return Math.min(Math.max(v, this.dmin), this.dmax);
    }
}

// Example of 0 to 1.0 to 0 to 255
// var r1 = new RangeMapper(0, 1.0, 0, 255);
// Example of normal RGB value 0-255 to value between 0 and 1
// var r2 = new RangeMapper(0, 255, 0, 1.0);
// Example of non-zero mins
// var r3 = new RangeMapper(100, 255, 300, 500);
