var particles = [];
var scl = 30;
var xvec, yvec;
var waitForFlush = false;
var acc = document.getElementById("acc");
var socket;
var socketToScreen;
var json;
var noiseInc = .1;
var time = 0;
var hollow;
var str;
var button;
var dryerFlag;
var Y_AXIS = 1;
var X_AXIS = 2;
var dryer;
var dryPosY;
var bonusStatus;
var MAX_NUM = 100;
var likes;
var bonus = [];
var suprise;
// document.getElementById('back').href = 'http://' + ip + '/graduateProject';
var heart;

function setup() {
    bonusStatus = false;
    textFont("Helvetica");
    likes = 0;
    dryPosY = 70;
    dryer = loadImage("/washroom/lib/dryer.png");
    //BG
    b1 = color(214, 227, 233);
    b2 = color(222);
    c1 = color(204, 102, 0);
    c2 = color(0, 102, 153);
    str = ""
    ellipseMode(CENTER);
    heart = loadImage("/washroom/lib/heart.png")
    hollow = loadImage("/washroom/lib/hollow.png")
    createCanvas(windowWidth, windowHeight);
    noStroke();
    socket = io.connect('http://' + ip + '/mirror')
    socketToScreen = io.connect('http://' + ip + '/projectorStatus')
    console.log(windowWidth)
    textAlign(RIGHT);
    socket.on("initLikes", function(num) {
        likes = num;
    })
    socket.on("like", function(type) {
        likes = type;
        particles.push(new Particle());
    })
    socket.on("bonus", function(type) {
        if (bonusStatus == false) {
            suprise = setInterval(function() {
                bonus.push(new bonusParticle())
                bonusStatus = true;
            }, 100)
            setTimeout(function() {
                clearInterval(suprise);
                bonusStatus = false;
            }, 9000)
        }
    })
    socket.on("clearBonus", function(type) {
        clearInterval(suprise);
    })
    socket.on('weiboData', function(data) {
        for (var i = 0; i < data.statuses.length; i++)
            if (data.statuses[i]) {
                // console.log(data.statuses[i].text)
                str += data.statuses[i].text;
            }
        console.log(str)
    })
    imageMode(CENTER);
    // button = createButton('blow');
    // button.position(19, 19);
    // button.mousePressed(changeStatus);
    // button.mouseReleased(changeStatus);
    // for (var i = 0; i < MAX_NUM; i++) {
    //     particles.push(new Particle())
    // }
}

function changeStatus() {
    dryerFlag = !dryerFlag;
    console.log(dryerFlag)
}


function keyPressed() {
    socket.emit("restart")
}

function draw() {
    background(0);
    image(hollow, width - 100, height - 100, hollow.width, hollow.height)


    for (var i = 0; i < particles.length; i++) {
        push();
        tint(255, particles[i].lifespan)
        image(heart, particles[i].pos.x, particles[i].pos.y, heart.width, heart.height)
        pop();
    }
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].lifespan <= 0 || particles[i].pos.y < -100) {
            particles.splice(i, 1);
        }
    }

    for (var i = 0; i < bonus.length; i++) {
        push();
        tint(255, bonus[i].lifespan)
        image(heart, bonus[i].pos.x, bonus[i].pos.y, heart.width, heart.height)
        pop();
    }
    for (var i = 0; i < bonus.length; i++) {
        if (bonus[i].lifespan <= 0 || bonus[i].pos.y < -100) {
            bonus.splice(i, 1);
        }
    }

    fill(255)
    noStroke();
    textSize(50)
    text(likes, width - 170, height - 80);
    FlowField();
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].follow(flowfield);
    }
    for (var i = 0; i < bonus.length; i++) {
        bonus[i].update();
        bonus[i].follow(flowfield);
    }
}
