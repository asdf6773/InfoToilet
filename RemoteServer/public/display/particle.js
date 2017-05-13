// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

function Particle(attractor) {
    //  this.attractor = attractor_;
    this.scale = 1;
    this.scaleRandom = 0.5 * Math.random() + 1;
    this.dir = random(TWO_PI)
    this.speed = random(PI, TWO_PI)
    this.pos = createVector(random(80), random(80));
    // console.log(this.scale + ' ' + this.scaleRandom)
    this.vel = createVector();
    this.acc = createVector();
    this.lifespan = 255;
    this.maxforce = random(0.5, 1);
    this.maxspeed = random(0.1, 0.2);
    this.update = function(rotate) {
        this.scale = 1;
        //add attraction
        var dir = p5.Vector.sub(attractor, this.pos);
        dir.normalize();
        var distance = dist(this.pos.x, this.pos.y, attractor.x, attractor.y);
        var force = dir.mult(rotate / distance * distance / 10);
        this.acc = force;
        //apply force
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(5);
        this.lifespan -= 1;
        fill(255);
        //  ellipse(this.pos.x, this.pos.y, 10, 10);
    }
}


function keyTriggered(key) {
    switch (key) {
        case 'a':
            addFont(key);
            break;
        case 'b':
            addFont(key);
            break;
        case 'c':
            addFont(key);
            break;
        case 'd':
            addFont(key);
            break;
        case 'e':
            addFont(key);
            break;
        case 'f':
            addFont(key);
            break;
        case 'g':
            addFont(key);
            break;
        case 'h':
            addFont(key);
            break;
        case 'i':
            addFont(key);
            break;
        case 'j':
            addFont(key);
            break;
        case 'k':
            addFont(key);
            break;
        case 'l':
            addFont(key);
            break;
        case 'm':
            addFont(key);
            break;
        case 'n':
            addFont(key);
            break;
        case 'o':
            addFont(key);
            break;
        case 'p':
            addFont(key);
            break;
        case 'q':
            addFont(key);
            break;
        case 'r':
            addFont(key);
            break;
        case 's':
            addFont(key);
            break;
        case 't':
            addFont(key);
            break;
        case 'u':
            addFont(key);
            break;
        case 'v':
            addFont(key);
            break;
        case 'w':
            addFont(key);
            break;
        case 'x':
            addFont(key);
            break;
        case 'y':
            addFont(key);
            break;
        case 'z':
            addFont(key);
            break;
        case 'A':
            addFont(key);
            break;
        case 'B':
            addFont(key);
            break;
        case 'C':
            addFont(key);
            break;
        case 'D':
            addFont(key);
            break;
        case 'E':
            addFont(key);
            break;
        case 'F':
            addFont(key);
            break;
        case 'G':
            addFont(key);
            break;
        case 'H':
            addFont(key);
            break;
        case 'I':
            addFont(key);
            break;
        case 'J':
            addFont(key);
            break;
        case 'K':
            addFont(key);
            break;
        case 'L':
            addFont(key);
            break;
        case 'M':
            addFont(key);
            break;
        case 'N':
            addFont(key);
            break;
        case 'O':
            addFont(key);
            break;
        case 'P':
            addFont(key);
            break;
        case 'Q':
            addFont(key);
            break;
        case 'R':
            addFont(key);
            break;
        case 'S':
            addFont(key);
            break;
        case 'T':
            addFont(key);
            break;
        case 'U':
            addFont(key);
            break;
        case 'V':
            addFont(key);
            break;
        case 'W':
            addFont(key);
            break;
        case 'X':
            addFont(key);
            break;
        case 'Y':
            addFont(key);
            break;
        case 'Z':
            addFont(key);
            break;
        default:


    }


    // if (key === 'a') {
    //
    // } else if (key === 'b') {
    //
    // }
    // uncomment to prevent any default behavior
    // return false;
}
