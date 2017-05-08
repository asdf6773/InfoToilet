// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

function Particle() {
    //  this.attractor = attractor_;
    this.scale = 0;
    this.scaleRandom = random(10, 100);
    this.dir = random(TWO_PI)
    this.speed = random(PI, TWO_PI)
    this.pos = createVector(random(width / 4) + width / 2/1.5, random(width / 4) + height / 4 - width / 8, 0);

    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.lifespan = 255;
    this.maxforce = random(0.5, 1);
    this.maxspeed = random(0.1, 0.2);
    this.update = function() {
        // if () {
            if (this.scale < this.scaleRandom * 2) {
                this.scale += 4;

            }
            //add attraction
            var landscapeOrientation = window.innerWidth / window.innerHeight > 1;
            if (landscapeOrientation) {

                //apply force
                this.vel.add(this.acc);
            } else {

                this.vel.x += this.acc.x;
                this.vel.y -= this.acc.y;
            }


            this.vel.mult(this.scale*0.00155);

            this.pos.add(this.vel.mult(1.2));
            this.vel.limit(5);
        // }else{
        //
        //
        // }
        this.lifespan -= 2;
        fill(120, 255, 255, this.lifespan/4);
        ellipse(this.pos.x, this.pos.y, this.scale, this.scale);
    }
}
