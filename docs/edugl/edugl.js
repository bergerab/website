class Pixel {
    constructor(color, node) {
        this.color = color;
        this.node = node;
    }
}

class EduGL {
    constructor(node, init={}) {
        if (!this.validate(init))
            return null;

        this.node = node;
        this.init = init;

        this.pixelWidth = init.pixelWidth || 1;
        this.pixelHeight = init.pixelHeight || 1;
        this.width = init.trueWidth != null ? Math.round(init.trueWidth/this.pixelWidth) : init.width;
        this.height = init.trueHeight != null ? Math.round(init.trueHeight/this.pixelHeight) : init.height;
        this.pixelShape = init.pixelShape || 'rect';
        
        this.state = {
            color: new Color(0, 0, 0, 1.0),
            transformation: new Mat3(
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
            )
        };
        this.fronzenState = null;

        this.bufferedPixels = [];

        this.initialize();
    }

    initialize() {
        this.node.style.display = 'inline-block';
        this.node.style.width = this.width*this.pixelWidth + 'px';
        this.node.style.height = this.height*this.pixelHeight + 'px';
        this.node.style.fontSize = 0;

        var style = document.createElement('style');
        var styleString = 'display: inline-block; width: ' + this.pixelWidth + 'px; height: ' + this.pixelHeight + 'px;';
        if (this.pixelShape === 'circ' || this.pixelShape === 'circle') {
            styleString += 'border-width: 0px;';
            styleString += 'border-radius: ' + this.pixelWidth + 'px;';                
        }
        style.innerHTML = '.edugl-pixel {'+styleString+'}';
        this.node.appendChild(style);

        this.pixels = [];
        for (let i=0; i<this.height; ++i) {
            const row = [];
            for (let j=0; j<this.width; ++j) {
                const pixel = document.createElement('span');
                pixel.className = 'edugl-pixel';
                pixel.style.backgroundColor = new Color(255, 255, 255).getRGBColorString();

                pixel.onclick = function () {
                    console.log('x=' + j, 'y=' + i, 'color=' + Object.values(this.color).join(', '));
                };
                
                this.node.appendChild(pixel);
                row.push(new Pixel(
                    new Color(255, 255, 255, 0.0),
                    pixel
                ));
            }
            this.pixels.push(row);
        }
    }

    strokePoly(...xys) {
        var ps = [];
        var cur = null;
        var first = null;
        for (var i=0; i<xys.length; i+=2) {
            var v = new Vec2(xys[i], xys[i+1]);
            this.applyTransformation(v);

            if (!first) {
                first = v;
            }
            
            if (cur) {
                this.strokeLineDDA(cur._0, cur._1, v._0, v._1);
            }
            
            cur = v;
        }
        this.strokeLineDDA(first._0, first._1, cur._0, cur._1);
        this.flush();
    };

    transformCirc(circ) {
        var pr = new Vec2(circ.cp._0 + circ.r, circ.cp._1);
        this.applyTransformation(circ.cp);
        this.applyTransformation(pr);
        circ.r = Math.abs(circ.cp._0 - pr._1);
    };

    // this function might be off by one or two pixels
    // try small values and look closely
    strokeCirc(x, y, r, rads) {
        var circ = new Circle(x, y, r);

        this.transformCirc(circ);

        if (circ.r < 1)
            return;
        
        rads = rads === undefined ? Math.PI * 2 : rads;
        const d = 2*circ.r,
              // Stroking a circle will never take more pixels than the number of pixels required to outline a square of size d (hence 4*d -- circumference of a square)
              // This is not a tight bound on how many pixels we need so it is inefficient, can be improved with a little thought
              // doesn't work well with anti-aliasing
              numOfPixels = 4*d,
              step = rads/numOfPixels;
        
        for (var i=0; i<rads; i+=step) {
            this.setPixel(circ.cp._0+(circ.r*Math.cos(i)), circ.cp._1-(circ.r*Math.sin(i)));
        }
    };

    // niave circle filling algorithm :|
    fillCirc(x, y, r, rads) {
        var circ = new Circle(x, y, r);
        
        // transform after strokecirc because it already transforms
        this.transformCirc(circ);        

        // had to use smaller step to get all points -- not great
        for (var i=circ.cp._0-circ.r; i<=circ.cp._0+circ.r; i+=0.1) {
            for (var j=circ.cp._1-circ.r; j<=circ.cp._1+circ.r; j+=0.1) {
                var tp = new Vec2(i, j);
                if (circ.pointIntersects(tp))
                    this.setPixel(i, j);
            }
        }
    };

