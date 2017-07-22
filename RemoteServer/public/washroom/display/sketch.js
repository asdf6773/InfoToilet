var particles = [];
var socket;
var socketToProjector;
var socketToLocal;
var img = [];
var img2;
var noiseSeed;
var particles = [];
var flush;
var attractForce = 0;
var imgPos = [];
var attractor;
var textBufferLoaded = false;
var bufferLoaded = false;
var upload;
var hole;
var bg, bg_pc;
var layer, layer_pc;
var waterHeight;
var rise, fall;
var matt;
var flag = true;
var addWater;
var angle = 0;
var imgAngle = 0;
var IAstep = 0;
var rising = 0;
var riseIndex = 0.5;
var fallActive = false;
var limit = 200000;
var IAstepForEase = 1;
var isFlushing;
var imageRandomBuffer;
var dropSound = [];
// var water = [];
var offset;
var xNoise;
var d = new Date();
var yNoise;
var mobile;
var ratio;
// var en; //noise parameter
document.oncontextmenu = function() {
    return false;
}
var waitForFlush = false;

function preload() {

    dropSound.push(loadSound('/washroom/lib/drop.wav'))
    dropSound.push(loadSound('/washroom/lib/drop2.mp3'))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true;
        ratio = window.innerWidth
    } else {
        mobile = false;
        ratio = 400
    }
}

function setup() {
    var hour = d.getHours()
    var minute = d.getMinutes()
    console.log(hour + ' ' + minute)
    offset = 0;
    matt = loadImage("http://" + ip + "/washroom/lib/matt.png")
    waterHeight = 1
    document.getElementById('back').href = 'http://' + ip + '/toilet';
    hole = 50;
    bg = loadImage("http://" + ip + "/washroom/lib/toilet-display.png")
    bg_pc = loadImage("http://" + ip + "/washroom/lib/bg_pc.png")
    layer = loadImage("http://" + ip + "/washroom/lib/toilet-layer.png")
    layer_pc = loadImage("http://" + ip + "/washroom/lib/layer_pc.png")
    imageMode(CENTER);
    noiseSeed = 0;
    createCanvas(windowWidth, windowHeight - 50);
    attractor = createVector(width / 2, 170); //
    flush = createButton('冲水');
    divide = createA('/', '');
    flush.class('toiletButton');
    flush.id('flush');
    flush.style("font-size", "15px");
    if (projector) {
        flush.style("display", "none");
        document.getElementById("back").style.display = "none";
    }
    flush.size(width, 80)
    flush.position(0, height - 30);
    flush.mousePressed(flushing);
    socket = io.connect('http://' + ip + '/projector')
    if (projector) {
        socketToProjector = io.connect('http://' + ip + '/projectorStatus')
    }
    socket.on('uploadName', addImage);
    socket.on('flushOther', flushFromToilet);
    socket.on('imageBuffer', loadImageBuffer);
    socket.on('flushByOther', flushByOther);
    socket.on('flushPressedFromServer', addWater);
    flush.touchStarted(flushPressed); //-----------------------------毕展后开放
    socket.on('flushFromConsole', flushPressed)
    socket.on('isFlushingSetup', function(status) {

        isFlushing = status; //test！！！！！！！！！！！！！！！！！！！！！！！！
        if (isFlushing) {
            flush.elt.innerHTML = "正在冲水"
            document.getElementById('flush').style.background = "#BDD9E0";
            document.getElementById('flush').style.color = "#AAAAAA";
        } else {
            if (isFlushing === false) {
                flush.elt.innerHTML = "冲水"
            }
            document.getElementById('flush').style.background = "#E0EEE7";
            document.getElementById('flush').style.color = "#527283";
        }
    });
    socket.on('limitFromServer', function(limitFromServer) {
        limit = limitFromServer;
    });
    socket.on('isFlushing', function(status) {

        isFlushing = status; //tese。。。。。。。。。。。。。。。。。。。。。。。。。。。。！！！！！！
        if (isFlushing) {
            flush.elt.innerHTML = "正在冲水"
            document.getElementById('flush').style.background = "#BDD9E0";
            document.getElementById('flush').style.color = "#AAAAAA";
        } else {
            flush.elt.innerHTML = "冲水"
            document.getElementById('flush').style.background = "#E0EEE7";
            document.getElementById('flush').style.color = "#527283";
        }
    });
    socket.on('imageScaleBuffer', function(imageScaleBuffer) {
        imageRandomBuffer = imageScaleBuffer;
        for (var i = 0; i < imageScaleBuffer.length; i++) {
            if (imgPos[i])
                imgPos[i].scale = imageRandomBuffer[i];
        }
    });
    socket.on("newText", function(key) {
        var num = floor(random(0, 2));
        var temp = loadImage("http://" + ip + "/washroom/lib/text/" + key + key + ".png");
        dropSound[num].setVolume(random(0.8, 1));
        dropSound[num].play();
        imgPos.push(new Particle(attractor));
        img.push(temp);
    })
    socket.on("Cfont", function(key) {
        var num = floor(random(0, 2));
        var temp = loadImage("http://" + ip + "/washroom/lib/text/" + key + ".png");
        dropSound[num].setVolume(random(0.3, 0.8));
        dropSound[num].play();
        imgPos.push(new Particle(attractor));
        img.push(temp);
    })
    socket.on("return", function(key) {
        var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var n = 5,
            s = "";
        for (var i = 0; i < n; i++) {
            var rand = Math.floor(Math.random() * str.length);
            s = str.charAt(rand);
        }
        var temp = loadImage("http://" + ip + "/washroom/lib/text/" + s + ".png");
        imgPos.push(new Particle(attractor));
        imgPos[imgPos.length - 1].pos = createVector(0, 0);
        img.push(temp);
    })
}

