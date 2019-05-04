function makeCubeDims(x, y, z, w, h, d) {
    return [
        new Vec3(x, y, z),
        new Vec3(x + w, y, z),
        new Vec3(x + w, y + h, z),
        new Vec3(x, y + h, z),
        new Vec3(x, y, z + d),
        new Vec3(x + w, y, z + d),
        new Vec3(x + w, y + h, z + d),
        new Vec3(x, y + h, z + d),
    ];
}

function makeCube(cma, cmi, off) {
    return [
        new Vec3(cmi, cmi, cmi),
        new Vec3(cma, cmi, cmi),
        new Vec3(cma, cma, cmi),
        new Vec3(cmi, cma, cmi),
        new Vec3(cmi+off, cmi+off, cma),
        new Vec3(cma+off, cmi+off, cma),
        new Vec3(cma+off, cma+off, cma),
        new Vec3(cmi+off, cma+off, cma)
    ];
}

function makePlane(z) {
    return [
        new Vec4(-200, -200, z, 1),
        new Vec4(200, -200, z, 1),
        new Vec4(200, 200, z, 1),
        new Vec4(-200, 200, z, 1)
    ];
}
