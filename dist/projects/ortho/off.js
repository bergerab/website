const scale = new Mat4(
    100, 0, 0, 0,
    0, 100, 0, 0,
    0, 0, 100, 0,
    0, 0, 0, 1
);

function renderOFF(gl, vertices, faces, m) {
    vertices = vertices.slice(0);
    faces = faces.slice(0);
    for (let face of faces) {
        face = face.slice(0);
        const verts = face.shift();

        if (verts === 3) {
            const p1 = scale.vmul(vertices[face.shift()]),
                  p2 = scale.vmul(vertices[face.shift()]),
                  p3 = scale.vmul(vertices[face.shift()]);
            face = face.slice(4);

            face = face.length === 0 ? [0, 0, 0] : face.map(x => x*255);
            gl.renderTriangle(p1, p2, p3, ...face);
        } else if (verts === 4) {
            const p1 = scale.vmul(vertices[face.shift()]),
                  p2 = scale.vmul(vertices[face.shift()]),
                  p3 = scale.vmul(vertices[face.shift()]),
                  p4 = scale.vmul(vertices[face.shift()]);
            face = face.slice(5);
            face = face.length === 0 ? [0, 0, 0] : face.map(x => x*255);
            gl.renderRect(p1, p2, p3, p4, ...face);
        }
    }
}

function parseOFF(off) {
    const lines = off.split('\n');
    const magicString = lines.shift();
    if (magicString !== 'OFF')
        return;
    const [n, f, m] = lines.shift().trim().split(' ').map(Number);

    const vertices = [];
    for (let i=0; i<n; ++i)
        vertices.push(new Vec4(...lines.shift().trim().split(' ').map(Number), 1));

    const faces = [];
    for (let i=0; i<f; ++i)
        faces.push(lines.shift().trim().split(' ').map(Number));
    return [vertices, faces];
}


const cubeOFF = `OFF
8 6 12
1.0  0.0 1.4142
0.0  1.0 1.4142
-1.0  0.0 1.4142
0.0 -1.0 1.4142
1.0  0.0 0.0
0.0  1.0 0.0
-1.0  0.0 0.0
0.0 -1.0 0.0
4 0 1 2 3 255 0 0
4 7 4 0 3 0 255 0
4 4 5 1 0 0 0 255
4 5 6 2 1 0 255 0 
4 3 2 6 7 0 0 255
4 6 5 4 7 255 0 0`;


const coloredOFF = `OFF
8 6 12
1.0  1.0  1.0 
1.0  1.0 -1.0 
1.0 -1.0  1.0 
1.0 -1.0 -1.0 
-1.0  1.0  1.0 
-1.0  1.0 -1.0 
-1.0 -1.0  1.0 
-1.0 -1.0 -1.0 
4 0 2 3 1  0.0  0.8  0.1  0.75
4 4 5 7 6  0.2  0.0  0.8  0.75
4 0 4 6 2  0.9  0.9  0.0  0.75
4 1 3 7 5  0.0  0.7  0.4  0.75
4 0 1 5 4  0.1  0.4  0.7  0.75
4 2 6 7 3  0.7  0.7  0.0  0.75`;

