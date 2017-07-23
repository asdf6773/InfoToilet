function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    initApp();
    homePreload();
    homeSetup();

}

window.ondevicemotion = function(event) {

    accelerationX = event.accelerationIncludingGravity.x;
    accelerationY = event.accelerationIncludingGravity.y;
    accelerationZ = event.accelerationIncludingGravity.z;
    rX = event.rotationRate.alpha;
    rY = event.rotationRate.beta;
    rZ = event.rotationRate.gamma;
    rx = rX
    ry = rY
    rz = rZ
    ax = accelerationX;
    ay = accelerationY
    az = accelerationZ
}

function draw() {
    loopApp();
    home();
}
