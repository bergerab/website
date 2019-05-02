const canvas = document.getElementById('stage'),
      ctx = canvas.getContext('2d'),
      width = canvas.width,
      height = canvas.height,
      gl = new GL(ctx, width, height);

const c1 = makeCubeDims(0, 0, 10, 100, 100, 100),
      c2 = makeCube(150, 100, 0),
      p1 = makePlane(10);

function setting(settingName) {
    settings[settingName] = !settings[settingName];
}

function demo(demoName) {
    for (const demoName in demos) {
        demos[demoName] = false;
    }
    demos[demoName] = true;
}

let demos = {
    cube: true,
    triangle: false,
    rectangle: false,
    pyramid: false,
    cubeGrid: false,
    dragon: false,
};

let settings = {
    plane: true,
    origin: false,
    animate: true,
};

gl.rotateZ(-1);
gl.rotateX(-1);
gl.rotateY(1);

tick = 0;
function loop() {
    ctx.clearRect(0, 0, width, height);

    if (demos.dragon) {
        renderOFF(gl, ...parsedDragon);
    }

    if (demos.cubeGrid) {
        for (let i=0; i<10; ++i) {
            for (let j=0; j<10; ++j) {
                const d = 30,
                      x = 0,
                      y = 0,
                      z = 0;
                gl.renderCube(makeCubeDims(
                    x + d * i, y + d * j, z, d, d, d
                ));
            }
        }
    }

    if (demos.pyramid) {
        const pyHeight = 10;
        for (let k=pyHeight; k>0; --k) {
            for (let i=0; i<k; ++i) {
                for (let j=0; j<k; ++j) {
                    const d = 30,
                          x = 0,
                          y = 0,
                          z = 0;
                    
                    gl.renderCube(makeCubeDims(
                        x + d * i, y + d * j, z + d * (pyHeight - k), d, d, d
                    ));
                }
            }
        }
    }
    
    if (settings.origin) {
        gl.renderOrigin();
    }
    
    if (settings.plane) {
        gl.renderPlane(p1);
    }
    
    if (settings.animate) {
        gl.rotateX(Math.sin(tick/100)/40);
        gl.rotateY(Math.sin(tick/100)/-40);
        gl.rotateZ(Math.sin(tick/100)/40);
    }

    if (demos.cube) {
        gl.renderCube(c1);
    }

    if (demos.triangle) {
        gl.renderTriangle(
            new Vec4(100, 100, 50, 1),
            new Vec4(200, 100, 50, 1),
            new Vec4(200, 200, 50, 1),
            128,
            23,
            23,
        );
    }

    if (demos.rectangle) {
        gl.renderRect(
            new Vec4(100, 100, 50, 1),
            new Vec4(200, 100, 50, 1),
            new Vec4(200, 200, 50, 1),
            new Vec4(100, 200, 50, 1),
            128,
            23,
            203,
        );
    }

    tick += 1;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

let shiftDown = false;
document.addEventListener('keydown', function (e) {
    if (e.key === 'Shift') {
        shiftDown = true;
    }
});
document.addEventListener('keyup', function (e) {
    if (e.key === 'Shift') {
        shiftDown = false;
    }
});

let mouseDown = false,
    mouseX = 0,
    mouseY = 0;
canvas.addEventListener('mousedown', function (e) {
    mouseDown = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
});
canvas.addEventListener('mousemove', function (e) {
    if (mouseDown) {
        const dx = e.clientX - mouseX,
              dy = e.clientY - mouseY;

        if (shiftDown) {
            gl.translateX(dx/30);
            gl.translateY(dy/30);
        } else {
            gl.rotateX(dx/5000);
            gl.rotateY(dy/5000);
        }
    }
});
canvas.addEventListener('mouseup', function (e) {
    mouseDown = false;
});

document.addEventListener('keydown', function (e) {
    const t = 10,
          a = 0.1;
    
    if (e.key === 'ArrowRight') {
        gl.translateX(-t);        
    } else if (e.key === 'ArrowLeft') {
        gl.translateX(t);
    } else if (e.key === 'ArrowUp') {
        gl.translateY(t);        
    } else if (e.key === 'ArrowDown') {
        gl.translateY(-t);                
    }  else if (e.key === 'o') {
        gl.translateZ(t);
    } else if (e.key === 'l') {
        gl.translateZ(-t);
    }
    
    if (e.key === 'a') {
        gl.rotateZ(a);
    } else if (e.key === 'd') {
        gl.rotateZ(-a);
    } else if (e.key === 'w') {
        gl.rotateY(a);
    } else if (e.key === 's') {
        gl.rotateY(-a);
    } else if (e.key === 'q') {
        gl.rotateX(-a);
    } else if (e.key === 'e') {
        gl.rotateX(a);
    }
});
