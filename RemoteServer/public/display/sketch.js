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
    socket.on('flushAll', flushFromToilet);
    socketToLocal.on('flush', flushFromToilet);
    //socket.emit('flushFromMobile', attractForce)
}

function flushFromToilet(data) {
   attractForce = 5;
    console.log(data)
}

function addImage(data) {
    var temp = loadImage("/images/" + data);
    console.log(data);
    imgPos.push(new Particle(attractor));
    img.push(temp);
    console.log(added);
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
