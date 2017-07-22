var capture;
var mirror;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    capture = createCapture(VIDEO);
    capture.style("display", "none")
    mirror = loadImage("/washroom/lib/mirror_pc.png")
    imageMode(CENTER)
    // mirrorSetup()
}

function draw() {
    // background(0);
    image(capture, width / 2, height / 2, width / 2, width * capture.height / capture.width / 2);
    // filter(INVERT);
    // console.log(mirror.width + " " + mirror.height)
    // image(mirror, width / 2, 110, mirror.width * 2, mirror.height * 2)
    // mirrorLoop()
}
