var particles = [];
var socket;
var socketToLocal;
var img = [];
var img2;
var noiseSeed;
var particles = [];
var flush;
var attractForce = 0;
var imgPos = [];
var attractor;
var bufferLoaded = false;
var upload;
var hole;

function setup() {
    hole = 50;

    imageMode(CENTER);
    noiseSeed = 0;
    createCanvas(windowWidth, windowHeight - 80);
    attractor = createVector(width / 2, height / 2);
    flush = createButton('flush');;
    upload = createA('/', 'upload');
    flush.class('toiletButton');
    upload.class('toiletUpload');
    flush.style("font-size", "15px");
    upload.style("font-size", "15px");
    //upload.class("submit-label");
    flush.size(width / 2, 80)
    //  upload.class('toiletButton')
    upload.size(width / 2, 80)
    flush.position(0, height);
    upload.position(width / 2, height);
    flush.mousePressed(flushing);
    socket = io.connect('http://59.110.143.143:4000/projector')
    //    socketToLocal = io.connect('http://localhost:5000/')
    // socket = io.connect('http://127.0.0.1:4000/')
    // socketToLocal = io.connect('http://127.0.0.1:5000/');
    socket.on('uploadName', addImage);
    socket.on('flushOther', flushFromToilet);
    //  socketToLocal.on('flushFromToilet', flushFromOtherClient);
    socket.on('imageBuffer', loadBuffer);
    // var ipAdress = createP('WIFI: MonkeySauce  => localhost:4000').addClass('text');
    // ipAdress.position(20, height + 50)

}

function loadBuffer(buffer) {
    if (!bufferLoaded) {
        for (var i = 0; i < buffer.length; i++) {
            img.push(loadImage("./images/" + buffer[i]));
            imgPos.push(new Particle(attractor));
        }
        bufferLoaded = true;
    }
}

function flushFromOtherClient() {
    attractForce = 5;
    //  socket.emit('flushFromToilet', attractForce);
    console.log("flushFromOther");
}

function flushFromToilet(data) {
    attractForce = 5;
    socket.emit('flushFromToilet', attractForce);
    console.log(data);
}

function addImage(data) {
    var temp = loadImage("./images/" + data);
    console.log(data);
    imgPos.push(new Particle(attractor));
    img.push(temp);
    console.log("added");
}

function flushing() {
    attractForce = 5;
    // setTimeout(function(){
    //       attractForce =0;
    // },2000)
    socket.emit('flushFromMobile', attractForce);
    console.log('flush away~')
}

function draw() {
    if (attractForce != 0) {
        // imgPos[i].pos.z -= 0.1;
        attractor.z -= 0.05
        if (imgPos[0])
            console.log(imgPos[0].pos.z)
    }
    if (attractForce === 0) {
        // imgPos[i].pos.z -= 0.1;
        attractor.z -= 0;

    }
    if (img.length === 0) {
        attractForce = 0;
    }
    background(200);
    fill(0)
    ellipse(width / 2, height / 2, 50, 50);
    for (var i = 0; i < imgPos.length; i++) {
        var pos = imgPos[i].pos
        imgPos[i].update(attractForce);
        // if (attractForce != 0) {
        //     // imgPos[i].pos.z -= 0.1;
        //         attractor.y
        //     console.log(imgPos[i].pos.z)
        // }
        image(img[i], imgPos[i].pos.x, imgPos[i].pos.y, 200, 200);
        if (pos.x > width / 2 - hole / 2 && pos.x < width / 2 + hole / 2 && height / 2 - hole / 2 && height / 2 + hole / 2 && pos.z < -10) {
            imgPos.splice(i);
            img.splice(i);
        }
    }
    attractor.x = width / 2 + 200 * cos(noiseSeed)
    attractor.y = height / 2 + 200 * sin(noiseSeed)
    //  ellipse(attractor.x, attractor.y, 50, 50);
    // for (var i = 0; i < img.length; i++) {
    //     image(img[i], imgPos[i].pos.x, imgPos[i].pos.y, 200, 200);
    // }
    // console.log(attractForce)
    noiseSeed += 0.1;
}
