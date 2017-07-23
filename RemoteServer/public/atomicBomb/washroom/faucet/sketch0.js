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
document.getElementById('back').href = 'http://' + ip + '/graduateProject';

function setup() {
    ellipseMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    noStroke();
    socket = io.connect('http://' + ip + '/faucet')
    console.log(windowWidth)
    socket.on('weiboData', handleData)
}
var num = 0;

function flow(num) {
    $("#box").append("<p class='split' id='test" + String(num) + "'></p>");
    if (json.statuses[num])
        $("#test" + String(num)).html(json.statuses[num].text.replace(/http+.+/ , ''))
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
            x: random(-20, 20),
            y: random(800, 820),
            z: random(-0, 20),
            scale: .5,
            delay: 0,
            yoyo: true,
            repeatDelay: 10
        });
    });
    num += 1
    if (num < 10) {
        setTimeout(flow, 1000, num)
        num += 1
    }
}

function handleData(obj) {
    for (var i = 0; i < obj.statuses.length; i++) {
        if (obj.statuses[i]) {
            console.log(obj.statuses[i].text)
            content.push(obj.statuses[i].text.replace(/http+.+/ , ''))
            // console.log(obj.statuses[i].text.replace(/http+.+/ , ''));
        }
    }
    json = obj;

    flow(num)
}
window.ondevicemotion = function(event) {
    for (var i = 0; i < particles.length; i++) {
        particles[i].acc.x = event.accelerationIncludingGravity.x;
        particles[i].acc.y = event.accelerationIncludingGravity.y;
    }
    accelerationX = event.accelerationIncludingGravity.x;
    accelerationY = event.accelerationIncludingGravity.y;
    accelerationZ = event.accelerationIncludingGravity.z;
    rX = event.rotationRate.alpha;
    rY = event.rotationRate.beta;
    rZ = event.rotationRate.gamma;
}
var myP
var pos = 25;

function draw() {
    background(255)
    fill(0, 100)
    for (var i = 0; i < 10; i++) {
        if (content[i]) {
            for (var j = 0; j < content[i].length; j++) {
                if (content[i].charAt[j])
                    text(content[i].charAt[j], j * 10, i * 20, 0, width)
            }
        }
    }
    ellipse(width / 2, height / 2, 20, 20)

}
