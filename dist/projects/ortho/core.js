class GL {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        // setup viewpoint
        this.vp = new Vec3(0, 0, 0); // viewpoint - "camera" position
        this.vpY = new Vec3(0, 1.0, 0); // view-up vector
        this.vpZ = new Vec3(0, 0, -1.0);
        this.vpX = this.vpZ.clone().cross(this.vpY);
        this.viewMatrix = new Mat4(
            this.vpX._0, this.vpX._1, this.vpX._2, this.vpX.clone().neg().dot(this.vp),
            this.vpY._0, this.vpY._1, this.vpY._2, this.vpY.clone().neg().dot(this.vp),
            this.vpZ._0, this.vpZ._1, this.vpZ._2, this.vpZ.clone().neg().dot(this.vp),
            0, 0, 0, 1
        );

        this.projectionType = 'orthographic';
        // remember: perspective uses the 4d "h" part of homogenous coordinates, make sure to convert them to 3d points 
        this.alpha = Math.PI/4; // viewing angle for perspective projection
        this.near = 1; // z distance for nearest points
        this.far = 2000; // z distance for farthest points
        this.projectionMatrix = new Mat4(
            1/Math.tan(this.alpha/2), 0, 0, 0,
            0, 1/Math.tan(this.alpha/2), 0, 0,
            0, 0, (this.far+this.near)/(this.far-this.near), -1,
            0, 0, (2*this.far*this.near)/(this.far - this.near), 0
        );
    }

    transformVec3(v) {
        if (this.projectionType === 'perspective') {
            // not working at the moment
            return this.viewMatrix.mmul(this.projectionMatrix).vmul(v).toVec3();
        } else {
            return this.viewMatrix.vmul(v).toVec3();
        }
    }

    translateX(t) {
        this.transform(new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            t, 0, 0, 1
        ));
    }

    translateY(t) {
        this.transform(new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, t, 0, 1
        ));
    }

    translateZ(t) {
        this.transform(new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, t, 1
        ));
    }

    rotateX(a) {
        this.transform(new Mat4(
            1, 0, 0, 0,
            0,  Math.cos(a), Math.sin(a), 0,
            0, -Math.sin(a), Math.cos(a), 0,
            0, 0, 0, 1
        ));
    }

    rotateY(a) {
        this.transform(new Mat4(
            Math.cos(a), 0, -Math.sin(a), 0,
            0, 1, 0, 0,
            Math.sin(a), 0, Math.cos(a), 0,
            0, 0, 0, 1
        ));
    }

    rotateZ(a) {
        this.transform(new Mat4(
            Math.cos(a), Math.sin(a), 0, 0,
            -Math.sin(a), Math.cos(a), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ));
    }

    renderRect(p1, p2, p3, p4, r, g, b) {
        const tp1 = this.transformVec3(p1),
              tp2 = this.transformVec3(p2),
              tp3 = this.transformVec3(p3),
              tp4 = this.transformVec3(p4),
              ctx = this.ctx;

        ctx.save();
        ctx.translate(this.width/2, this.height/2);
        ctx.fillStyle = 'rgb(' + [r,g,b].join(',') + ')';
        ctx.beginPath();
        ctx.moveTo(tp1._0, tp1._1);
        ctx.lineTo(tp2._0, tp2._1);
        ctx.lineTo(tp2._0, tp2._1);
        ctx.lineTo(tp3._0, tp3._1);
        ctx.lineTo(tp4._0, tp4._1);
        ctx.lineTo(tp1._0, tp1._1);                                                   
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    renderTriangle(p1, p2, p3, r, g, b) {
        const tp1 = this.transformVec3(p1),
              tp2 = this.transformVec3(p2),
              tp3 = this.transformVec3(p3),
              ctx = this.ctx;

        ctx.save();
        ctx.translate(this.width/2, this.height/2);
        ctx.fillStyle = 'rgb(' + [r,g,b].join(',') + ')';
        ctx.beginPath();
        ctx.moveTo(tp1._0, tp1._1);
        ctx.lineTo(tp2._0, tp2._1);
        ctx.lineTo(tp2._0, tp2._1);
        ctx.lineTo(tp3._0, tp3._1);
        ctx.lineTo(tp1._0, tp1._1);                                                   
        ctx.fill();
        ctx.stroke();
        ctx.restore();

    }

    renderPlane(plane) {
        const ctx = this.ctx;
        
        ctx.save();
        ctx.translate(this.width/2, this.height/2);
        ctx.beginPath();
        ctx.strokeStyle = 'cyan';

        const tps = [];
        for (const point of plane) {
            tps.push(this.transformVec3(point));
        }

        ctx.moveTo(tps[0]._0, tps[0]._1);
        ctx.lineTo(tps[1]._0, tps[1]._1);
        ctx.lineTo(tps[2]._0, tps[2]._1);
        ctx.lineTo(tps[3]._0, tps[3]._1);
        ctx.lineTo(tps[0]._0, tps[0]._1);                                                       
        ctx.stroke();

        let cur = 0,
            w = plane[1]._0 - plane[0]._0,
            h = plane[1]._1 - plane[3]._1,                     
            y1 = plane[0]._1,
            y2 = plane[3]._1,
            x1 = plane[0]._0;
        const step = 30;
        while (cur < w) {
            ctx.beginPath();
            const tp1 = this.transformVec3(new Vec4(x1 + cur, y1, plane[0]._2, 1)),
                  tp2 = this.transformVec3(new Vec4(x1 + cur, y2, plane[0]._2, 1));
            
            ctx.moveTo(tp1._0, tp1._1);
            ctx.lineTo(tp2._0, tp2._1);
            ctx.stroke();
            cur += step;
        }
        
        cur = 0;
        w = plane[1]._0 - plane[0]._0;
        y1 = plane[0]._1;
        y2 = plane[3]._1;
        x1 = plane[0]._0;
        let x2 = plane[1]._0;
        while (cur < w) {
            ctx.beginPath();
            const tp1 = this.transformVec3(new Vec4(x1, y1 + cur, plane[0]._2, 1)),
                  tp2 = this.transformVec3(new Vec4(x2, y1 + cur, plane[0]._2, 1));
            
            ctx.moveTo(tp1._0, tp1._1);
            ctx.lineTo(tp2._0, tp2._1);
            ctx.stroke();
            cur += step;
        }

        ctx.restore();
    }

    renderCube(cube) {
        const ccs = [],
              ctx = this.ctx;
        for (let point of cube) {
            point = point.clone();
            const v = point.toVec4(),
                  tv = this.transformVec3(v);
            ccs.push([tv._0, tv._1]);
        }

        ctx.save();
        ctx.translate(this.width/2, this.height/2);
        const fill = false;
        ctx.strokeStyle = ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(...ccs[0]);
        ctx.lineTo(...ccs[1]);
        ctx.lineTo(...ccs[2]);
        ctx.lineTo(...ccs[3]);
        ctx.lineTo(...ccs[0]);
        if (fill)
            ctx.fill();
        else
            ctx.stroke();

        ctx.strokeStyle = ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(...ccs[4]);
        ctx.lineTo(...ccs[5]);
        ctx.lineTo(...ccs[6]);
        ctx.lineTo(...ccs[7]);
        ctx.lineTo(...ccs[4]);
        if (fill)
            ctx.fill();
        else
            ctx.stroke();

        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(...ccs[0]);
        ctx.lineTo(...ccs[4]);
        ctx.stroke();
        ctx.moveTo(...ccs[1]);
        ctx.lineTo(...ccs[5]);
        ctx.stroke();
        ctx.moveTo(...ccs[2]);
        ctx.lineTo(...ccs[6]);
        ctx.stroke();
        ctx.moveTo(...ccs[3]);
        ctx.lineTo(...ccs[7]);
        ctx.stroke();
        
        ctx.restore();
    }

    renderOrigin() {
        const origin = this.viewMatrix.vmul(new Vec4(0, 0, 0, 1)).toVec3(),
              originX = this.viewMatrix.vmul(new Vec4(50, 0, 0, 1)).toVec3(),
              originY = this.viewMatrix.vmul(new Vec4(0, 50, 0, 1)).toVec3(),
              originZ = this.viewMatrix.vmul(new Vec4(0, 0, 50, 1)).toVec3(),
              ctx = this.ctx;
        
        ctx.save();
        ctx.translate(this.width/2, this.height/2);
        
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(origin._0, origin._1);
        ctx.lineTo(originX._0, originX._1);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.moveTo(origin._0, origin._1);
        ctx.lineTo(originY._0, originY._1);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.moveTo(origin._0, origin._1);
        ctx.lineTo(originZ._0, originZ._1);
        ctx.stroke();

        ctx.restore();
    }

    transform(m) {
        this.viewMatrix = this.viewMatrix.mmul(m);
    }
}
