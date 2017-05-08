//
// document.oncontextmenu = function() {
//     return false;
// }
var particles = [];
var accelerationX = 0;
var accelerationY = 0;
var accelerationZ = 0;
var rX = 0;
var rY = 0;
var rZ = 0;
var waitForFlush = false;
var acc = document.getElementById("acc");


// acc.getElementsByTagName("li")[0].innerHTML = "X";
// acc.getElementsByTagName("li")[1].innerHTML = "Y";
// acc.getElementsByTagName("li")[2].innerHTML = "Z";
// acc.getElementsByTagName("li")[0].innerHTML = "rX";
// acc.getElementsByTagName("li")[1].innerHTML = "rY";
// acc.getElementsByTagName("li")[2].innerHTML = "rZ";

function setup() {
    ellipseMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    noStroke();
    // blendMode(BLEND);
    console.log(windowWidth)
    // for (var i = 0; i < 100; i++) {
    //
    // }
}
window.ondevicemotion = function(event) {
    for (var i = 0; i < particles.length; i++) {
        particles[i].acc.x = event.accelerationIncludingGravity.x;
        particles[i].acc.y = event.accelerationIncludingGravity.y;

    }
    accelerationX = event.accelerationIncludingGravity.x;
    accelerationY = event.accelerationIncludingGravity.y;
    accelerationZ = event.accelerationIncludingGravity.z;
    rX = event.rotationRate.alpha;
    rY = event.rotationRate.beta;
    rZ = event.rotationRate.gamma;
}

function draw() {

    // acc.getElementsByTagName("li")[0].innerHTML = "X: " + Math.round(accelerationX * 100);
    // acc.getElementsByTagName("li")[1].innerHTML = "Y: " + Math.round(accelerationY * 100);
    // acc.getElementsByTagName("li")[2].innerHTML = "Z: " + Math.round(accelerationZ * 100);
    // acc.getElementsByTagName("li")[3].innerHTML = "rX: " + Math.round(rX);
    // acc.getElementsByTagName("li")[4].innerHTML = "rY: " + Math.round(rY);
    // acc.getElementsByTagName("li")[5].innerHTML = "rZ: " + Math.round(rZ);
    fill(255, 100)
    rect(0, 0, width, height);
    // background(255);
    if (particles.length < 200) {
        particles.push(new Particle())
        particles.push(new Particle())

    }
    if (particles.length > 200) {
        particles.splice(200, 1);

    }
    for (var i = 0; i < particles.length; i++) {

        particles[i].update()
        if (particles[i].lifespan<=0||particles[i].pos.x <= -100 || particles[i].pos.x >= width + 100 || particles[i].pos.y >= height + 100 || particles[i].pos.y < -100) {
            particles.splice(i, 1);
        }

    }

    // console.log(particles.length)
}
