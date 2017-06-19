// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

function Particle() {
    this.r = 2.0;
    this.windSpeed = random(0.005, 0.001);
    //  this.attractor = attractor_;
    this.scale = 0;
    this.rotate = random(TWO_PI);
    this.scaleRandom = random(10, 20);
    this.dir = random(TWO_PI)
    this.speed = random(PI, TWO_PI)
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.lifespan = 255;
    this.maxforce = random(0.005, 0.001);
    this.maxspeed = 0.1;
    this.update = function() {
        // if () {
        // if (this.scale < this.scaleRandom * 2) {
        //     this.scale += 4;
        // }
        //add attraction
        windSpeed = this.maxspeed;
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
        this.vel.limit(windSpeed);
        if (dryerFlag) {
            if (this.maxspeed < 150) {
                this.maxspeed +=   0.51/this.maxspeed;
            }
        } else {
            if (this.maxspeed > 0.1) {
                this.maxspeed -=0.1*this.maxspeed;
            }
        }
        // }else{
        // }
        this.lifespan -= 2;

    }
    this.edge = function() {
        if (this.pos.x < 1) {
            this.pos.x = width
        }

        if (this.pos.y < 1) this.pos.y = height;
        if (this.pos.x > width) this.pos.x = 1;
        if (this.pos.y > height) this.pos.y = 1;
    }
    this.applyForce = function(force) {
        this.acc.add(force);
    }
    this.follow = function(vectors) { // flowfield vectors
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * xvec;
        var force = vectors[index];
        this.applyForce(force);
    }
}