    strokeLineDDA(x1, y1, x2, y2) {
        var p1 = new Vec2(x1, y1),
            p2 = new Vec2(x2, y2);
        
        this.applyTransformation(p1),
        this.applyTransformation(p2);

        var d = p2.clone().sub(p1);

        // the number of pixels we draw for the line
        // equals the max(dx, dy)
        const pixelCount = d.clone().abs().max(),
              steps = d.clone().div(pixelCount);

        for (var i=0; i<=pixelCount; ++i) {
            this.setPixel(p1._0, p1._1);
            p1.add(steps);
        }
    };

    validate(init) {
        var errored = false,
            errorMessages = [];
        
        function error(message) {
            errorMessages.push(message);
            errored = true;
        }
        if (init.trueHeight != null && init.height != null)
            error('Must either specify trueHeight or height, not both.');
        if (init.trueWidth != null && init.width != null)
            error('Must either specify trueWidth or width, not both.');
        if (init.width == null && init.trueWidth == null)
            error('Must specify either width or trueWidth');
        if (init.height == null && init.trueHeight == null)
            error('Must specify either height or trueHeight');
        if (errored) {
            console.error('My Canvas failed to initialize\n', errorMessages.map(x => '\t- ' + x).join('\n'));
            return false;
        }
        return true;
    }

    strokeRect(x=0, y=0, w=0, h=0) {
        this.strokePoly(x, y,
                        x + w, y,
                        x + w, y + h,
                        x, y + h
                       );
    };

    fillRect(x=0, y=0, w=0, h=0) {
        // transformations must be applied on the shapes
        // not the pixels directly
        var p1 = new Vec2(x, y),
            p2 = new Vec2(x + w, y),
            p3 = new Vec2(x + w, y + h),
            p4 = new Vec2(x, y + h);

        this.applyTransformation(p1);
        this.applyTransformation(p2);
        this.applyTransformation(p3);
        this.applyTransformation(p4);

        w = Math.abs(p2._0 - p1._0);
        h = Math.abs(p1._1 - p4._1);
        
        for (var i=p1._0; i<p1._0+w; ++i) {
            for (var j=p1._1; j<p1._1+h; ++j) {
                this.setPixel(i, j);
            }
        }
        this.flush();
    };

    flush() {
        while (this.bufferedPixels.length > 0) {
            this.bufferedPixels.pop()();
        }
    }

    setPixel(x, y) {
        var pixel = this.getPixel(x, y);
        if (pixel && !pixel.color.equals(this.state.color)) {
            var colorString = this.state.color.getRGBColorString();
            var color = this.state.color.clone();
            this.bufferedPixels.push(() => {
                pixel.color = color;
                pixel.node.style.backgroundColor = colorString;
            });
        }
    };

    applyTransformation(v) {
        // apply transformation matrix
        v  = this.state.transformation.vmul(new Vec3(v._0, v._1, 1));
        
        v._0 = v._0;
        v._1 = v._1;
    };

    getPixel(x, y) {
        x = Math.round(x);
        y = Math.round(y);

        if (this.isInViewport(x, y))
            return this.pixels[y][x];

        return null;
    };

    isInViewport(x, y) {
        return y >= 0 && y < this.pixels.length && x >= 0 && x < this.pixels[y].length;
    }

    getPixelColor(x, y) {
        const pixel = this.getPixel(x, y);
        if (pixel) {
            return pixel.color;
        }
        return null;
    };

    setColor(color=new Color()) {
        this.state.color = color;
        this.state.colorString = this.state.color.getRGBColorString();
    };

    setColorRGBA(r=0, g=0, b=0, a=1.0) {
        this.state.color.r = r;
        this.state.color.g = g;
        this.state.color.b = b;
        this.state.color.a = a;
        this.state.colorString = this.state.color.getRGBColorString();
    };

