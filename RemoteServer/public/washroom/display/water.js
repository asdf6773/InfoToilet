var water = function() {
    push();

    translate(window.innerWidth / 2, ratio / 1.8);
    if (projector) {
        translate(0, 20)
        scale(0.7);
    } else {
        if (mobile) {
            translate(0, -30)
            scale(0.7);
        } else {
            translate(0,50)
            scale(0.7);
        }
    }
    rotate(angle)
    imageMode(CENTER)
    translate(0, -20)

    // image(water[Math.floor(waterCount)], 0, 0, Math.abs(waterHeight - 100) * 2 * riseIndex * ratio / 200, Math.abs(waterHeight - 100) * 2 * riseIndex * ratio / 200)
    ellipse(80, 40, waterHeight / 5 * ratio / 300, waterHeight / 5 * ratio / 250);
    ellipse(10, 10, waterHeight * ratio / 300, waterHeight * ratio / 250);
    ellipse(80, 140, waterHeight / 5 * ratio / 220, waterHeight / 5 * ratio / 220);
    ellipse(100, 10, waterHeight * ratio / 300, waterHeight * ratio / 250);
    rotate(1)
    ellipse(20, 10, waterHeight * ratio / 300, waterHeight * ratio / 250);
    rotate(2 + (waterHeight + 10) / 100)
    ellipse(20, 10, waterHeight / 1.11 * ratio / 300, waterHeight / 1.11 * ratio / 250);
    ellipse(60, 40, waterHeight / 5 * ratio / 300, waterHeight / 5 * ratio / 250);
    ellipse(100, 20, waterHeight / 5 * ratio / 300, waterHeight / 5 * ratio / 250);
    fill(204, 230, 237, map(waterHeight, 10, 200, 80, 150))
    // ellipse(0, 0, Math.abs(waterHeight - 100) * 2 * riseIndex * ratio / 200, Math.abs(waterHeight - 100) * 2 * riseIndex * ratio / 160);
    push()

    scale(Math.abs(waterHeight - 100) * 2 * riseIndex / 100);
    // translate(0,20)
    fill(204, 230, 237, map(waterHeight, 10, 200, 50, 100) / 2)
    if (projector) {
        ellipse(0 + xNoise * 20, -88 + yNoise * 20, ratio / (2.1), ratio / (1.95));
        ellipse(0 - xNoise * 20, -100 + yNoise * 10, ratio / (2), ratio / (1.85));
        ellipse(10 + yNoise * 20, -90 + xNoise * 20, ratio / (2), ratio / (1.85));
        ellipse(20 + xNoise * 20, -118 + yNoise * 20 + xNoise * 20, ratio / (2.1), ratio / (1.95));
        ellipse(0 + yNoise * 20, -128 + xNoise * 20, ratio / (2.1), ratio / (1.95));
    } else {
        ellipse(5, -55, ratio / (1.6), ratio / (1.5));
        ellipse(0, -50, ratio / (1.6), ratio / (1.5));
        ellipse(15, -55, ratio / (1.4), ratio / (1.3));
        ellipse(0, -60, ratio / (1.6), ratio / (1.5));
    }
    pop()
    pop();
}


function addWater() {

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

        rise = setInterval(function() {
            if (waterHeight < 200) {

                angle += (20 / (waterHeight + 10) + 0.144)
                waterHeight += (200 - waterHeight) / 10;
            }
            if (waterHeight >= 200 - 1) {

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

    }
    fallActive = true;
    clearInterval(rise)
    fall = setInterval(function() {
        if (waterHeight >= 0) {

            angle += (20 / (waterHeight + 10) + 0.144)
            waterHeight -= (200 - waterHeight) / 5;
        }
    }, 1000 / 25)
}


function flushPressed(i) {
    waitForFlush = true;
    socket.emit("flushPressed")
    if (waitForFlush) {
        addWater()
    }
    addWater();
}

function flushByOther(i) {
    img.splice(i, 1)
    imgPos.splice(i, 1)
}


function animate() {}
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
    }
}

function flushFromOtherClient() {
    animate()
}

function flushFromToilet(data) {
    animate()
    socket.emit('flushFromToilet', attractForce);

}

function addImage(data) {
    var temp = loadImage("http://" + ip + "/washroom/Images/" + data);
    dropSound[1].setVolume(0.8);
    dropSound[1].play();
    imgPos.push(new Particle(attractor));
    img.push(temp);

}

function flushing() {
    animate()
}
angl = 0;
