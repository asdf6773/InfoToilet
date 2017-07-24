var standby;
var pushed;
var button;
var status;
var title;
var flag = false;
var socket;
var presser = false;
var greenLight, purpleLight, redLight;
// var ip = "192.168.137.1:8888"
var green, red, purple;
var dice;
var video;
var playing = false;
var fingers;
var button;

function preload() {
    green_standby = loadImage("/atomicBomb/lib/green_standby.png");
    green_pushed = loadImage("/atomicBomb/lib/green_pushed.png");
    red_standby = loadImage("/atomicBomb/lib/red_standby.png");
    red_pushed = loadImage("/atomicBomb/lib/red_pushed.png");
    purple_standby = loadImage("/atomicBomb/lib/purple_standby.png");
    purple_pushed = loadImage("/atomicBomb/lib/purple_pushed.png");
    green = loadImage("/atomicBomb/lib/green.png");
    purple = loadImage("/atomicBomb/lib/purple.png");
    red = loadImage("/atomicBomb/lib/red.png");
    title = loadImage("/atomicBomb/lib/title_2.png");
}

var Y_AXIS = 1;
var X_AXIS = 2;

function toggleVid() {
    video.loop();
}

function setup() {
    dice = Math.floor(random(0, 3));
    b1 = color(199, 214, 214);
    b2 = color(210, 218, 214);
    c1 = color(204, 102, 0);
    c2 = color(0, 102, 153);
    status = 0;
    greenLight = false;
    redLight = false;
    purpleLight = false;
    rectMode(CENTER);
    imageMode(CENTER);
    createCanvas(window.innerWidth, window.innerHeight);
    socket = io.connect('http://' + ip + '/Button')

    $("#intro").click(function() {
      $("#intro").css("z-index","1000")
        if ($("#introDiv").css("display") == "none") {
            $("#introDiv").css('display', 'block')
        } else {
            $("#introDiv").css('display', 'none')
        }
    })
    $("#introImg").click(function() {
        if ($("#introDiv").css("display") == "none") {
            $("#introDiv").css('display', 'block')
        } else {
            $("#introDiv").css('display', 'none')
        }
    })
  socketSetup();

}

function draw() {
    // print(flag)
    setGradient(0, 0, width, height, b1, b2, Y_AXIS);
    push()
    translate(width / 2, height / 2)
    if (!flag) {
        switch (dice) {
            case 0:
                image(green_standby, 0, 0, window.innerWidth, green_standby.height / green_standby.width * window.innerWidth);
                break;
            case 1:
                image(red_standby, 0, 0, window.innerWidth, red_standby.height / red_standby.width * window.innerWidth);
                break;
            case 2:
                image(purple_standby, 0, 0, window.innerWidth, purple_standby.height / purple_standby.width * window.innerWidth);
                break;
            default:
        }
    } else {
        switch (dice) {
            case 0:
                image(green_pushed, 0, 0, window.innerWidth, green_pushed.height / green_pushed.width * window.innerWidth);
                // image(green, window.width / 9.2, window.width / 3.33, green.width, green.height);
                break;
            case 1:
                image(red_pushed, 0, 0, window.innerWidth, red_pushed.height / red_pushed.width * window.innerWidth);
                // image(red, 0, window.width / 3.1, green.width, green.height);
                break;
            case 2:
                image(purple_pushed, 0, 0, window.innerWidth, purple_pushed.height / purple_pushed.width * window.innerWidth);
                break;
            default:
        }
    }
    if (greenLight)
        image(green, window.width / 9.2, window.width / 3.33, green.width, green.height);
    if (redLight)
        image(red, 0, window.width / 3.1, red.width, red.height);
    if (purpleLight)
        image(purple, -window.width / 9.2, window.width / 3.33, purple.width, purple.height);
    image(title, window.innerWidth / 10, -window.innerWidth / 2.4, window.innerWidth / 2, title.height / title.width * window.innerWidth / 2);
    pop()
    noFill();
    noStroke();
    // image(video, 0, 0, video.width / 2, video.height / 2)
}

function mousePressed() {

    if (mouseX > width / 2 - window.innerWidth / 2.5 / 2 &&
        mouseX < width / 2 + window.innerWidth / 2.5 / 2 &&
        mouseY > (height / 2 + 8) - window.innerWidth / 2.5 / 2 &&
        mouseY < (height / 2 + 8) + window.innerWidth / 2.5 / 2 &&
        flag === false) {
        if (dice == 0) {
            socket.emit("greenPressed")
        }
        if (dice == 1) {
            socket.emit("redPressed")
        }
        if (dice == 2) {
            socket.emit("purplePressed")
        }
    } else {

    }
}

function mouseReleased() {
    if (presser) {
        if (dice == 0)
            socket.emit("releaseGreen")
        if (dice == 1)
            socket.emit("releaseRed")
        if (dice == 2)
            socket.emit("releasePurple")
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

function socketSetup(){
  socket.on("boom", function(init) {
      toggleVid()
      console.log("boom!!")
  })
  socket.on("init", function(data) {
      greenLight = data.green;
      redLight = data.red;
      purpleLight = data.purple;
      if (dice == 0 && data.green) {
          flag = true
      }
      if (dice == 1 && data.red) {
          flag = true
      }
      if (dice == 2 && data.purple) {
          flag = true
      }
  })
  socket.on("buttonInit", function(init) {
      flag = init;
  })

  socket.on("greenPressed", function() {
      if (dice == 0)
          flag = true;
      greenLight = true;
  })
  socket.on("redPressed", function() {
      if (dice == 1)
          flag = true;
      redLight = true;
  })
  socket.on("purplePressed", function() {
      if (dice == 2)
          flag = true;
      purpleLight = true;
  })
  socket.on("releaseGreen", function() {
      if (dice == 0)
          flag = false;
      greenLight = false;
  })
  socket.on("releaseRed", function() {
      if (dice == 1)
          flag = false;
      redLight = false;
  })
  socket.on("releasePurple", function() {
      if (dice == 2)
          flag = false;
      purpleLight = false;
  })

  socket.on("presser", function() {
      presser = true;
      flag = true;
  })
  socket.on("released", function() {
      if (!mouseIsPressed)
          flag = false;
  })
}