    download(filename, blob) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var dataUrl = e.target.result;
            var a = document.createElement('a');
            a.setAttribute('href', dataUrl);
            a.setAttribute('download', filename);
            a.click();
        };
        reader.readAsDataURL(blob);
    }

    drawPPM(ppm) {
        var ret = ppm.substring(3);
        
        var dimsPart = ret.substring(0, ret.indexOf('\n'));

        if (dimsPart.startsWith('#')) {
            var nl1 = ret.indexOf('\n'),
                nl2 = ret.indexOf('\n', nl1+1);
            dimsPart = ret.substring(nl1, nl2);
        }

        var dims = dimsPart.match(/\d+/g),
            w = dims[0],
            h = dims[1];
        
        var body = ret.substring(ret.indexOf('\n')+1);
        body = body.substring(body.indexOf('\n')+1);
        body = body.substring(body.indexOf('\n')+1);        

        var pos = 0;
        for (var i=0; i<body.length; i+=3) {
            var r = body.charCodeAt(i),
                g = body.charCodeAt(i + 1),
                b = body.charCodeAt(i + 2),
                x = pos % w,
                y = Math.floor(pos/w),
                p = new Vec2(x, y);

            if (p._0 >= 0 && p._0 < this.width && p._1 >= 0 && p._1 < this.height) {
                this.applyTransformation(p);
                this.setColorRGBA(r, g, b);
                this.setPixel(p._0, p._1);
            }
            ++pos;
        }
    };

    forEachPixel(f) {
        for (var i=0; i<this.width; ++i) {
            for (var j=0; j<this.height; ++j) {
                f(this.pixels[j][i], i, j);
            }
        }
    }

    grayscale() {
        this.colorFilter(function (p) {
            // to get shade of gray, average rgb values
            var gray = ((p.color.r + p.color.g + p.color.b)/(255*3))*255;
            p.color.r = p.color.b = p.color.g = gray;
        });
    };

    brighten(i) {
        this.colorFilter(function (p) {
            p.color.r = Math.min((p.color.r + i), 255);
            p.color.g = Math.min((p.color.g + i), 255);
            p.color.b = Math.min((p.color.b + i), 255);
        });
    };

    colorFilter(f) {
        this.forEachPixel(function (p, x, y) {
            f(p);
            this.setColorRGBA(p.color.r, p.color.b, p.color.g);
            this.setPixel(x, y);
        });
    };

    toPPM() {
        var ret = 'P6\n';
        ret += this.width + ' ' + this.height + '\n';
        ret += '255\n';
        var arr = new Uint8Array(ret.length + this.width*this.height*3);

        for (var i=0; i<ret.length; ++i) {
            arr[i] = ret.charCodeAt(i);
        }
        var offset = i;
        var pos = 0;
        for (i=0; i<this.height; ++i) {
            for (var j=0; j<this.width; ++j) {
                var color = this.pixels[i][j].color;
                arr[offset+pos] = color.r;
                arr[offset+pos+1] = color.g;
                arr[offset+pos+2] = color.b;
                offset += 2;
                ++pos;
            }
        }

        return new Blob([arr]);
    };

    downloadPPM(filename='export') {
        this.download(filename + '.ppm', this.toPPM());
    };

    randomColor() {
        function random() {
            return randomRange(0, 255);
        }
        this.setColorRGBA(random(), random(), random());
    };

    freeze() {
        this.frozenState = Object.assign({}, this.state);
        // Object.assign is a shallow copy
        this.frozenState.color = this.state.color.clone();
        this.frozenState.transformation = this.state.transformation.clone();
    };

    restore = function () {
        this.state = Object.assign({}, this.frozenState);
        // Object.assign is a shallow copy
        this.state.color = this.frozenState.color.clone();
        this.state.transformation = this.state.transformation.clone();        
    };

    clearRect(x, y, w, h) {
        this.freeze();
        this.setColorRGBA(255, 255, 255, 1.0);
        this.fillRect(0, 0, w, h);
        this.restore();
    };

    clear() {
        this.resetMatrix();
        this.clearRect(0, 0, this.width, this.height);
    };

    drawOrigin() {
        this.freeze();
        this.setColorRGBA(0, 255, 0);
        this.strokeLineDDA(0, 0, 20, 0);
        this.strokeLineDDA(0, 0, 0, 20);
        this.strokeLineDDA(0, 0, -20, 0);
        this.strokeLineDDA(0, 0, 0, -20);
        this.restore();
    };

    rotate(t) {
        this.state.transformation = this.state.transformation.mmul(new Mat3(
            Math.cos(t), -Math.sin(t), 0,
            Math.sin(t), Math.cos(t), 0,
            0, 0, 1,
        ));
    }

    scale(sx, sy) {
        if (sy === undefined)
            sy = sx;
        this.state.transformation = this.state.transformation.mmul(new Mat3(
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1,
        ));
    };

    resetMatrix() {
        this.state.transformation = new Mat3(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
    };

    translate(tx, ty) {
        this.state.transformation = this.state.transformation.mmul(new Mat3(
            1, 0, tx,
            0, 1, ty,
            0, 0, 1,
        ));
    };
}
