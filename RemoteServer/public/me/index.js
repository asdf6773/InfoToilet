var a, I, c;
var canvas;
var img;
var ship;
var shark;
var aaa;
var depth

function setup() {
    // a = loadModel('./me/me/lib/a.obj', true)
    // I = loadModel('./me/me/lib/I.obj', true)
    // ship = loadModel('./me/me/lib/ship.obj', true)
    // c = loadModel('./me/me/lib/c.obj', true)
    // shark= loadModel('./me/me/lib/shark.obj', true)
    a = loadModel('./me/lib/a.obj', true)
    I = loadModel('./me/lib/I.obj', true)
    ship = loadModel('./me/lib/ship.obj', true)
    c = loadModel('./me/lib/c.obj', true)
    shark = loadModel('./me/lib/shark.obj', true)
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL)
    canvas.id("bg")
    $("#bg").css("position", "fixed")
    $("#bg").css("top", 0+"px")
    $("#bg").css("z-index", "-10")
    // img= loadImage("/washroom/me/lib/dryer.png");
    noStroke();
    aaa = 0;
}


function draw() {
    depth = Math.floor($(document).scrollTop() * 1.1 + 2000)
    // console.log($(document).scrollTop());
    $("#obj").css("top", $(document).scrollTop())
    // $("#test").css("height", depth)
    $("#depth").html(Math.floor((depth - 2000) / 100))
    camera(0, 0, 200);
    ambientLight(210)
    directionalLight(80, 80, 120, 0, 1, 0);
        directionalLight(60, 60, 50, -1, -1, -1);
    // orbitControl();
    // img(0,0,100,2)
    // fill(50,200,50,150)
    ambientMaterial(255);
    // background(80-80/depth,80-80/depth,255-255/depth);
    // background
    // background(220, 235, 245)
    aaa += 1
    //--------------------aaaaaaaaaaaaa
    push()
    translate(width/2, -($(document).scrollTop()*1.1- 400), 0)
    rotateX(map(-($(document).scrollTop() - 800), 0, 200, 0, TWO_PI/7))
    rotateZ(map(-($(document).scrollTop() - 800), 0, 200, 0, PI/4))
            scale(1.5)
  ambientMaterial(255,240,240);
    model(a);
    pop()
    //-------------------------iiiiiiiiii
    push()
      translate(-width/2, -($(document).scrollTop()*1.1 - 700), 0)

    rotateX(map(-($(document).scrollTop()/10 - 800), 0, 200, 0, TWO_PI / 6))
    rotateY(map(-($(document).scrollTop()/10 - 800), 0, 200, 0, PI))
        scale(2.5)
            ambientMaterial(255);
    model(I);
    pop()
    //-------------------------cccccccccccccccccc
    push()
    translate(-width/2, -($(document).scrollTop() - 0)*1.1, 0)
    rotateX(map(-($(document).scrollTop() - 800), 0, 200, 0, TWO_PI / 6)+PI/4)
    rotateY(map(-($(document).scrollTop() - 800), 0, 200, 0, PI / 3))
    scale(2)
    ambientMaterial(255);
    model(c);
    pop()




    push()
    translate(-100, -($(document).scrollTop() - 1200), 0)
    rotateY(map(-($(document).scrollTop() - 800), 0, 200, 0, PI / 10))
    scale(4)
    model(ship);
    pop()
    push()
    translate(($(document).scrollTop() - 2800), -($(document).scrollTop() - 2800), -1000)
    // rotateY(map(-($(document).scrollTop() - 800), 0, 200, 0, PI / 10))
    rotateY(PI / 2)
    scale(4)
    // ambientMaterial(144, 144, 155);
    model(shark);
    pop()

}







//-----------------------ocean

//
// push()
// translate(-100, -($(document).scrollTop())-100, 0)
// // rotateZ(PI/4)
// rotateX(map(-($(document).scrollTop()/10 - 800), 0, 200, 0, TWO_PI))
// rotateY(map(-($(document).scrollTop()/10 - 800), 0, 200, 0, PI))
// model(a);
// pop()
//
// push()
//
// translate(10, -($(document).scrollTop()), 0)
// // rotateX(map(-($(document).scrollTop() - 800), 0, 200, 0, TWO_PI / 6))
// // rotateY(map(-($(document).scrollTop() - 800), 0, 200, 0, PI))
//     scale(1.5)
// model(I);
// pop()
//
// push()
// translate(100, -($(document).scrollTop())+100, 0)
// // rotateX(map(-($(document).scrollTop() - 800), 0, 200, 0, TWO_PI / 6))
// // rotateY(map(-($(document).scrollTop() - 800), 0, 200, 0, PI / 10))
//     scale(0.7)
// model(c);
// pop()
// push()
// model(c);
