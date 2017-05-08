// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

function Particle() {
    //  this.attractor = attractor_;
    this.scale = 1;
    this.scaleRandom = random(5, 10);
    this.dir = random(TWO_PI)
    this.speed = random(PI, TWO_PI)
    this.pos = createVector(random(width/2)+width/4, random(width/2)+height/2-width/4, 0);

    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.lifespan = 255;
    this.maxforce = random(0.5, 1);
    this.maxspeed = random(0.1, 0.2);
    this.update = function() {
        //add attraction
        var landscapeOrientation = window.innerWidth / window.innerHeight > 1;
        if (landscapeOrientation) {

            //apply force
            this.vel.add(this.acc);
        } else {

            this.vel.x += this.acc.x;
            this.vel.y -= this.acc.y;
        }


        this.vel.mult(0.35);

        this.pos.add(this.vel.mult(1));
        this.vel.limit(5);
        this.lifespan -= 1;
        fill(120, 255, 255);
        ellipse(this.pos.x, this.pos.y, this.scaleRandom, this.scaleRandom);
    }
}
