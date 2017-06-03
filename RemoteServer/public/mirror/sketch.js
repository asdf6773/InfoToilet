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
var MAX_NUM = 100;
var likes;
// document.getElementById('back').href = 'http://' + ip + '/graduateProject';
var heart;

function setup() {
textFont("Helvetica");
    likes = 0;
    dryPosY = 70;
    dryer = loadImage("lib/dryer.png");
    //BG
    b1 = color(214, 227, 233);
    b2 = color(222);
    c1 = color(204, 102, 0);
    c2 = color(0, 102, 153);
    str = ""
    ellipseMode(CENTER);
    heart = loadImage("./lib/heart.png")
    hollow = loadImage("./lib/hollow.png")
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



function draw() {
    background(0);
    image(hollow,width-100, height-100, hollow.width, hollow.height)
    for (var i = 0; i < particles.length; i++) {
        push();
        tint(255, particles[i].lifespan)
        // particles[i].update();
        image(heart, particles[i].pos.x, particles[i].pos.y, heart.width, heart.height)

        pop();
    }
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].lifespan <= 0 || particles[i].pos.y < -100) {
            particles.splice(i, 1);
        }
    }
    // var rand = Math.random()
    // if (dryerFlag) {
    //     if (dryPosY > -50)
    //         dryPosY -= dryPosY / 10;
    //
    // } else {
    //     if (dryPosY < 70)
    //         dryPosY += dryPosY / 10 + 1;
    // }

    fill(255)
    // ellipse(width / 2, height / 2, 200, 200);
    // rect(0, 0, width, height)
    noStroke();
    textSize(50)
    text(likes, width - 170, height - 80);
    textSize(20)
      text("扫码为自己点赞", width - 70, height -30);
    // print(particles[0].pos)
    // fill(255);
    // for (var i = 0; i < particles.length; i++) {
    //     push()
    //     textSize(particles[i].scaleRandom);
    //     translate(particles[i].pos.x, particles[i].pos.y);
    //     rotate(particles[i].rotate);
    //     if (str.charAt(i))
    //         text(str.charAt(i), 0, 0);
    //     pop()
    // }
    // // image(dryer, width / 2, dryPosY, dryer.width, dryer.height)
    FlowField();
    // // console.log(txt)
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        // particles[i].edge();
        particles[i].follow(flowfield);
    }
    // for (var i = 0; i < particles.length; i++) {
    //
    //     if (particles[i].pos.x < 0 || particles[i].pos.x > width || particles[i].pos.y < 0 || particles[i].pos.y > height) {
    //         particles.splice(i, dryerFlag == true ? 1 : 1);
    //         if (rand > 0.1) {
    //             particles.push(new Particle());
    //         }
    //     }
    // }
    // if (particles.length < MAX_NUM && !dryerFlag) {
    //     if (rand > 0.96)
    //         particles.push(new Particle());
    //
    // }

}
