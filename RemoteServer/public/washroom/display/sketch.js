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
var bg;
var layer;
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
// var en; //noise parameter
document.oncontextmenu = function() {
    return false;
}
var waitForFlush = false;

function preload() {
    dropSound.push(loadSound('/washroom/lib/drop.wav'))
    dropSound.push(loadSound('/washroom/lib/drop2.mp3'))


    // for (var i = 0; i < 16; i++) {
    //     if (i >= 10)
    //         water.push(loadImage('/washroom/lib/water/water_anim_00' + i + '_0.png'))
    //     else
    //         water.push(loadImage('/washroom/lib/water/water_anim_000' + i + '_0.png'))
    // }
}

function setup() {
    var hour = d.getHours()
    var minute = d.getMinutes()
    console.log(hour + ' ' + minute)
    offset = 0;
    // mySound.setVolume(0.5);
    matt = loadImage("http://" + ip + "/washroom/lib/matt.png")
    waterHeight = 1
    document.getElementById('back').href = 'http://' + ip + '/toilet';
    hole = 50;
    bg = loadImage("http://" + ip + "/washroom/lib/toilet-display.png")
    layer = loadImage("http://" + ip + "/washroom/lib/toilet-layer.png")
    imageMode(CENTER);
    noiseSeed = 0;
    createCanvas(windowWidth, windowHeight - 50);
    attractor = createVector(width / 2, 170); //
    flush = createButton('冲水');
    // upload = createA('/', '丢入');
    divide = createA('/', '');
    flush.class('toiletButton');
    flush.id('flush');
    // upload.class('toiletUpload');
    flush.style("font-size", "15px");
    if (projector) {
        flush.style("display", "none");
        document.getElementById("back").style.display = "none";
    }
    // upload.style("font-size", "15px");
    //upload.class("submit-label");
    flush.size(width, 80)
    //  upload.class('toiletButton')
    // upload.size(width / 2, 80)
    flush.position(0, height - 30);
    //   divide.class('divide');
    // divide.size(1, 80)
    // divide.position(width / 2, height - 30);
    // upload.position(width / 2, height - 30);
    flush.mousePressed(flushing);
    //  socket = io.connect('http://59.110.143.143:4000/projector')
    socket = io.connect('http://' + ip + '/projector')
    if (projector) {
        socketToProjector = io.connect('http://' + ip + '/projectorStatus')
    }
    // socketToLocal = io.connect('http://'+ipAddress+':5000/')
    // socket = io.connect('http://127.0.0.1:4000/')
    // socketToLocal = io.connect('http://127.0.0.1:5000/');
    socket.on('uploadName', addImage);
    socket.on('flushOther', flushFromToilet);
    //  socketToLocal.on('flushFromToilet', flushFromOtherClient);
    socket.on('imageBuffer', loadImageBuffer);
    // socket.on('TextBuffer', loadTextBuffer);
    socket.on('flushByOther', flushByOther);
    socket.on('flushPressedFromServer', addWater);
    //socket.on('flushPressd', addWater);
    //flush.touchStarted(addWater);
    //  if (isFlushing===false) {
    // if (hour >= 17 || hour <= 9) {
        // if (minute >= 45) {
        flush.touchStarted(flushPressed); //-----------------------------毕展后开放
        // }
    // }
    socket.on('flushFromConsole', flushPressed)
    //  }
    socket.on('isFlushingSetup', function(status) {
        // console.log("Origial " + status)

        isFlushing = status; //test！！！！！！！！！！！！！！！！！！！！！！！！
        if (isFlushing) {
            flush.elt.innerHTML = "正在冲水"
            document.getElementById('flush').style.background = "#BDD9E0";
            document.getElementById('flush').style.color = "#AAAAAA";
        } else {
             if (isFlushing===false) {
            // if (hour >= 17 || hour <= 9) {
                // if (minute >= 45) {
                flush.elt.innerHTML = "冲水"
                // }
            // } else {
                // flush.elt.innerHTML = "闭馆后开放在线冲水"
            }
            document.getElementById('flush').style.background = "#E0EEE7";
            document.getElementById('flush').style.color = "#527283";
        }
        //    if(!isFlushing)addWater();
    });
    socket.on('limitFromServer', function(limitFromServer) {
        limit = limitFromServer;
        // console.log(limit)
    });
    socket.on('isFlushing', function(status) {

        isFlushing = status; //tese。。。。。。。。。。。。。。。。。。。。。。。。。。。。！！！！！！
        if (isFlushing) {
            flush.elt.innerHTML = "正在冲水"
            document.getElementById('flush').style.background = "#BDD9E0";
            document.getElementById('flush').style.color = "#AAAAAA";
        } else {
            // if (hour >= 17 || hour <= 9) {
                // if (minute >= 45) {
                flush.elt.innerHTML = "冲水"
                // }
            // } else {
                // flush.elt.innerHTML = "闭馆后开放在线冲水"
            // }
            document.getElementById('flush').style.background = "#E0EEE7";
            document.getElementById('flush').style.color = "#527283";
        }
        //    if(!isFlushing)addWater();
    });
    socket.on('imageScaleBuffer', function(imageScaleBuffer) {
        imageRandomBuffer = imageScaleBuffer;
        for (var i = 0; i < imageScaleBuffer.length; i++) {
            // console.log('triggered?')
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
        // imgPos[imgPos.length - 1].pos = createVector(0,0);
        img.push(temp);
    })
    //    flush.touchEnded(recover);
}

function flushPressed(i) {
    waitForFlush = true;
    // if (isFlushing === false) { //然后新用户就无法按了
    socket.emit("flushPressed")

    // }

    if (waitForFlush) {
        addWater()
    }
    addWater();
}

function flushByOther(i) {
    img.splice(i, 1)
    imgPos.splice(i, 1)
}


function animate() {
    //  waterHeight += 1;
    //flag = !flag;
    //    attractForce = 5;
}
// function loadTextBuffer(buffer) {
//     if (!textBufferLoaded) {
//         for (var i = 0; i < buffer.length; i++) {
//             img.push(loadImage("http://" + ip + "/lib/text/A.png"));
//             imgPos.push(new Particle(attractor));
//         }
//         textBufferLoaded = true;
//
//     } else {
//         img.splice(0, img.length);
//         imgPos.splice(0, imgPos.length);
//         for (var i = 0; i < buffer.length; i++) {
//             img.push(loadImage("http://" + ip + "/lib/text/A.png"));
//             imgPos.push(new Particle(attractor));
//         }
//     }
// }

function loadImageBuffer(buffer) {

    if (!bufferLoaded) {
        for (var i = 0; i < buffer.length; i++) {
            img.push(loadImage("http://" + ip + "/washroom/Images/" + buffer[i]));
            imgPos.push(new Particle(attractor));
        }
        bufferLoaded = true;

    } else {
        console.log("loadbuffer")
        img.splice(0, img.length);
        var cachePos = [];
        var cacheDes = [];
        var cacheDir = [];
        var cacheSpd = [];
        var cacheScl = [];
        for (var i = 0; i < imgPos.length; i++) {
            if (imgPos[i])
                cachePos.push(imgPos[i].pos);
            if (imgPos[i])
                cacheDes.push(imgPos[i].des);
            if (imgPos[i])
                cacheDir.push(imgPos[i].dir);
            if (imgPos[i])
                cacheSpd.push(imgPos[i].speed);
            if (imgPos[i])
                cacheScl.push(imgPos[i].scaleRandom);
        }
        imgPos.splice(0, imgPos.length);
        for (var i = 0; i < buffer.length; i++) {
            img.push(loadImage("http://" + ip + "/washroom/Images/" + buffer[i]));
            imgPos.push(new Particle(attractor));
            if (imgPos[i])
                imgPos[i].pos = cachePos[i];
            if (imgPos[i])
                imgPos[i].des = cacheDes[i];
            if (imgPos[i])
                imgPos[i].dir = cacheDir[i];
            if (imgPos[i])
                imgPos[i].speed = cacheSpd[i];
            if (imgPos[i])
                imgPos[i].scaleRandom = cacheScl[i];
        }
        // for (var i = 0; i < imgPos.length; i++) {
        //
        //     // cachePos.push(imgPos[i].pos);
        // }
    }
}

function flushFromOtherClient() {
    animate()
    //  socket.emit('flushFromToilet', attractForce);

}

function flushFromToilet(data) {
    animate()
    socket.emit('flushFromToilet', attractForce);

}

function addImage(data) {
    // console.log("addImage")
    var temp = loadImage("http://" + ip + "/washroom/Images/" + data);
    dropSound[1].setVolume(0.8);
    dropSound[1].play();
    imgPos.push(new Particle(attractor));
    img.push(temp);

}

function flushing() {
    animate()
    // socket.emit('flushFromMobile', attractForce); ///////////////////////////////remind
}
angl = 0;

function draw() {
    xNoise = noise(offset);
    yNoise = noise(offset + 100);
    offset += 0.007;
    // if (imgPos[0])
    //     console.log(imgAngle)
    for (var i = 0; i < imgPos.length; i++) {}
    if (!projector) {
        background(255);
    } else {
        background(0);
    }
    // fill()
    // rect(0,0,width,height)
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
    if (!projector)
        image(bg, 0, -window.innerWidth / 5, window.innerWidth, window.innerWidth * 2 / 1.2);
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
            //draw Image
            var pos = imgPos[i].pos
        if (imgPos[i].pos)
            imgPos[i].update(attractForce);

        push();
        if (!projector)
            translate(window.innerWidth / 2, window.innerWidth / 2.5);
        else {
            translate(window.innerWidth / 2, window.innerWidth / 1.8);
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
    push();

    translate(window.innerWidth / 2, window.innerWidth / 1.8);
    if (projector) {
        translate(0, 20)
        //  push()
        // //  image(matt,0,0)
        //  pop()
        scale(0.7);
    } else {
        translate(0, -30)
        //  push()
        // //  image(matt,0,0)
        //  pop()
        scale(0.7);
    }
    rotate(angle)
    imageMode(CENTER)
    translate(0, -20)

    // image(water[Math.floor(waterCount)], 0, 0, Math.abs(waterHeight - 100) * 2 * riseIndex * window.innerWidth / 200, Math.abs(waterHeight - 100) * 2 * riseIndex * window.innerWidth / 200)
    ellipse(80, 40, waterHeight / 5 * window.innerWidth / 300, waterHeight / 5 * window.innerWidth / 250);
    ellipse(10, 10, waterHeight * window.innerWidth / 300, waterHeight * window.innerWidth / 250);
    ellipse(80, 140, waterHeight / 5 * window.innerWidth / 220, waterHeight / 5 * window.innerWidth / 220);
    ellipse(100, 10, waterHeight * window.innerWidth / 300, waterHeight * window.innerWidth / 250);
    rotate(1)
    ellipse(20, 10, waterHeight * window.innerWidth / 300, waterHeight * window.innerWidth / 250);
    rotate(2 + (waterHeight + 10) / 100)
    ellipse(20, 10, waterHeight / 1.11 * window.innerWidth / 300, waterHeight / 1.11 * window.innerWidth / 250);
    ellipse(60, 40, waterHeight / 5 * window.innerWidth / 300, waterHeight / 5 * window.innerWidth / 250);
    ellipse(100, 20, waterHeight / 5 * window.innerWidth / 300, waterHeight / 5 * window.innerWidth / 250);
    fill(204, 230, 237, map(waterHeight, 10, 200, 80, 150))
    // ellipse(0, 0, Math.abs(waterHeight - 100) * 2 * riseIndex * window.innerWidth / 200, Math.abs(waterHeight - 100) * 2 * riseIndex * window.innerWidth / 160);
    push()

    scale(Math.abs(waterHeight - 100) * 2 * riseIndex / 100);
    // translate(0,20)
    fill(204, 230, 237, map(waterHeight, 10, 200, 50, 100) / 2)
    if (projector) {
        ellipse(0 + xNoise * 20, -88 + yNoise * 20, window.innerWidth / (2.1), window.innerWidth / (1.95));
        ellipse(0 - xNoise * 20, -100 + yNoise * 10, window.innerWidth / (2), window.innerWidth / (1.85));
        ellipse(10 + yNoise * 20, -90 + xNoise * 20, window.innerWidth / (2), window.innerWidth / (1.85));
        ellipse(20 + xNoise * 20, -118 + yNoise * 20 + xNoise * 20, window.innerWidth / (2.1), window.innerWidth / (1.95));
        ellipse(0 + yNoise * 20, -128 + xNoise * 20, window.innerWidth / (2.1), window.innerWidth / (1.95));
    } else {
        ellipse(5, -55, window.innerWidth / (1.6), window.innerWidth / (1.5));
        ellipse(0, -50, window.innerWidth / (1.6), window.innerWidth / (1.5));
        ellipse(15, -55, window.innerWidth / (1.4), window.innerWidth / (1.3));
        ellipse(0, -60, window.innerWidth / (1.6), window.innerWidth / (1.5));
    }
    pop()
    pop();

    attractor.x = width / 2 + 200 * cos(noiseSeed)
    attractor.y = height / 2 + 200 * sin(noiseSeed)
    noiseSeed += 0.1;


    // if (imgPos[2])
    //     console.log(imgPos[2].scale + " " + imgPos[2].scaleRandom)
    //upper background
    imageMode(CORNER);
    if (!projector) {
        image(layer, 0, -window.innerWidth / 5, window.innerWidth, window.innerWidth * 2 / 1.2);
    }
    imageMode(CENTER)
    //---------------------
    fill(222);
    imgAngle += 0.005;
    if (waterHeight <= 0) {
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
    // text(key, 33,65);
    //  console.log(flush)



    if (projector) {
        //
        push()
        // rotate()
        translate(width / 2, height / 2 - 150)
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

function addWater() {
    // if ((!isFlushing)||(waitForFlush&&(!isFlushing))) {
    riseIndex = 0.5;

    waitForFlush = false;
    fallActive = false;
    waterHeight = 1
    angle = 0;
    IAstep = 0;
    // flag=true;
    rising = true;
    flush.elt.innerHTML = "正在冲水"
    if (flag) {
        flag = false;
        rising = true;
        //    console.log(document.getElementById(flush))
        rise = setInterval(function() {
            if (waterHeight < 200) {
                //console.log("addWater")
                angle += (20 / (waterHeight + 10) + 0.144)
                waterHeight += (200 - waterHeight) / 10;
            }
            if (waterHeight >= 200 - 1) {
                //console.log("recover")
                recover();
            }
        }, 1000 / 25)
        clearInterval(fall)
    }
    // }
}

function recover() {
    IAstepForEase = 1;
    if (waterHeight > 170) {
        rising = false;
        // console.log("rising altered")
    }
    fallActive = true;
    clearInterval(rise)
    fall = setInterval(function() {
        if (waterHeight >= 0) {

            angle += (20 / (waterHeight + 10) + 0.144)
            waterHeight -= (200 - waterHeight) / 5;
        }
    }, 1000 / 25)
    //document.getElementById('flush').style.background = "#E0EEE7";
}
