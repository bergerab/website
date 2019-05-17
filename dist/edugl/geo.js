

class Circle {
    // (x - h)^2 - (y - k)^2 = r^2
    constructor (h, k, r) {
        this.center = new Vec2(h, k);
        this.r = r;

    }

    pointIntersects(p) {
        // sqrt((tp._0-mp._0)^2 + (tp._1-mp._1)^2)
        // this can be simplified to not use sqrt for efficiency
        return Math.sqrt(p.clone().sub(this.center).squared().sum()) <= this.r;
    };
};

class Line {
    constructor (p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}
