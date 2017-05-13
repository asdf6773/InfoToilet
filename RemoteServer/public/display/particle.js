// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

function Particle(attractor) {
    //  this.attractor = attractor_;
    this.scale = 1;
    this.scaleRandom = 0.5 * Math.random() + 1;
    this.dir = random(TWO_PI)
    this.speed = random(PI, TWO_PI)
    this.pos = createVector(random(80), random(80));
    console.log(this.scale + ' ' + this.scaleRandom)
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
