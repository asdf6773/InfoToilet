// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

function Particle(attractor) {
    //  this.attractor = attractor_;
    this.scale = 1;
    this.des = createVector(random(width / 3), random(width / 3));
    this.scaleRandom = 0.5 * Math.random() + 1;
    // this.dir = random(TWO_PI)
    this.dir = random(TWO_PI)
    this.speed = random(PI, TWO_PI)
    this.pos = createVector(width/2,height);
    // createVector(random(30, width - 30), random(height - 300, height - 100));
    // this.pos = createVector(random(width / 3), random(width / 3));
    // console.log(this.scale + ' ' + this.scaleRandom)
    this.vel = createVector();
    this.acc = createVector();
    this.lifespan = 255;
    this.maxforce = random(0.5, 1);
    this.maxspeed = random(0.1, 0.2);
    this.opacity = 255;
    this.update = function(rotate) {

        // var distance = this.pos.dist(this.des)
        var temp = p5.Vector.sub(this.des, this.pos)
        if (this.pos.dist(this.des) > 1)
            this.pos.add(temp.mult(0.09));


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
            addCFont(key);
            break;
        case 'B':
            addCFont(key);
            break;
        case 'C':
            addCFont(key);
            break;
        case 'D':
            addCFont(key);
            break;
        case 'E':
            addCFont(key);
            break;
        case 'F':
            addCFont(key);
            break;
        case 'G':
            addCFont(key);
            break;
        case 'H':
            addCFont(key);
            break;
        case 'I':
            addCFont(key);
            break;
        case 'J':
            addCFont(key);
            break;
        case 'K':
            addCFont(key);
            break;
        case 'L':
            addCFont(key);
            break;
        case 'M':
            addCFont(key);
            break;
        case 'N':
            addCFont(key);
            break;
        case 'O':
            addCFont(key);
            break;
        case 'P':
            addCFont(key);
            break;
        case 'Q':
            addCFont(key);
            break;
        case 'R':
            addCFont(key);
            break;
        case 'S':
            addCFont(key);
            break;
        case 'T':
            addCFont(key);
            break;
        case 'U':
            addCFont(key);
            break;
        case 'V':
            addCFont(key);
            break;
        case 'W':
            addCFont(key);
            break;
        case 'X':
            addCFont(key);
            break;
        case 'Y':
            addCFont(key);
            break;
        case 'Z':
            addCFont(key);
            break;


        case '1':
            addCFont(key);
            break;
        case '2':
            addCFont(key);
            break;
        case '3':
            addCFont(key);
            break;
        case '4':
            addCFont(key);
            break;
        case '5':
            addCFont(key);
            break;
        case '6':
            addCFont(key);
            break;
        case '7':
            addCFont(key);
            break;
        case '8':
            addCFont(key);
            break;
        case '9':
            addCFont(key);
            break;
        case '0':
            addCFont(key);
            break;
        case '!':
            addCFont(key);
            break;
        case '~':
            addCFont(key);
            break;
        case '`':
            addCFont(key);
            break;
        case '@':
            addCFont(key);
            break;
        case '#':
            addCFont(key);
            break;
        case '%':
            addCFont(key);
            break;
        case '^':
            addCFont(key);
            break;
        case '&':
            addCFont(key);
            break;
        case '*':
            addCFont(key);
            break;
        case '(':
            addCFont(key);
            break;
        case ')':
            addCFont(key);
            break;
        case '-':
            addCFont(key);
            break;
        case '_':
            addCFont(key);
            break;
        case '+':
            addCFont(key);
            break;
        case '=':
            addCFont(key);
            break;
        case '{':
            addCFont(key);
            break;
        case "|":
            addCFont(key);
            break;
        case '"':
            addCFont(key);
            break;
        case '?':
            addCFont(key);
            break;
        case '<':
            addCFont(key);
            break;
        case '>':
            addCFont(key);
            break;
        case '.':
            addCFont(key);
            break;
        case ',':
            addCFont(key);
            break;
        case '/':
            addCFont(key);
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
