var Tests = function (ctx) {
    const tests = {};
    function test(f) {
        tests[f.name] = function () {
            ctx.clear();
            ctx.freeze();
            f();
            ctx.restore();
        };
    }
    
    test(function alpha() {
        var start = new Date();
        function r() {
            ctx.setColorRGBA(255, 0, 0, 0.5);
            ctx.fillRect(20, 20, 50, 50);
        }

        function g() {
            ctx.setColorRGBA(0, 255, 0, 0.5);
            ctx.fillRect(35, 50, 50, 50);
        }

        function b() {
            ctx.setColorRGBA(0, 0, 255, 0.5);
            ctx.fillRect(50, 20, 50, 50);
        }

        g();
        r();
        b();
        var end = new Date();
        console.log(end - start);
    });

    test(function circ() {
        ctx.strokeCirc(25, 25, 25);
        ctx.strokeCirc(25, 25, 10);
        ctx.strokeCirc(25, 25, 5);

        ctx.setColorRGBA(0, 0, 255);
        ctx.fillCirc(90, 90, 50);
        ctx.setColorRGBA(0, 255, 0);
        ctx.fillCirc(90, 90, 25);
        ctx.setColorRGBA(255, 0, 0);
        ctx.fillCirc(90, 90, 10);
    });

    test(function lineDDA() {
        // should make an angled arrow pointing to the right
        ctx.strokeLineDDA(0, 0, 20, 10);
        ctx.strokeLineDDA(10, 0, 20, 10);
        ctx.strokeLineDDA(10, 10, 20, 10);

        // horizontal line
        ctx.strokeLineDDA(50, 120, 100, 120);
        
        // vertical line
        ctx.strokeLineDDA(30, 100, 30, 50);

        // star
        ctx.strokeLineDDA(80, 80, 100, 100);
        ctx.strokeLineDDA(80, 100, 100, 80);
        ctx.strokeLineDDA(80, 90, 100, 90);
        ctx.strokeLineDDA(90, 80, 90, 100);

        // should be 11 pixels
        ctx.strokeLineDDA(35, 35, 45, 45);
    });

    test(function antiAliasing() {
        let y = 0;
        function testY(offset=0) {
            ctx.fillRect(10, (y+=5)+offset, 20, 1);
        }

        let x = 0;
        function testX(offset=0) {
            ctx.fillRect(30 + (x+=5) + offset, 10, 1, 20);
        }

        function testXY(offsetX=0, offsetY=0) {
            ctx.fillRect(30 + offsetX + x, 30 + offsetY + y, 1, 1);
        }

        for (let i=0; i<=1.0; i+=0.1) {
            testY(i);
            testX(i);
            testXY(i, i);
        }
    });

    test(function rotate() {
        // rotate from the top left corner of the rectangle
        ctx.strokeRect(10, 10, 10, 10);
        
        ctx.rotate(0.2); // this should rotate from the origin
        ctx.strokeRect(10, 10, 10, 10);

        ctx.rotate(0.2); // rotate from the origin more
        ctx.strokeRect(10, 10, 10, 10);

        ctx.resetMatrix();

        // rotate from the top left corner of the rectangle
        ctx.translate(30, 30);
        ctx.rotate(0.2);
        ctx.strokeRect(0, 0, 10, 10);
    });

    test(function translate() {
        ctx.fillRect(10, 10, 10, 10);
        ctx.translate(10, 10);
        ctx.fillRect(10, 10, 10, 10);
        ctx.translate(10, 10);        
        ctx.fillRect(10, 10, 10, 10);
        ctx.translate(10, 0);        
        ctx.fillRect(10, 10, 10, 10);
        ctx.translate(0, 10);        
        ctx.fillRect(10, 10, 10, 10);
        ctx.translate(0, 0);
        ctx.setColorRGBA(255, 0, 0);
        ctx.fillRect(10, 10, 10, 10);
    });

    test(function scale() {
        ctx.fillRect(50, 50, 10, 10);
        ctx.scale(2, 2);
        ctx.fillRect(50, 50, 10, 10);
        ctx.resetMatrix();
        ctx.scale(1/2, 2);        
        ctx.fillRect(50, 50, 10, 10);
    });

    test(function rotateAnimation() {
        window.lastFrame = new Date();
        window.thisFrame = new Date();

        function draw() {
            ctx.translate(75, 75);
            ctx.rotate(angle);
            ctx.strokeRect(-25, -25, 50, 50);

            ctx.rotate(angle);
            ctx.strokeRect(-(25/2), -(25/2), 25, 25);

            ctx.rotate(angle);
            ctx.strokeRect(-5, -5, 10, 10);
            ctx.resetMatrix();
        }
        
        var angle = 0;
        function loop() {
            ctx.clear();
            ctx.resetMatrix();

            draw();
            ctx.scale(.5, .5);
            ctx.translate(75, 75);
            draw();

            angle += 0.1;
            angle = angle % (Math.PI*2);

            window.lastFrame = window.thisFrame;
            window.thisFrame = new Date();

            window.msBetweenFrame = (window.thisFrame - window.lastFrame);
            window.fps = 1000/window.msBetweenFrame;

            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    });

    test(function transformCirc() {
        ctx.setColorRGBA(0, 0, 255);
        ctx.strokeCirc(40, 40, 40);

        ctx.translate(20, 0);
        ctx.setColorRGBA(0, 255);
        ctx.strokeCirc(40, 40, 40);

        // should be 1 pixel to the right from the blue circle
        // x=41 y=41 with radius 40
        ctx.resetMatrix();
        ctx.setColorRGBA(255);
        ctx.translate(1, 0);
        ctx.scale(2, 2);
        ctx.strokeCirc(20, 20, 20);

        ctx.rotate(0.5);
        ctx.setColorRGBA(255, 255, 0);
        ctx.strokeCirc(20, 20, 20);
    });

    test(function reflect() {
        ctx.translate(75, 50);
        ctx.setColorRGBA(255, 0, 0);
        ctx.fillCirc(0, 0, 15);
        ctx.scale(-1, -1);
        ctx.setColorRGBA(0, 255, 0);
        ctx.strokeCirc(0, 0, 15);
        ctx.scale(-1, 1);
        ctx.setColorRGBA(0, 0, 255);
        ctx.strokeCirc(0, 0, 15);
        ctx.scale(-1, -1);
        ctx.setColorRGBA(0, 255, 255);        
        ctx.strokeCirc(0, 0, 15);
    });

    test(function physics() {
        function newBall() {
            return {
                p: new Vec2(randomRange(0, ctx.width*0.8), randomRange(0, 50)),
                r: randomRange(50, 80),
                v: new Vec2(0, 0),
                a: new Vec2(0, randomRange(2, 5)),
                red: randomRange(0, 255),
                green: randomRange(0, 255),
                blue: randomRange(0, 255),
            };
        }

        function integrate(ball) {
            if (ball.p._1+ball.r > ctx.height) {
                ball.v._1 = -ball.v._1;
                ball.v.mul(0.85);
            }
            
            ball.p.add(ball.v);
            ball.v.add(ball.a);
        }

        function render(ball) {
            ctx.setColorRGBA(ball.red, ball.green, ball.blue);
            ctx.fillRect(ball.p._0, ball.p._1, ball.r, ball.r);
        }

        var balls = [];
        for (var i=0; i<10; ++i) {
            balls.push(newBall());
        }

        function loop() {
            var start = new Date();
            ctx.clear();

            for (i=0; i<balls.length; ++i) {
                render(balls[i]);
                integrate(balls[i]);
            }

            var end = new Date();
            console.log(end - start);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    });

    test(function physicsImage() {
        function newBall() {
            return {
                p: new Vec2(randomRange(0, ctx.width*0.8), randomRange(0, 50)),
                wh: 50,
                v: new Vec2(0, 0),
                a: new Vec2(0, randomRange(2, 5)),
            };
        }

        function integrate() {
            if (ball.p._1+ball.wh > ctx.height) {
                ball.v._1 = -ball.v._1;
                ball.v.mul(0.85);
            }
            
            ball.p.add(ball.v);
            ball.v.add(ball.a);
        }

        function render() {
            ctx.translate(ball.p._0, ball.p._1);
            ctx.scale(0.2);
            ctx.drawPPM(window.image);
            ctx.resetMatrix();
        }

        var ball = newBall();

        function loop() {
            ctx.clear();
            render();
            integrate();
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    });

    test(function poly() {
        ctx.strokePoly(
            30, 30,
            20, 10,
            10, 14,
        );

        ctx.translate(30, 30);
        ctx.strokePoly(
            30, 30,
            20, 10,
            10, 14,
        );

        ctx.rotate(0.4);
        ctx.strokePoly(
            30, 30,
            20, 10,
            10, 14,
        );

        ctx.resetMatrix();
        ctx.scale(2);

        ctx.translate(10, 0);
        ctx.rotate(0.2);
        ctx.strokePoly(
            20, 20,
            10, 0,
            0, 4,
            0, 20,
        );
    });

    test(function interp() {
        var sc = new Color(255, 0, 0);
        var dc = new Color(0, 0, 255);
        
        for (var i=0; i<ctx.width; ++i) {
            var p = i/ctx.width;
            var ic = sc.interpolate(dc, p, 'cubic');
            ctx.setColorRGBA(ic.r, ic.g, ic.b, ic.a);
            ctx.setPixel(i, 10);
        }
        ctx.flush();        
    });

    return tests;
};
