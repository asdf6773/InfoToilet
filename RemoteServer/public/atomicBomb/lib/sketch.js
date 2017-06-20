var standby;
var pushed;
var button;
var status;
var flag = false;
var socket;
// var ip = "192.168.137.1:8888"
var green, red, purple;

function preload() {
    standby = loadImage("/atomicBomb/lib/standby.png");
    pushed = loadImage("/atomicBomb/lib/pushed.png");
    green = loadImage("/atomicBomb/lib/green.png");
    purple = loadImage("/atomicBomb/lib/purple.png");
    red = loadImage("/atomicBomb/lib/red.png");
}

function setup() {
    status = 0;
    rectMode(CENTER);
    imageMode(CENTER);
    createCanvas(window.innerWidth, window.innerHeight)
    socket = io.connect('http://' + ip + '/bottonStatus')
    socket.on("init", function(init) {
    flag = init;
})
    socket.on("pressed", function() {
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
    background(255);
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
    pop()
    noFill();
    noStroke();
    rect(width / 2, height / 2 + 8, window.innerWidth / 2.5, window.innerWidth / 2.5);
}

function mousePressed() {

    if (mouseX > width / 2 - window.innerWidth / 2.5 / 2 &&
        mouseX < width / 2 + window.innerWidth / 2.5 / 2 &&
        mouseY > (height / 2 + 8) - window.innerWidth / 2.5 / 2 &&
        mouseY < (height / 2 + 8) + window.innerWidth / 2.5 / 2) {
        socket.emit("pressed")
    }
}

function mouseReleased() {
    if (flag)
        socket.emit("released")
    // flag = false;
}
