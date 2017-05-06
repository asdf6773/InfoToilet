function Particle() {
    this.step = 0;
    this.blow = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.speed = 0;
    //   var acc, pos, frc;
    // this.radius =1000
    //   this.theta = Math.PI * Math.random() - Math.PI / 2;
    //   this.phi = 2 * Math.PI * Math.random();
    //   // this.x = Math.cos(this.theta) * Math.cos(this.phi) * this.radius/3;
    // this.y = Math.sin(this.theta) * this.radius;
    // this.z = Math.sin(this.phi) * Math.cos(this.theta) * this.radius;
    this.x = window.innerWidth * Math.random() - window.innerWidth / 2;
    this.y = window.innerHeight * Math.random() - window.innerHeight / 2;
    this.z = 300

    this.pos = new THREE.Vector3(this.x, this.y, this.z);
    // this.temp = new THREE.Vector3(this.x, this.y, this.z);

    // if (this.temp.length() < this.radius / 2) {
    //     this.pos = new THREE.Vector3(this.x, this.y, this.z);
    // } else {
    //
    //     this.pos = new THREE.Vector3(this.x / 10, this.y / 10, this.z / 10);
    // }
    //  this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3(0, 0, 0);
    this.acc = new THREE.Vector3(0, 0, 0);
    this.update = function(flag) {
        this.acc.z = this.step;
        this.vel.z = 0.5;
        if (flag && this.blow < 40) {
            this.blow += 0.5;
        } else if (this.blow > 0) {
            this.blow -= 0.1;
        }

        this.vel.x = this.blow * Math.random() - this.blow / 2;
        this.vel.y = this.blow * Math.random() - this.blow / 2;
        this.vel.addVectors(this.vel, this.acc);
        this.pos.addVectors(this.pos, this.vel);
        this.speed = Math.sqrt(
            (this.pos.x - this.lastX) * (this.pos.x - this.lastX) -
            (this.pos.y - this.lastY) * (this.pos.y - this.lastY)
        )
        this.lastX = this.pos.x;
        this.lastY = this.pos.y;

        //this.acc.multiplyScalar(0);
    }
}
module.exports = Particle;
