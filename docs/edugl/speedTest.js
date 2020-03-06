var one = 1,
    oneMillion = 1000000,
    oneHundredMillion = 100000000,
    oneBillion = 1000000000;

function testObjectVec2VsList() {

    speedTest('Vec2 mul', oneMillion, function () {
        var v = new Vec2(1, 2).mul(8);
    });
    
    speedTest('List mul', oneMillion, function () {
        var v = [1, 2].mul(8);
    });


    speedTest('Vec3 mul', oneMillion, function () {
        var v = new Vec2(1, 2, 3).mul(243);
    });
    
    speedTest('List mul (len 3)', oneMillion, function () {
        var v = [1, 2, 3].mul(243);
    });

    speedTest('Vec2 add', oneMillion, function () {
        var v = new Vec2(1, 2).add(new Vec2(5, 4));
    });

    speedTest('List add', oneMillion, function () {
        var v = [1, 2].add([5, 4]);
    });


    speedTest('Vec2 sq', oneMillion, function () {
        var v = new Vec2(1, 2).squared();
    });

    speedTest('List sq', oneMillion, function () {
        var v = [1, 2].squared();
    });

    
    
    /*
      speedTest('Proto sum', oneMillion, function () {
      var v = [1, 2];
      var r = v.mul(103);
      });

      speedTest('Vect sum', oneMillion, function () {
      var v = new Vec2(1, 2);
      var r = v.mul(103);
      });
    */
    speedTest('MMUL mat3x3', oneMillion, function () {
        var p = new Mat3(2, 0, 3, 0, 2, 2, 0, 0, 1).vmul(new Vec3(5, 3, 1));
    });


    speedTest('MMUL array', oneMillion, function () {
        var p = [
            [2, 0, 3],
            [0, 2, 2],
            [0, 0, 1]
        ].mmul([5, 3, 1]);
    });

    /*
      speedTest('MMUL matrix', oneMillion, function () {
      var p = new Matrix([
      [2, 0, 3],
      [0, 2, 2],
      [0, 0, 1]
      ]).mul3c(new Matrix([
      [5],
      [3],
      [1]
      ]));
      });
    */
    
    /*
      speedTest('Vec2 clone', oneMillion, function () {
      var v = new Vec2(1, 2);
      var c = v.clone();
      });

      speedTest('List clone', oneMillion, function () {
      var v = [1, 2];
      var c = vec2Clone(v);
      });
    */
}

function testMM() {
    var c = null;
    speedTest('IMM3', oneMillion, function () {
        var a = new Mat3(
            10, 11, 12,
            13, 14, 15,
            16, 17, 18
        );

        var b = new Mat3(
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        );

        a.immul(b);
    });

    var ab = new Mat3(
        10, 11, 12,
        13, 14, 15,
        16, 17, 18
    );

    var bb = new Mat3(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    );
    
    speedTest('MM3', oneMillion, function () {
        return ab.mmul(bb);
    });

}

function varTest() {
    speedTest('No var', oneMillion, function () {
        asdf = 3;
        fdsa = asdf + 1;
    });
    speedTest('var', oneMillion, function () {
        var asdf = 3;
        var fdsa = asdf + 1;
    });
}

function arrTest() {
    speedTest('construct []', oneMillion, function () {
        var arr = [];
    });
    speedTest('construct new Array()', oneMillion, function () {
        var arr = new Array();
    });

    var d = [1,2,3,4,5,6,7,8,9,10];
    speedTest('for of loop', oneMillion, function () {
        var arr = [];
        for (var i=0; i<d.length; ++i) {
            arr[i] = d[i];
        }
    });
    speedTest('for loop', oneMillion, function () {
        var arr = [];
        for (var i of d) {
            arr.push(i);
        }
    });
}


function pxSpeed() {
    ctx.setColor(255, 0, 0);       
    speedTest('on off', 1, function () {
        ctx.fillRect(0, 0, 100, 100);
        ctx.setColor(0, 255, 0);
        ctx.fillRect(30, 0, 100, 100);
    });


    speedTest('setColor', 600*600, function () {
        ctx.setColor(0, 0, 0);       
    });

    speedTest('getPixel', 600*600, function () {
        ctx.getPixel(10, 10);       
    });
}

function initCc() {
    ccanvas = document.getElementById('test-canvas'),
    cctx = ccanvas.getContext('2d');
}

function canvasRender() {
    speedTest('fillRect', 600*600, function () {
        setPixel(10, 10);
    });
}


function eduglRender() {
    speedTest('fillRect', 1, function () {
        ctx.fillRect(0, 0, 100, 100);
    });
}

function testColorString() {
    speedTest('no cache', oneMillion, function () {
        ctx.getColorString(23, 23, 23);
    });
}

function testAlpha() {
    speedTest('alpha', 1, function () {
        tests.alpha();
    });
}

function testHash() {
    var c = new Color(234, 12, 23, 23);
    speedTest('hash', 1, function () {
        for (var i=0; i<100000; ++i) 
            c.hash();
    });
}

function testSetPixelColor() {
}


function vec2Clone(v) {
    return v.slice(0);
}

function vec2Sum(v) {
    return v[0] + v[1];
}

function speedTest(name, n, f) {
    var start = new Date();
    for (var i=0; i<n; ++i) f(n);
    var end = new Date();
    console.log('Test ' + name + ' took ' + (end - start) + ' milliseconds to complete ' + n + ' iterations.');
}
