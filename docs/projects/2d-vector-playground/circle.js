class Circle {
    constructor(x, y, r) {
        this.c = new Vec2(x, y);
        this.r = r;
    }

    collidesWithCircle(o) {
        return this.c.clone().sub(o.c).abs().mag() < o.r + this.r;
    }
}
