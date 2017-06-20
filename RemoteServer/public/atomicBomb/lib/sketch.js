var standby;
var pushed;
var button;
var status;
var title;
var flag = false;
var socket;
var presser = false;
// var ip = "192.168.137.1:8888"
var green, red, purple;

function preload() {
    standby = loadImage("/atomicBomb/lib/standby.png");
    pushed = loadImage("/atomicBomb/lib/pushed.png");
    green = loadImage("/atomicBomb/lib/green.png");
    purple = loadImage("/atomicBomb/lib/purple.png");
    red = loadImage("/atomicBomb/lib/red.png");
    title = loadImage("/atomicBomb/lib/title.png");
}

var Y_AXIS = 1;
var X_AXIS = 2;

function setup() {
    b1 = color(199, 214, 214);
    b2 = color(210, 218, 214);
    c1 = color(204, 102, 0);
    c2 = color(0, 102, 153);
    status = 0;
    rectMode(CENTER);
    imageMode(CENTER);
    createCanvas(window.innerWidth, window.innerHeight)
    socket = io.connect('http://' + ip + '/greenButton')
    socket.on("init", function(init) {
        flag = init;
    })
    socket.on("pressed", function() {
        flag = true;
    })
    socket.on("presser", function() {
        presser = true;
        flag = true;
    })
    socket.on("released", function() {
        if (!mouseIsPressed)
            flag = false;
    })
    socket.on("releasedAll", function() {

        flag = false;
    })
}

function draw() {
    // print(flag)
    setGradient(0, 0, width, height, b1, b2, Y_AXIS);
    push()
    translate(width / 2, height / 2)
    if (!flag) {
        image(standby, 0, 0, window.innerWidth, standby.height / standby.width * window.innerWidth);
    } else {
        image(pushed, 0, 0, window.innerWidth, standby.height / standby.width * window.innerWidth);
        image(green, window.width / 9.2, window.width / 3.33, green.width, green.height);
        // image(red, 0, window.width / 3.1, green.width, green.height);
        // image(purple, -window.width / 9.2, window.width /  3.33, green.width, green.height);
    }
    image(title, window.innerWidth/10,- window.innerWidth/2.4, window.innerWidth/2, title.height / title.width * window.innerWidth/2);
    pop()
    noFill();
    noStroke();

    // rect(width / 2, height / 2 + 8, window.innerWidth / 2.5, window.innerWidth / 2.5);
}

function mousePressed() {

    if (mouseX > width / 2 - window.innerWidth / 2.5 / 2 &&
        mouseX < width / 2 + window.innerWidth / 2.5 / 2 &&
        mouseY > (height / 2 + 8) - window.innerWidth / 2.5 / 2 &&
        mouseY < (height / 2 + 8) + window.innerWidth / 2.5 / 2 &&
        flag === false) {
        socket.emit("pressed")
    } else {

    }
}

function mouseReleased() {
    if (presser) {
        socket.emit("released")
        presser = false;
    }
    // flag = false;
}

function setGradient(x, y, w, h, c1, c2, axis) {

    noFill();

    if (axis == Y_AXIS) { // Top to bottom gradient
        for (var i = y; i <= y + h; i++) {
            var inter = map(i, y, y + h, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis == X_AXIS) { // Left to right gradient
        for (var i = x; i <= x + w; i++) {
            var inter = map(i, x, x + w, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}
