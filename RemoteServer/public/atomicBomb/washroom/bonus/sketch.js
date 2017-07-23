var particles = [];
var scl = 30;
var waitForFlush = false;
var acc = document.getElementById("acc");
var socket;
var json;
var noiseInc = .1;
var time = 0;
function setup() {
    ellipseMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    noStroke();
    socket = io.connect('http://' + ip + '/dryer')
    console.log(windowWidth)
    socket.on('weiboData', function(data) {
        console.log("gotcha ")
    })
    for (var i = 0; i < 100; i++) {
        particles.push(new Particle())
    }
}



function draw() {
    background(0)
    fill(0, 102, 2);
    for (var i = 0; i < particles.length; i++) {
        push()
        translate(particles[i].pos.x, particles[i].pos.y);
        rotate(particles[i].rotate);
        text("s", 0, 0);
        pop()
    }
    FlowField();
    // console.log(txt）
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].edge();
        particles[i].follow(flowfield);
    }
    // if (particles.length < 200) {
    //     particles.push(new Particle())
    //     particles.push(new Particle())
    //
    // }
    // if (particles.length > 200) {
    //     particles.splice(200, 1);
    // }
}
