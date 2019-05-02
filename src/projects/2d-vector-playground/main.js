const canvas = document.getElementById('stage'),
      ctx = canvas.getContext('2d'),
      width = canvas.width,
      height = canvas.height;

class ColoredVec2 extends Vec2 {
    constructor(_0, _1, _color) {
        super(_0, _1);
        this._color = _color;
    }

    color(color) {
        if (color !== undefined) {
            this._color = color;
            return this;
        } else {
            return this._color;
        }
    }

    clone() {
        return new ColoredVec2(this._0, this._1, this._color);
    }
}

function render(vectors) {
    ctx.translate(width/2, height/2);
    ctx.beginPath();
    ctx.moveTo(-width/2, 0);
    ctx.lineTo(width/2, 0);
    ctx.moveTo(0, -height/2);
    ctx.lineTo(0, height/2);
    ctx.stroke();

    ctx.strokeStyle = 'gray';
    for (let y=0; y<height; y+=20) {
        ctx.beginPath();    
        ctx.moveTo(-width/2, y - height/2);
        ctx.lineTo(width/2, y - height/2);
        ctx.stroke();
    }

    for (let x=0; x<width; x+=20) {
        ctx.beginPath();    
        ctx.moveTo(x - width/2, -height/2);
        ctx.lineTo(x - width/2, height/2);
        ctx.stroke();
    }

    for (const v of vectors) {
        ctx.strokeStyle = v.color();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(v.x(), v.y());
        ctx.stroke();
    }
}

// const v1 = new ColoredVec2(100, 20, 'blue'),
//       v2 = new ColoredVec2(0, -100, 'green'),
//       v3 = v1.clone().add(v2).color('purple'),
//       v4 = v2.clone().norm().color('red'),
//       v5 = v1.clone().norm().color('yellow');

// console.log(v5.mag(), v5.dir(), v1.dir());

// render([
//     v1,
//     v2,
//     v3,
//     v4,
//     v5,
// ]);

const v1 = new ColoredVec2(20, 20, 'red'),
      v2 = new ColoredVec2(80, 100, 'blue'),
      v3 = v1.clone().sub(v2).norm().color('green').neg().mul(100);

console.log(v3);



render([
    v1,
    v2,
    v3
]);
