var s = function(p) {
    var ratio = 3;
    var a, I, o;
    var canvas; // p could be any variable name
    var x = 100;
    var y = 100;
    var ap, ip, op;
    console.log(grid)

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
    p.setup = function() {

        canvas = p.createCanvas(size, size);
        p.background(255);
        ap = createVector(p.width / 2.8, p.height / 3)
        ip = createVector(p.width / 2, p.height / 2)
        op = createVector(p.width / 1.56, p.height / 1.6)
        p.imageMode(CENTER)
        a = loadImage("/lib/^.png")
        I = loadImage("/lib/i.png")
        o = loadImage("/lib/o.png")

    };

    p.draw = function() {
    p.background(255,255,255,30-second()/2);
        // p.rect(0,0,p.width,p.height)
        p.fill(255);
        // p.image(a, ap.x, ap.y, a.width / ratio, a.height / ratio)
        // p.image(o, op.x, op.y, o.width / ratio, o.height / ratio)
        // p.rect(x, y, 50, 50);

        // p.imageMode(CORNER)


        ip.x = sx / 2 + p.width / 2;
        ip.y = sy / 2 + p.height / 2;
        // p.ellipse(ip.x,ip.y,200,200)
        // p.text("32323232", sx / 2, sy / 2);
        console.log(sx / 2)
        clock(p)

    };

    function clock(p) {
        p.push()
        p.translate(p.width / 2, p.height / 2); // origin at the middle
        p.strokeWeight(2);
        p.stroke(0);




        p.push()
        p.rotate(-PI/2)
        p.rotate(angleM)
        p.translate(65, 0)
        p.image(o, 0, 0, o.width / ratio, o.height / ratio)
        p.pop()

        p.push()
        p.rotate(PI / 4)
        p.rotate(angleS)
        p.translate(60, -60)
        p.image(I, 0, 0, I.width / ratio, I.height / ratio)
        p.pop()

        p.push()
        p.rotate()
        p.rotate(angleH)
        p.translate(0, -25)
        p.image(a, 0, 0, a.width / ratio, a.height / ratio)
        p.pop()
        angleS = p.map(p.second(), 0, 60, 0, p.TWO_PI) - p.HALF_PI;; // aling second to start at the top
        angleM = p.map(p.minute(), 0, 60, 0, p.TWO_PI); // aling minute to start at the top
        angleH = p.map(p.hour(), 0, 24, 0, p.TWO_PI * 2) // aling hour to start at the top
        // console.log(hour())
        sx = p.cos(angleS) * 50; // second x
        sy = p.sin(angleS) * 50; // second y
        mx = p.cos(angleM) * 120; // minute x
        my = p.sin(angleM) * 120; // minute y
        hx = p.cos(angleH) * 30; // hour x
        hy = p.sin(angleH) * 30; // hour y
        //
        // p.noStroke();
        // p.textFont("Georgia");
        //
        // p.textSize(28);
        // p.fill(color(231, 76, 60)); // red - second
        // p.text(second(), sx / 2, sy / 2);
        //
        // p.textSize(36);
        // p.fill(color(46, 204, 113)); // green - minute
        // p.text(minute(), mx / 2, my / 2);
        //
        // p.textSize(60);
        // p.fill(color(67, 103, 140)); // blue - hour
        // p.text(hour(), hx / 2, hy / 2);
        p.pop()
    }
};
var myp5;
