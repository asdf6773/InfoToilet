//
// document.oncontextmenu = function() {
//     return false;
// }


var particles = [];

var waitForFlush = false;

function setup() {
    createCanvas(windowWidth, windowHeight,WEBGL);
    noStroke();
    console.log(windowWidth)
    for (var i = 0; i < 100; i++) {
        particles.push(new Particle())
    }
}

function draw() {
    background(255);

    for (var i = 0; i < particles.length; i++) {
       particles[i].update()
    }
}
