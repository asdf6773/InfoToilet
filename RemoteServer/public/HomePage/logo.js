var s = function(p) {
    var ratio = 3;
    var a, I, o;
    var canvas; // p could be any variable name
    var x = 100;
    var y = 100;
    var ap, ip, op;
    // console.log(grid)
    var lastFolded;
    var angleS = 0.0;
    var angleM = 0.0;
    var angleH = 0.0;
    var sx = 0
    var sy = 0;
    var mx = 0
    var my = 0;
    var hx = 0
    var hy = 0;
    var size = grid[0][0].doubleSize;
    var ah, am, as;
    var ph, pm, ps;
    var sh, sm, ss;
    var curSH = 10,
        curSM = 10,
        curSS = 10,
        desSH = 10,
        desSM = 10,
        desSS = 10,
        curRH = 0,
        curRM = 0,
        curRS = 0,
        desRH = 0,
        desRM = 0,
        desRS = 0;
    // var desSH,desSM,desSS;
    var clockInterval;
    var clocking = false;
    p.setup = function() {
        p.blendMode(ADD);
        p.rectMode(CENTER)
        canvas = p.createCanvas(size, size);
        p.background(255);
        ap = createVector(p.width / 2.8 - p.width / 2, p.height / 3 - p.width / 2)
        ip = createVector(0, 0)
        op = createVector(p.width / 1.50 - p.width / 2, p.height / 1.55 - p.width / 2)
        p.imageMode(CENTER)
        angleS = p.map(p.second(), 0, 60, 0, p.TWO_PI) - p.HALF_PI; // aling second to start at the top
        angleM = p.map(p.minute(), 0, 60, 0, p.TWO_PI); // aling minute to start at the top
        angleH = p.map(p.hour(), 0, 24, 0, p.TWO_PI * 2) // aling hour to start at the top
        a = loadImage("/lib/^.png")
        I = loadImage("/lib/i.png")
        o = loadImage("/lib/o.png")
        ph = createVector(0, 0)
        pm = createVector(0, 0)
        ps = createVector(0, 0)
        dh = createVector(0, 0)
        dm = createVector(0, 0)
        ds = createVector(0, 0)
        sh = 0, sm = 0, ss = 0;
        lastFolded = true;
        p.noStroke()
        clockInterval = setTimeout(function() {
            clocking = true;
        }, 3000)
    };

    p.draw = function() {
        p.background(255);
        if (clocking)
            p.background(167, 252, 250, map(second(), 0, 60, 0, 255) - 100);
        p.fill("#a7fcfa");
        p.translate(p.width / 2, p.height / 2); // origin at the middle
        p.push()
        p.translate(ps.x, ps.y)
        p.rotate(curRS)
        p.scale(curSS)
        p.rect(0, 0, 120, 15)
        p.pop()
        p.push()
        // p.rotate(-PI/2)
        p.translate(ph.x, ph.y)
        p.rotate(curRH)
        p.scale(curSH)
        p.fill(20)
        // p.rotate(PI/2)
        p.image(a, 0, 0, a.width / ratio, a.height / ratio)
        // p.rect( 0, 0, a.width / ratio, a.height / ratio)
        p.pop()
        p.push()
        p.translate(pm.x, pm.y)
        p.rotate(curRM)
        p.scale(curSM)
        p.image(o, 0, 0, o.width / ratio, o.height / ratio)
        p.pop()
        if (unfolded != lastFolded) {
            clearInterval(clockInterval)
            clocking = false
            logo(p)
            clockInterval = setTimeout(function() {
                clocking = true;
            }, 2000)
        }
        if (clocking) {
            clock(p)
        }
        // clock(p)
        // console.log(unfolded)
        anmi();
        // console.log(desSH)
        lastFolded = unfolded
    };

    function anmi() {
        desSH = sh - curSH
        desSM = sm - curSM
        desSS = ss - curSS
        curSH += desSH * 0.2
        curSM += desSM * 0.2
        curSS += desSS * 0.2

        desRH = angleH - curRH
        desRM = angleM - curRM
        desRS = angleS - curRS
        curRH += desRH * 0.2
        curRM += desRM * 0.2
        curRS += desRS * 0.2

        var tempS = p5.Vector.sub(ds, ps)
        if (ps.dist(ds) > 1)
            ps.add(tempS.mult(0.2));
        var tempM = p5.Vector.sub(dm, pm);
        if (pm.dist(dm) > 1)
            pm.add(tempM.mult(0.2));
        var tempH = p5.Vector.sub(dh, ph);
        if (ph.dist(dh) > 1)
            ph.add(tempH.mult(0.2));
    }

    function logo(p) {
        sh = size / 200
        sm = size / 200
        ss = size / 200
        angleS = -PI / 4 // aling second to start at the top
        angleM = 0 // aling minute to start at the top
        angleH = 0 // aling hour to start at the top
        ds = ip.copy()
        dm = op.copy()
        dh = ap.copy()


    }

    function clock(p) {
        sh = size / 130
        sm = size / 200
        ss = size / 20
        angleS = p.map(p.second(), 0, 60, 0, p.TWO_PI) - PI / 2; // aling second to start at the top
        angleM = p.map(p.minute(), 0, 60, 0, p.TWO_PI) - p.HALF_PI; // aling minute to start at the top
        angleH = p.map(p.hour(), 0, 24, 0, p.TWO_PI * 2); // aling hour to start at the top
        ds.x = cos(angleS) * 80 * size / 330
        ds.y = sin(angleS) * 80 * size / 330
        dm.x = cos(angleM) * 80 * size / 230
        dm.y = sin(angleM) * 80 * size / 230
        dh.x = 0
        dh.y = 0


        // p.pop()
    }
};
var myp5;
