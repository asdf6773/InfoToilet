// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

function Particle() {
    //  this.attractor = attractor_;
    this.scale = 1;
    this.scaleRandom = random(5, 10);
    this.dir = random(TWO_PI)
    this.speed = random(PI, TWO_PI)
    this.pos = createVector(random(width), random(height), 0);

    this.vel = createVector();
    this.acc = createVector();
    this.lifespan = 255;
    this.maxforce = random(0.5, 1);
    this.maxspeed = random(0.1, 0.2);
    this.update = function() {
        //add attraction

        this.pos.x += 10;


        //apply force
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(5);
        this.lifespan -= 1;
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y,this.pos.z, this.scaleRandom, this.scaleRandom,this.scaleRandom);
    }
}
