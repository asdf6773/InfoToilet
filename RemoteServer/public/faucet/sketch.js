var particles = [];
var accelerationX = 0;
var accelerationY = 0;
var accelerationZ = 0;
var rX = 0;
var rY = 0;
var rZ = 0;
var waitForFlush = false;
var acc = document.getElementById("acc");
var socket;
var json;
var content = [];
var Y_AXIS = 1;
var X_AXIS = 2;
document.getElementById('back').href = 'http://' + ip + '/graduateProject';
var times = 0;
var num;

function setup() {

    num = 0;
    $(".box p div div div").css("width", "40px")
    //BG
    b2 = color(214, 227, 233);
    b1 = color(222);
    ellipseMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    noStroke();
    socket = io.connect('http://' + ip + '/faucet')
    console.log(windowWidth)
    socket.on('weiboData', handleData)

    // button = createButton('test');
    // button.position(width - 50, 19);
    // button.mouseReleased(function() {
    //     socket.emit('test')
    // });
}




function flow() {
    $("#box").append("<p class='split' id='test" + String(num) + "'></p>");
    if (content[num])
        $("#test" + String(num)).html(content[num].replace(/http+.+/, ''))
    var text = $("#test" + String(num));
    //
    var split = new SplitText(text);
    //
    function random(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    $(split.chars).each(function(i) {
        TweenMax.to($(this), 30, {
            opacity: 0,
            x: random(-40, 40),
            y: random(800, 850),
            z: random(-0, 20),
            scale: .5,
            delay: 0,
            yoyo: true,
            repeatDelay: 10
        });
    });



    // console.log($p)
    // num += 1
    if (num < 10 * times) {
        setTimeout(flow, 1000)
        num += 1
    }

}
var a = new Array;
var i = 0;

function handleData(obj) {
    // num+=10;
    for (var i = 0; i < obj.statuses.length; i++) {
        if (obj.statuses[i]) {
            // console.log(obj.statuses[i].text)
            content.push(obj.statuses[i].text.replace(/http+.+/, ''))
            // console.log(obj.statuses[i].text.replace(/http+.+/ , ''));
        }
    }
    json = obj;
    times += 1;

    flow()
}
// window.ondevicemotion = function(event) {
//     for (var i = 0; i < particles.length; i++) {
//         particles[i].acc.x = event.accelerationIncludingGravity.x;
//         particles[i].acc.y = event.accelerationIncludingGravity.y;
//     }
//     accelerationX = event.accelerationIncludingGravity.x;
//     accelerationY = event.accelerationIncludingGravity.y;
//     accelerationZ = event.accelerationIncludingGravity.z;
//     rX = event.rotationRate.alpha;
//     rY = event.rotationRate.beta;
//     rZ = event.rotationRate.gamma;
// }
var myP
var pos = 25;
var $p
var threshold = 0.1;

function draw() {
    $p = $('div')
    console.log($p.length)
    if ($p.length > 700) {
        threshold = $p.length / 1500
    } else {
        threshold = 0.2;
    }
    $p.each(
        function() {
            if ($(this).css("opacity") <= threshold) {
                $(this).remove();
                // console.log("remove")
            }
            // console.log($(this).css("opacity"))
        }
    );
    // print(num + " " + content.length + " " + times)
    background(255)
    setGradient(0, 0, width, height, b1, b2, Y_AXIS);
    fill(0, 100)
    // for (var i = 0; i < 10; i++) {
    //     if (content[i]) {
    //         for (var j = 0; j < content[i].length; j++) {
    //             if (content[i].charAt[j])
    //                 text(content[i].charAt[j], j * 10, i * 20, 0, width)
    //         }
    //     }
    // }
    // ellipse(width / 2, height / 2, 20, 20)

}

function setGradient(x, y, w, h, c1, c2, axis) {

    noFill();

    if (axis == Y_AXIS) { // Top to bottom gradient
        for (var i = y; i <= y + h; i++) {
            var inter = map(i, y, y + h, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis == X_AXIS) { // Left to right gradient
        for (var i = x; i <= x + w; i++) {
            var inter = map(i, x, x + w, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}
