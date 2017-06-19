function Particle() {
    this.step = 0;
    //   var acc, pos, frc;
    this.radius = 1000
    this.theta = Math.PI * Math.random() - Math.PI / 2;
    this.phi = 2 * Math.PI * Math.random();
    this.x = Math.cos(this.theta) * Math.cos(this.phi) * this.radius / 3;
    this.y = Math.sin(this.theta) * this.radius;
    // this.z = Math.sin(this.phi) * Math.cos(this.theta) * this.radius;
    // this.x = window.innerWidth * Math.random() - window.innerWidth / 2;
    // this.y = window.innerHeight * Math.random() - window.innerHeight / 2;
    this.z = 300
    this.pos = new THREE.Vector3(this.x, this.y, this.z);
    this.temp = new THREE.Vector3(this.x, this.y, this.z);

    if (this.temp.length() < this.radius /2.22) {
        this.pos = new THREE.Vector3(this.x, this.y, this.z);
    } else {
        //
        this.pos = new THREE.Vector3(this.x / 10, this.y / 10, this.z / 10);
    }
    //  this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3(0, 0, 0);
    this.acc = new THREE.Vector3(0, 0, 0);
    this.update = function() {
        this.acc.z = this.step;
        this.step += 0.02;
        this.vel.addVectors(this.vel, this.acc);
        this.pos.addVectors(this.pos, this.vel);
        //this.acc.multiplyScalar(0);
    }
}
module.exports = Particle;