/*
var ratio = ratio;
translate(ratio / 2, ratio / 1.8);
if (projector) {
    translate(0, 20)
    scale(0.7);
} else {
    if (mobile) {
        ratio = ratio;
        translate(0, -30)
        scale(0.7);
    } else {
        ratio = 400
        translate(0, -ratio / 3)
        scale(ratio / 2500);
    }

    //------------------


    push();
var ratio = ratio
    translate(ratio / 2, ratio / 1.8);
    if (projector) {
        translate(0, 20)
        scale(0.7);
    } else {
        if (mobile) {
            translate(0, -30)
            scale(0.7);
        } else {
            translate(0, -ratio/3)
            scale(ratio/2500);
        }
    }
}*/

function draw() {
    xNoise = noise(offset);
    yNoise = noise(offset + 100);
    offset += 0.007;
    for (var i = 0; i < imgPos.length; i++) {}
    if (!projector) {
        background("#b8c3ca");
    } else {
        background(100);
    }
    if (attractForce != 0) {
        attractor.z -= 0.05
    }
    if (attractForce === 0) {
        attractor.z -= 0;
    }
    if (img.length === 0) {
        attractForce = 0;
    }
    //bg
    imageMode(CORNER)
    if (!projector) {
        if (mobile)
            image(bg, 0, -ratio / 5, ratio, ratio * 2 / 1.2);
        else {
            image(bg_pc, width / 2 - bg_pc.width / 1.2 / 2, 0, bg_pc.width / 1.2, bg_pc.height / 1.2);
        }
    }
    imageMode(CENTER)
    //------------bg

    if (angle > 3) {
        IAstep += 0.02;
        imgAngle += constrain(IAstep, 0, 0.8);
    }
    if (rising && riseIndex > 0) {

    } else if (fallActive && riseIndex > 0) {
        riseIndex -= 0.008;
    }

    for (var i = 0; i < imgPos.length; i++) {
        if (imgPos[i].pos)
            var pos = imgPos[i].pos
        if (imgPos[i].pos)
            imgPos[i].update(attractForce);

        push();
        if (!projector)
            if (mobile)
                translate(window.innerWidth / 2, window.innerWidth / 2.5);
            else {
                translate(0, ratio / 1.8);
                translate(window.innerWidth / 2, 50);
            }
        else {
            translate(window.innerWidth  / 2, ratio / 1.8);
        }

        if (imageRandomBuffer[i]) {
            if (imgPos[i].pos)
                imgPos[i].scale = (waterHeight / 400 + riseIndex) * imageRandomBuffer[i];
        } else {
            if (imgPos[i].pos)
                imgPos[i].scale = (waterHeight / 400 + riseIndex) * imgPos[i].scaleRandom;
        }
        if (imgPos[i].pos)
            rotate((imgAngle / 7 + imgPos[i].dir) * imgPos[i].speed / PI / 2);
        if (imgPos[i].pos)
            scale(imgPos[i].scale);
        if (imgPos[i].pos) {
            if (projector)
                image(img[i], imgPos[i].pos.x, imgPos[i].pos.y, img[i].width / (constrain(width, 0, 400) / 400), img[i].height / (constrain(width, 0, 400) / 400));
            else
                image(img[i], imgPos[i].pos.x, imgPos[i].pos.y, img[i].width / (constrain(width, 0, 400) / 200), img[i].height / (constrain(width, 0, 400) / 200));
        }
        pop();


    }
    //------------------water
    noStroke();
    fill(204, 230, 237, map(waterHeight, 10, 200, 50, 100))


    water();


    attractor.x = width / 2 + 200 * cos(noiseSeed)
    attractor.y = height / 2 + 200 * sin(noiseSeed)
    noiseSeed += 0.1;
    imageMode(CORNER);
    if (!projector) {
        if (mobile)
            image(layer, 0, -ratio / 5, ratio, ratio * 2 / 1.2);
        else {
            image(layer_pc, width / 2 - layer_pc.width / 1.2 / 2, 0, layer_pc.width / 1.2, layer_pc.height / 1.2);
        }
    }
    imageMode(CENTER)
    //---------------------
    fill(222);
    imgAngle += 0.005;
    if (waterHeight <= 0){
        rising = true;
        clearInterval(fall)
        clearInterval(rise)
        waterHeight = 0;
        angle = 0;
        if (riseIndex < 0.5) {
            riseIndex += 0.005177;
            if (IAstepForEase > 0.005) {
                IAstepForEase -= 0.01;
                imgAngle += IAstepForEase;
            } else
                imgAngle += 0.005;
        }
        flag = true;
        if (IAstep > 0) {
            IAstep -= 0.025;
        } else if (riseIndex >= 0.5) {
            waterHeight = 1
            socket.emit('flushOver', false)
        }
    }
    for (var i = 0; i < imgPos.length; i++) {
        if (imgPos[i].pos)
            if (imgPos[i].scale < 0.1 && limit > 0) {
                imgPos.splice(i, 1);
                img.splice(i, 1);
                socket.emit('imgFlushed', i);
                limit -= 1
            }

    }
    if (projector) {
        push()
        translate(width / 2, height / 2-300 )
        scale(-0.56);
        image(matt, 0, 0)
        pop()

    }
}

function keyTyped() {

    keyTriggered(key);

}

function addFont(key) {
    console.log(key)
    socket.emit("typed", key)
}

function addCFont(key) {
    console.log(key)
    socket.emit("Cfont", key)
}
