var particles = [];
var scl = 30;
var xvec, yvec;
var waitForFlush = false;
var acc = document.getElementById("acc");
var socket;
var json;
var noiseInc = .1;
var time = 0;
var str;
var button;
var dryerFlag;
var Y_AXIS = 1;
var X_AXIS = 2;
var dryer;
var dryPosY;
var MAX_NUM = 100;
document.getElementById('back').href = 'http://' + ip + '/graduateProject';
function setup() {
    dryPosY = 70;
    dryer = loadImage("lib/dryer.png");
    //BG
    b1 = color(214, 227, 233);
    b2 = color(222);
    c1 = color(204, 102, 0);
    c2 = color(0, 102, 153);
    str = ""
    ellipseMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    noStroke();
    socket = io.connect('http://' + ip + '/dryer')
    console.log(windowWidth)
    socket.on('weiboData', function(data) {
        for (var i = 0; i < data.statuses.length; i++)
            if (data.statuses[i]) {
                // console.log(data.statuses[i].text)
                str += data.statuses[i].text;
            }
        console.log(str)
    })
    imageMode(CENTER);
    button = createButton('blow');
    // button.position(width-50, 19);
    // button.mousePressed(changeStatus);
    // button.mouseReleased(changeStatus);
    for (var i = 0; i < MAX_NUM; i++) {
        particles.push(new Particle())
    }
}

function changeStatus() {
    dryerFlag = !dryerFlag;
    // console.log(dryerFlag)
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


function draw() {
  // console.log(dryPosY)
    var rand = Math.random()
    if (dryerFlag) {
        if (dryPosY > 0)
            dryPosY -= dryPosY / 20;

    } else {
        if (dryPosY < 80)
            dryPosY += dryPosY / 10 + 1;
    }

    setGradient(0, 0, width, height, b1, b2, Y_AXIS);
    noStroke()

    // print(particles[0].pos)
    fill(82, 114, 131, 100);
    for (var i = 0; i < particles.length; i++) {
        push()
        textSize(particles[i].scaleRandom);
        translate(particles[i].pos.x, particles[i].pos.y);
        rotate(particles[i].rotate);
        if (str.charAt(i))
            text(str.charAt(i), 0, 0);
        pop()
    }
    image(dryer, width / 2, (dryPosY-50)*2, dryer.width, dryer.height)
    FlowField();
    // console.log(txt）
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        // particles[i].edge();
        particles[i].follow(flowfield);
    }
    for (var i = 0; i < particles.length; i++) {

        if (particles[i].pos.x < 0 || particles[i].pos.x > width || particles[i].pos.y < 0 || particles[i].pos.y > height) {
            particles.splice(i, dryerFlag == true ? 1 : 1);
            if (rand > 0.1) {
                particles.push(new Particle());
            }
        }
    }
    if (particles.length < MAX_NUM && !dryerFlag) {
        if (rand > 0.96)
            particles.push(new Particle());

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