const dragonOFF = `OFF
422 589 1787
0.084089 -0.204000 0.315236
0.043520 -0.204000 0.304366
0.053478 -0.204000 0.348341
0.060000 -0.273000 0.324000
0.089685 -0.201000 0.279242
0.070402 -0.201000 0.256260
0.058211 -0.201000 0.286070
0.072000 -0.270000 0.274500
0.097050 -0.195000 0.243000
0.097050 -0.195000 0.210000
0.065700 -0.195000 0.226500
0.085500 -0.255000 0.226500
0.122138 -0.189000 0.182318
0.096682 -0.189000 0.156863
0.085226 -0.189000 0.193774
0.100500 -0.240000 0.178500
0.136753 -0.184500 0.134515
0.120253 -0.184500 0.105936
0.101353 -0.184500 0.135900
0.118500 -0.229500 0.126000
0.152955 -0.180000 0.072790
0.121946 -0.180000 0.061503
0.126728 -0.180000 0.096606
0.133500 -0.219000 0.078000
0.170389 -0.174000 0.031088
0.139211 -0.174000 0.013088
0.137700 -0.174000 0.051706
0.148500 -0.234000 0.033000
0.174000 -0.172500 -0.037950
0.147000 -0.172500 -0.037950
0.160500 -0.172500 -0.012300
0.160500 -0.211500 -0.028500
-0.043520 -0.204000 0.304366
-0.084089 -0.204000 0.315236
-0.053478 -0.204000 0.348341
-0.060000 -0.273000 0.324000
-0.070402 -0.201000 0.256260
-0.089685 -0.201000 0.279242
-0.058211 -0.201000 0.286070
-0.072000 -0.270000 0.274500
-0.097050 -0.195000 0.210000
-0.097050 -0.195000 0.243000
-0.065700 -0.195000 0.226500
-0.085500 -0.255000 0.226500
-0.096682 -0.189000 0.156863
-0.122138 -0.189000 0.182318
-0.085226 -0.189000 0.193774
-0.100500 -0.240000 0.178500
-0.120253 -0.184500 0.105936
-0.136753 -0.184500 0.134515
-0.101353 -0.184500 0.135900
-0.118500 -0.229500 0.126000
-0.121946 -0.180000 0.061503
-0.152955 -0.180000 0.072790
-0.126728 -0.180000 0.096606
-0.133500 -0.219000 0.078000
-0.139211 -0.174000 0.013088
-0.170389 -0.174000 0.031088
-0.137700 -0.174000 0.051706
-0.148500 -0.234000 0.033000
-0.147000 -0.172500 -0.037950
-0.174000 -0.172500 -0.037950
-0.160500 -0.172500 -0.012300
-0.160500 -0.211500 -0.028500
0.018000 -0.250417 0.412337
-0.018000 -0.250417 0.412337
0.000000 -0.270999 0.439651
0.000000 -0.313106 0.380875
0.058500 -0.303600 0.481500
0.027000 -0.175500 0.462000
0.036000 -0.147300 0.393000
0.051000 -0.162000 0.368100
0.063900 -0.138000 0.289500
0.045000 -0.105000 0.284400
0.060000 -0.024000 0.093000
0.180000 -0.163500 -0.007500
0.075600 -0.206400 0.346500
-0.058500 -0.303600 0.481500
-0.027000 -0.175500 0.462000
-0.036000 -0.147300 0.393000
-0.051000 -0.162000 0.368100
-0.063900 -0.138000 0.289500
-0.045000 -0.105000 0.284400
-0.060000 -0.024000 0.093000
-0.180000 -0.163500 -0.007500
-0.075600 -0.206400 0.346500
0.000000 -0.183000 0.471000
0.021000 -0.158400 0.417900
0.000000 -0.158400 0.417900
-0.021000 -0.158400 0.417900
0.021000 -0.147300 0.393000
-0.021000 -0.147300 0.393000
0.047400 -0.093300 0.264900
-0.047400 -0.093300 0.264900
0.000000 -0.085800 0.245700
-0.016500 -0.062400 0.187200
0.000000 -0.031500 0.115500
0.016500 -0.062400 0.187200
0.000000 0.133500 0.187200
0.021000 -0.075000 0.396000
-0.021000 -0.075000 0.396000
0.021000 -0.060000 0.304500
-0.021000 -0.060000 0.304500
0.021000 -0.095400 0.380100
-0.021000 -0.095400 0.380100
0.021000 -0.078600 0.318900
-0.021000 -0.078600 0.318900
0.070500 -0.309000 0.492000
0.084000 -0.206400 0.346500
0.190500 -0.163500 -0.007500
0.070500 -0.316500 0.484500
0.084000 -0.219000 0.346500
0.190500 -0.177300 -0.007500
-0.070500 -0.309000 0.492000
-0.084000 -0.206400 0.346500
-0.190500 -0.163500 -0.007500
-0.070500 -0.316500 0.484500
-0.084000 -0.219000 0.346500
-0.190500 -0.177300 -0.007500
0.060000 0.003900 0.050100
0.180000 -0.147000 -0.024000
0.203700 -0.216000 -0.148500
-0.060000 0.003900 0.050100
-0.180000 -0.147000 -0.024000
-0.203700 -0.216000 -0.148500
0.072000 0.003900 0.063000
0.199200 -0.157500 -0.015900
-0.072000 0.003900 0.063000
-0.199200 -0.157500 -0.015900
0.060000 0.003900 0.050100
0.180000 -0.147000 -0.024000
0.203700 -0.216000 -0.148500
0.203700 -0.216000 -0.289500
0.222900 -0.172500 -0.330000
0.222900 -0.172500 -0.469500
0.203700 -0.096300 -0.546000
0.170100 0.073800 -0.469500
0.150000 0.120000 -0.379500
0.150000 0.120000 -0.283500
0.167700 0.060000 -0.219900
0.204000 -0.015000 -0.370500
0.183600 -0.062700 -0.266100
0.165000 -0.108300 -0.169800
0.192000 -0.180000 -0.087600
0.156000 -0.080100 -0.110100
0.126000 -0.075600 0.011100
0.138000 0.003900 -0.044100
0.113400 0.072000 -0.011100
0.158700 0.060000 -0.118500
0.150000 0.120000 -0.060900
0.150000 0.120000 -0.166800
0.150000 0.219000 -0.379500
0.150000 0.167400 -0.424500
-0.060000 0.003900 0.050100
-0.180000 -0.147000 -0.024000
-0.203700 -0.216000 -0.148500
-0.203700 -0.216000 -0.289500
-0.222900 -0.172500 -0.330000
-0.222900 -0.172500 -0.469500
-0.203700 -0.096300 -0.546000
-0.170100 0.073800 -0.469500
-0.150000 0.120000 -0.379500
-0.150000 0.120000 -0.283500
-0.167700 0.060000 -0.219900
-0.204000 -0.015000 -0.370500
-0.183600 -0.062700 -0.266100
-0.165000 -0.108300 -0.169800
-0.192000 -0.180000 -0.087600
-0.156000 -0.080100 -0.110100
-0.126000 -0.075600 0.011100
-0.168000 0.003900 -0.044100
-0.113400 0.072000 -0.011100
-0.158700 0.060000 -0.118500
-0.150000 0.120000 -0.060900
-0.150000 0.120000 -0.166800
-0.150000 0.219000 -0.379500
-0.150000 0.167400 -0.424500
0.028500 0.003900 0.010500
0.116700 0.120000 -0.060900
0.028500 0.079200 -0.060900
-0.028500 0.003900 0.010500
-0.028500 0.079200 -0.060900
-0.116700 0.120000 -0.060900
0.028500 0.003900 0.050100
-0.028500 0.003900 0.050100
0.150000 0.163500 -0.060900
0.116700 0.163500 -0.060900
-0.116700 0.163500 -0.060900
-0.150000 0.163500 -0.060900
0.150000 0.120000 -0.103500
-0.150000 0.120000 -0.103500
0.116700 -0.096300 -0.546000
0.116700 -0.172500 -0.469500
0.116700 0.120000 -0.379500
0.116700 0.167400 -0.424500
0.116700 0.219000 -0.379500
0.116700 0.120000 -0.283500
-0.116700 -0.096300 -0.546000
-0.116700 -0.172500 -0.469500
-0.116700 0.120000 -0.379500
-0.116700 0.167400 -0.424500
-0.116700 0.219000 -0.379500
-0.116700 0.120000 -0.283500
0.116700 0.120000 -0.103500
-0.116700 0.120000 -0.103500
0.222900 -0.205500 -0.438900
0.222900 -0.228000 -0.462000
0.222900 -0.274500 -0.438900
0.222900 -0.274500 -0.410100
0.222900 -0.228000 -0.387000
0.225000 -0.240000 -0.424500
0.195000 -0.205500 -0.438900
0.195000 -0.228000 -0.462000
0.195000 -0.240000 -0.438900
0.195000 -0.274500 -0.410100
0.195000 -0.228000 -0.387000
-0.195000 -0.205500 -0.438900
-0.195000 -0.228000 -0.462000
-0.195000 -0.274500 -0.438900
-0.195000 -0.274500 -0.410100
-0.195000 -0.228000 -0.387000
-0.222900 -0.205500 -0.438900
-0.222900 -0.228000 -0.462000
-0.222900 -0.274500 -0.438900
-0.222900 -0.240000 -0.410100
-0.222900 -0.228000 -0.387000
-0.225000 -0.240000 -0.424500
0.195000 -0.172500 -0.469500
0.195000 -0.172500 -0.330000
-0.195000 -0.172500 -0.469500
-0.195000 -0.172500 -0.330000
0.138000 0.033000 -0.138900
0.138000 0.027000 -0.213300
0.138000 -0.036000 -0.254100
0.138000 -0.081000 -0.231300
0.138000 -0.108300 -0.169800
0.138000 -0.080100 -0.110100
0.138000 -0.017100 -0.094500
0.060000 -0.042000 -0.158100
-0.138000 0.033000 -0.138900
-0.138000 0.027000 -0.213300
-0.138000 -0.036000 -0.254100
-0.138000 -0.081000 -0.231300
-0.138000 -0.108300 -0.169800
-0.138000 -0.080100 -0.110100
-0.138000 -0.017100 -0.094500
-0.060000 -0.042000 -0.158100
0.276000 0.537000 -0.799500
0.285000 0.463500 -0.618000
0.225000 0.120000 -0.280500
0.167700 0.060000 -0.219900
0.158700 0.060000 -0.118500
0.150000 0.120000 -0.060900
0.150000 0.163500 -0.060900
0.195000 0.222000 -0.118500
0.202500 0.222000 -0.219900
0.276000 0.487500 -0.580500
0.288000 0.474000 -0.598500
0.232500 0.163500 -0.255000
0.217500 0.120000 -0.118500
0.225000 0.163500 -0.118500
0.250500 0.463500 -0.618000
0.117000 0.120000 -0.280500
0.117000 0.163500 -0.255000
0.256500 0.474000 -0.598500
0.000000 0.163500 -0.060900
0.000000 0.198000 -0.118500
0.045000 0.206700 -0.168000
0.000000 0.198000 -0.219900
0.150000 0.222000 -0.219900
0.150000 0.222000 -0.118500
0.000000 0.120000 -0.060900
0.000000 0.120000 -0.280500
0.000000 0.442500 -0.168000
-0.276000 0.537000 -0.799500
-0.285000 0.463500 -0.618000
-0.225000 0.120000 -0.280500
-0.167700 0.060000 -0.219900
-0.158700 0.060000 -0.118500
-0.150000 0.120000 -0.060900
-0.150000 0.163500 -0.060900
-0.195000 0.222000 -0.118500
-0.202500 0.222000 -0.219900
-0.276000 0.487500 -0.580500
-0.288000 0.474000 -0.598500
-0.232500 0.163500 -0.255000
-0.217500 0.120000 -0.118500
-0.225000 0.163500 -0.118500
-0.250500 0.463500 -0.618000
-0.117000 0.120000 -0.280500
-0.117000 0.163500 -0.255000
-0.256500 0.474000 -0.598500
0.000000 0.163500 -0.060900
0.000000 0.198000 -0.118500
-0.045000 0.206700 -0.168000
0.000000 0.198000 -0.219900
-0.150000 0.222000 -0.219900
-0.150000 0.222000 -0.118500
0.000000 0.120000 -0.060900
0.000000 0.120000 -0.280500
-0.015000 -0.339750 0.301407
0.015000 -0.339750 0.301407
0.000000 -0.354000 0.326088
0.000000 -0.306029 0.333000
-0.077771 -0.339000 0.273976
-0.048793 -0.339000 0.281740
-0.070659 -0.339000 0.305387
-0.066000 -0.288000 0.288000
-0.087240 -0.324000 0.229407
-0.061260 -0.324000 0.244407
-0.088500 -0.324000 0.261589
-0.079500 -0.279000 0.246000
-0.109500 -0.315000 0.190500
-0.079500 -0.315000 0.190500
-0.094500 -0.315000 0.219000
-0.094500 -0.264000 0.201000
-0.107990 -0.303000 0.133410
-0.088706 -0.303000 0.156392
-0.124547 -0.303000 0.166884
-0.108000 -0.243000 0.153000
-0.112500 -0.288000 0.093000
-0.112500 -0.288000 0.123000
-0.141000 -0.288000 0.108000
-0.123000 -0.243000 0.108000
-0.153000 -0.273000 0.054000
-0.123000 -0.273000 0.054000
-0.138000 -0.273000 0.082500
-0.138000 -0.228000 0.064500
-0.164105 -0.261000 -0.001496
-0.130276 -0.261000 0.010816
-0.158888 -0.261000 0.036797
-0.151500 -0.228000 0.016500
-0.162833 -0.261000 -0.057622
-0.137378 -0.261000 -0.032167
-0.178319 -0.261000 -0.016681
-0.160500 -0.231000 -0.034500
0.048793 -0.339000 0.281740
0.077771 -0.339000 0.273976
0.070659 -0.339000 0.305387
0.066000 -0.288000 0.288000
0.061260 -0.324000 0.244407
0.087240 -0.324000 0.229407
0.088500 -0.324000 0.261589
0.079500 -0.279000 0.246000
0.079500 -0.315000 0.190500
0.109500 -0.315000 0.190500
0.094500 -0.315000 0.219000
0.094500 -0.264000 0.201000
0.088706 -0.303000 0.156392
0.107990 -0.303000 0.133410
0.124547 -0.303000 0.166884
0.108000 -0.243000 0.153000
0.112500 -0.288000 0.123000
0.112500 -0.288000 0.093000
0.141000 -0.288000 0.108000
0.123000 -0.243000 0.108000
0.123000 -0.273000 0.054000
0.153000 -0.273000 0.054000
0.138000 -0.273000 0.082500
0.138000 -0.228000 0.064500
0.130276 -0.261000 0.010816
0.164105 -0.261000 -0.001496
0.158888 -0.261000 0.036797
0.151500 -0.228000 0.016500
0.137378 -0.261000 -0.032167
0.162833 -0.261000 -0.057622
0.178319 -0.261000 -0.016681
0.160500 -0.231000 -0.034500
0.195000 -0.270600 -0.508500
0.222900 -0.270600 -0.508500
0.222900 -0.243600 -0.470100
0.222900 -0.282000 -0.458400
0.222900 -0.289500 -0.408000
0.222900 -0.260400 -0.382500
0.222900 -0.288000 -0.362700
0.203700 -0.237000 -0.289500
0.203700 -0.261000 -0.148500
0.190500 -0.247500 -0.001500
0.108900 -0.315000 0.236100
0.075600 -0.342600 0.333000
0.060000 -0.390000 0.364500
-0.060000 -0.390000 0.364500
-0.075600 -0.342600 0.333000
-0.108900 -0.315000 0.236100
-0.190500 -0.247500 -0.001500
-0.203700 -0.261000 -0.148500
-0.203700 -0.237000 -0.289500
-0.222900 -0.288000 -0.362700
-0.222900 -0.260400 -0.382500
-0.222900 -0.289500 -0.408000
-0.222900 -0.282000 -0.458400
-0.222900 -0.243600 -0.470100
-0.222900 -0.270600 -0.508500
-0.195000 -0.270600 -0.508500
0.195000 -0.243600 -0.470100
0.195000 -0.282000 -0.458400
0.195000 -0.289500 -0.408000
0.195000 -0.260400 -0.382500
0.195000 -0.288000 -0.362700
0.174000 -0.237000 -0.289500
0.153000 -0.261000 -0.148500
0.129600 -0.247500 -0.001500
0.045000 -0.327000 0.287100
-0.045000 -0.327000 0.287100
-0.129600 -0.247500 -0.001500
-0.153000 -0.261000 -0.148500
-0.174000 -0.237000 -0.289500
-0.195000 -0.288000 -0.362700
-0.195000 -0.260400 -0.382500
-0.195000 -0.289500 -0.408000
-0.195000 -0.282000 -0.458400
-0.195000 -0.243600 -0.470100
0.207000 -0.344400 -0.458400
0.213000 -0.349500 -0.420000
0.188700 -0.336000 -0.289500
0.156900 -0.309000 -0.001500
0.060000 -0.366000 0.310200
-0.060000 -0.366000 0.310200
-0.156900 -0.309000 -0.001500
-0.188700 -0.336000 -0.289500
-0.213000 -0.349500 -0.429000
-0.207000 -0.344400 -0.458400
3 3 0 1 
3 3 1 2 
3 3 2 0 
3 7 4 5 
3 7 5 6 
3 7 6 4 
3 11 8 9 
3 11 9 10 
3 11 10 8 
3 15 12 13 
3 15 13 14 
3 15 14 12 
3 19 16 17 
3 19 17 18 
3 19 18 16 
3 23 20 21 
3 23 21 22 
3 23 22 20 
3 27 24 25 
3 27 25 26 
3 27 26 24 
3 31 28 29 
3 31 29 30 
3 31 30 28 
3 35 32 33 
3 35 33 34 
3 35 34 32 
3 39 36 37 
3 39 37 38 
3 39 38 36 
3 43 40 41 
3 43 41 42 
3 43 42 40 
3 47 44 45 
3 47 45 46 
3 47 46 44 
3 51 48 49 
3 51 49 50 
3 51 50 48 
3 55 52 53 
3 55 53 54 
3 55 54 52 
3 59 56 57 
3 59 57 58 
3 59 58 56 
3 63 60 61 
3 63 61 62 
3 63 62 60 
3 67 64 65 
3 67 65 66 
3 67 66 64 
3 68 69 76 
3 69 70 71 
3 69 71 76 
3 71 72 76 
3 73 74 72 
3 72 74 75 
3 76 72 75 
3 85 78 77 
3 80 79 78 
3 85 80 78 
3 85 81 80 
3 81 83 82 
3 84 83 81 
3 84 81 85 
3 77 78 86 
3 77 86 68 
3 86 69 68 
3 78 69 86 
3 70 79 71 
3 71 79 80 
3 71 80 72 
3 72 80 81 
3 72 81 73 
3 73 81 82 
3 69 78 88 
3 69 88 87 
3 69 87 70 
3 87 90 70 
3 78 89 88 
3 78 79 89 
3 89 79 91 
3 92 93 94 
3 92 94 97 
3 92 97 74 
3 97 96 74 
3 74 96 83 
3 95 83 96 
3 93 83 95 
3 94 93 95 
3 94 98 97 
3 97 98 96 
3 94 95 98 
3 95 96 98 
3 89 100 87 
3 100 99 87 
3 100 102 99 
3 102 101 99 
3 102 93 101 
3 93 92 101 
3 90 103 91 
3 103 104 91 
3 103 105 104 
3 105 106 104 
3 105 73 106 
3 73 82 106 
3 87 99 103 
3 103 90 87 
3 99 101 105 
3 105 103 99 
3 101 92 73 
3 101 73 105 
3 82 93 102 
3 82 102 106 
3 106 102 100 
3 100 104 106 
3 100 89 104 
3 104 89 101 
4 107 68 76 108 
4 108 76 75 109 
4 110 107 108 111 
4 111 108 109 112 
4 113 114 85 77 
4 85 114 115 84 
4 116 117 114 113 
4 117 118 115 114 
4 107 113 77 68 
4 110 116 113 107 
3 112 118 111 
3 83 127 74 
3 74 127 125 
3 125 127 122 
3 125 122 119 
3 126 125 119 
3 126 119 120 
3 126 120 121 
3 127 128 122 
3 122 128 123 
3 128 124 123 
3 83 84 115 
3 74 109 75 
3 74 126 109 
3 83 115 128 
3 112 109 121 
3 109 126 121 
3 124 128 115 
3 124 115 118 
3 117 116 110 
3 111 117 110 
3 118 117 111 
4 120 119 122 123 
4 121 120 123 124 
3 129 147 146 
3 146 147 148 
3 147 149 148 
3 149 150 148 
3 148 150 139 
3 150 138 139 
3 139 138 137 
3 138 151 137 
3 137 151 152 
3 139 137 140 
3 137 152 136 
3 137 136 140 
3 140 136 135 
3 140 135 134 
3 140 134 133 
3 141 140 133 
3 141 133 132 
3 142 141 132 
3 142 132 131 
3 142 131 143 
3 144 143 130 
3 144 130 145 
3 146 144 145 
3 146 145 129 
3 144 142 143 
3 184 180 177 
3 184 177 183 
3 180 181 179 
3 180 179 177 
3 184 182 180 
3 180 182 181 
3 183 177 178 
3 177 179 178 
3 170 171 153 
3 172 171 170 
3 172 173 171 
3 172 174 173 
3 163 174 172 
3 163 162 174 
3 161 162 163 
3 161 175 162 
3 176 175 161 
3 164 161 163 
3 160 176 161 
3 164 160 161 
3 159 160 164 
3 158 159 164 
3 157 158 164 
3 157 164 165 
3 156 157 165 
3 156 165 166 
3 155 156 166 
3 167 155 166 
3 154 167 168 
3 169 154 168 
3 169 168 170 
3 153 169 170 
3 167 166 168 
3 183 178 129 
3 129 178 147 
3 147 178 149 
3 173 182 171 
3 171 182 153 
3 153 182 184 
3 178 186 185 
3 178 185 149 
3 173 188 187 
3 173 187 182 
3 191 192 135 
3 135 192 134 
3 159 158 197 
3 197 158 198 
3 135 136 191 
3 191 136 152 
3 191 152 194 
3 197 200 176 
3 197 176 160 
3 197 160 159 
3 152 151 195 
3 152 195 194 
3 200 201 175 
3 200 175 176 
3 151 138 196 
3 151 196 195 
3 201 202 162 
3 201 162 175 
3 193 196 202 
3 193 202 199 
3 138 189 190 
3 190 162 138 
3 203 178 182 
3 182 204 203 
3 192 193 199 
3 199 198 192 
3 202 201 199 
3 199 201 200 
3 199 200 198 
3 200 197 198 
3 192 191 194 
3 194 193 192 
3 193 194 195 
3 193 195 196 
3 134 133 157 
3 157 158 134 
3 133 132 156 
3 156 157 133 
3 132 131 155 
3 155 156 132 
4 131 143 167 155 
4 143 130 154 167 
4 130 145 169 154 
4 145 129 153 169 
3 189 185 186 
3 186 203 189 
3 204 187 188 
3 188 190 204 
3 149 185 189 
3 182 187 204 
3 203 186 178 
3 190 188 173 
3 133 134 205 
3 205 209 133 
3 209 205 210 
3 205 206 210 
3 206 207 210 
3 207 208 210 
3 208 209 210 
3 211 227 228 
3 228 215 211 
3 211 215 212 
3 212 215 213 
3 213 215 214 
3 134 227 211 
3 211 205 134 
3 205 211 212 
3 212 206 205 
3 206 212 213 
3 213 207 206 
3 207 213 214 
3 214 208 207 
3 208 214 215 
3 215 209 208 
3 209 215 228 
3 228 133 209 
3 230 229 216 
3 216 220 230 
3 220 216 217 
3 217 218 220 
3 218 219 220 
3 221 158 157 
3 157 225 221 
3 225 224 226 
3 224 223 226 
3 223 222 226 
3 222 221 226 
3 221 225 226 
3 229 158 221 
3 221 216 229 
3 216 221 222 
3 222 217 216 
3 217 222 223 
3 223 218 217 
3 218 223 224 
3 224 219 218 
3 219 224 225 
3 225 220 219 
3 220 225 157 
3 157 230 220 
3 231 232 238 
3 238 232 233 
3 238 233 234 
3 238 234 235 
3 238 235 236 
3 238 236 237 
3 238 237 231 
3 148 139 231 
3 231 139 232 
3 232 139 140 
3 232 140 233 
3 234 233 140 
3 141 234 140 
3 235 234 142 
3 142 234 141 
3 144 236 235 
3 144 235 142 
3 146 237 236 
3 146 236 144 
3 146 148 237 
3 237 148 231 
3 246 239 245 
3 246 245 244 
3 246 244 243 
3 246 243 242 
3 246 242 241 
3 246 241 240 
3 246 240 239 
3 239 163 172 
3 240 163 239 
3 164 163 240 
3 241 164 240 
3 164 241 242 
3 164 242 165 
3 166 242 243 
3 165 242 166 
3 243 244 168 
3 166 243 168 
3 244 245 170 
3 168 244 170 
3 245 172 170 
3 239 172 245 
3 253 254 260 
3 254 255 260 
3 255 263 260 
3 255 256 258 
3 256 257 258 
3 256 247 257 
3 257 247 248 
3 258 257 249 
3 257 248 249 
3 260 258 259 
3 258 249 259 
3 259 249 250 
3 250 251 259 
3 252 259 251 
3 253 260 252 
3 260 259 252 
3 248 247 261 
3 249 248 262 
3 248 261 262 
3 247 256 264 
3 263 256 255 
3 263 264 256 
3 247 264 261 
3 264 263 262 
3 262 261 264 
3 271 265 252 
3 265 253 252 
3 266 253 265 
3 266 270 253 
3 270 254 253 
3 266 273 267 
3 267 273 268 
3 267 270 266 
3 269 270 267 
3 268 269 267 
3 269 255 254 
3 254 270 269 
3 268 263 255 
3 272 263 268 
3 262 263 272 
3 280 281 287 
3 281 282 287 
3 282 290 287 
3 282 283 285 
3 283 284 285 
3 283 274 284 
3 284 274 275 
3 285 284 276 
3 284 275 276 
3 287 285 286 
3 285 276 286 
3 286 276 277 
3 277 278 286 
3 279 286 278 
3 280 287 279 
3 287 286 279 
3 275 274 288 
3 276 275 289 
3 275 288 289 
3 274 283 291 
3 290 283 282 
3 290 291 283 
3 274 291 288 
3 291 290 289 
3 289 288 291 
3 298 292 279 
3 292 280 279 
3 293 280 292 
3 293 297 280 
3 297 281 280 
3 293 273 294 
3 294 273 295 
3 294 297 293 
3 296 297 294 
3 295 296 294 
3 296 282 281 
3 281 297 296 
3 295 290 282 
3 299 290 295 
3 289 290 299 
3 303 300 301 
3 303 301 302 
3 303 302 300 
3 307 304 305 
3 307 305 306 
3 307 306 304 
3 311 308 309 
3 311 309 310 
3 311 310 308 
3 315 312 313 
3 315 313 314 
3 315 314 312 
3 319 316 317 
3 319 317 318 
3 319 318 316 
3 323 320 321 
3 323 321 322 
3 323 322 320 
3 327 324 325 
3 327 325 326 
3 327 326 324 
3 331 328 329 
3 331 329 330 
3 331 330 328 
3 335 332 333 
3 335 333 334 
3 335 334 332 
3 339 336 337 
3 339 337 338 
3 339 338 336 
3 343 340 341 
3 343 341 342 
3 343 342 340 
3 347 344 345 
3 347 345 346 
3 347 346 344 
3 351 348 349 
3 351 349 350 
3 351 350 348 
3 355 352 353 
3 355 353 354 
3 355 354 352 
3 359 356 357 
3 359 357 358 
3 359 358 356 
3 363 360 361 
3 363 361 362 
3 363 362 360 
3 367 364 365 
3 367 365 366 
3 367 366 364 
3 381 382 380 
3 380 382 379 
3 379 382 403 
3 379 403 402 
3 379 402 378 
3 401 377 378 
3 401 400 377 
3 400 376 377 
3 400 399 376 
3 376 399 375 
3 399 398 375 
3 375 398 374 
3 374 398 397 
3 374 397 373 
3 373 397 396 
3 373 396 372 
3 372 396 395 
3 372 395 371 
3 371 395 394 
3 371 394 370 
3 370 394 368 
3 370 368 369 
3 382 383 403 
3 403 383 384 
3 403 384 404 
3 402 401 378 
3 384 385 404 
3 404 385 405 
3 385 386 405 
3 405 386 406 
3 386 387 406 
3 406 387 407 
3 387 388 407 
3 407 388 408 
3 388 389 408 
3 408 389 409 
3 389 390 409 
3 409 390 410 
3 390 391 410 
3 410 391 411 
3 391 392 411 
3 411 392 393 
3 380 379 416 
3 379 378 416 
3 416 378 415 
3 378 377 415 
3 377 376 415 
3 415 376 414 
3 376 375 414 
3 414 374 413 
3 374 373 372 
3 374 372 413 
4 372 371 412 413 
3 371 370 369 
3 371 369 412 
3 421 392 390 
3 392 391 390 
4 421 390 389 420 
3 420 389 387 
3 389 388 387 
3 420 387 419 
3 387 386 419 
3 419 386 385 
3 419 385 418 
3 385 384 418 
3 418 384 383 
3 418 383 417 
3 383 382 417 
3 382 381 417 
3 417 403 418 
3 403 404 418 
3 404 405 418 
3 418 405 419 
3 405 406 419 
3 406 407 419 
3 419 407 420 
3 407 409 420 
3 407 408 409 
4 409 410 421 420 
3 410 393 421 
3 410 411 393 
3 415 402 416 
3 401 402 415 
3 400 401 415 
3 414 400 415 
3 399 400 414 
3 398 399 414 
3 413 398 414 
3 396 397 398 
4 412 395 396 413 
3 368 395 412 
3 368 394 395 
3 402 403 416 
3 416 403 417 
3 416 417 381 
3 381 380 416`;

const parsedDragon = parseOFF(dragonOFF);
const parsedColored = parseOFF(coloredOFF);
const parsedCube = parseOFF(cubeOFF);
