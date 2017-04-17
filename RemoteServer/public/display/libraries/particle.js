// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

function Particle(_attractor) {
    this.attractor = _attractor;
    this.pos = createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();
    this.lifespan = 255;
    this.maxforce = random(0.5, 1);
    this.maxspeed = random(0.1, 0.2);
    this.update = function() {
        //add attraction
        var dir = p5.Vector.sub(attractor, this.pos);
        dir.normalize();
        var distance = dist(this.pos.x, this.pos.y, attractor.x, attractor.y);
        var force = dir.mult(8 / distance * distance / 10);
        this.acc = force;
        //apply force
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(5);
        this.lifespan -= 1;
        fill(255);
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }





}
