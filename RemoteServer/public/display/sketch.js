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

function setup() {
    imageMode(CENTER);
    noiseSeed = 0;
    createCanvas(600, 600);
    attractor = createVector(width / 2, height / 2);
    flush = createButton('flush');;
    flush.position(20, height + 20);
    flush.mousePressed(flushing);
    socket = io.connect('http://192.168.137.1:4000/projector')
    socketToLocal = io.connect('http://192.168.137.1:5000/')
    // socket = io.connect('http://127.0.0.1:4000/')
    // socketToLocal = io.connect('http://127.0.0.1:5000/');
    socket.on('uploadName', addImage);
    socket.on('flushOther', flushFromToilet);
    socketToLocal.on('flushFromToilet', flushFromOtherClient);
    socket.on('imageBuffer', loadBuffer);

}

function loadBuffer(buffer) {
    if (!bufferLoaded) {
        for (var i = 0; i < buffer.length; i++) {
            img.push(loadImage("http://192.168.137.1:4000/images/" + buffer[i]));
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
    var temp = loadImage("http://192.168.137.1:4000/images/" + data);
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
    if (img.length === 0) {
        attractForce = 0;
    }
    background(200);
    for (var i = 0; i < imgPos.length; i++) {
        var pos = imgPos[i].pos
        imgPos[i].update(attractForce);
        image(img[i], imgPos[i].pos.x, imgPos[i].pos.y, 200, 200);
        if (pos.x > 280 && pos.x < 320 && pos.y > 280 && pos.y < 320) {
            imgPos.splice(i);
            img.splice(i);
        }
    }
    // for (var i = 0; i < img.length; i++) {
    //     image(img[i], imgPos[i].pos.x, imgPos[i].pos.y, 200, 200);
    // }
    // console.log(attractForce)
    noiseSeed += 0.0001;
}
