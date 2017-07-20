var a, I, c;
var canvas;
var img;
function setup() {
    a = loadModel('./me/lib/a.obj', true)
    I = loadModel('./me/lib/I.obj', true)
    c = loadModel('./me/lib/c.obj', true)
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL)
    canvas.id("bg")
    // img= loadImage("/washroom/lib/dryer.png");
}


function draw() {
    camera(0, 0, 200);
    // orbitControl();
// img(0,0,100,2)
    translate(100, 0, 0)
    model(a);
    translate(100, -100, 0)
    model(I);
    translate(-100, -100, -1000)
    model(c);
}
