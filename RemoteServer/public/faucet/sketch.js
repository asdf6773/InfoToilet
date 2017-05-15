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

document.getElementById('back').href = 'http://' + ip + '/graduateProject';

function setup() {
    ellipseMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    noStroke();
    socket = io.connect('http://' + ip + '/faucet')
    // blendMode(BLEND);
    console.log(windowWidth)
    socket.on('weiboData', handleData)
    // for (var i = 0; i < 100; i++) {
    //
    // }

}
var num = 0;

function flow(num) {
    $("#box").append("<p class='split' id='test" + String(num) + "'></p>");
    if (json.statuses[num])
        $("#test" + String(num)).html(json.statuses[num].text)
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
    for (var i = 0; i < 10; i++)
        if (obj.statuses[i])
            console.log(obj.statuses[i].text)
    json = obj;
    for (var i = 0; i < 1; i++) {

    } //json.statuses[0].text
    flow(num)
    // var text = $(".split");
    // //
    // var split = new SplitText(text);
    // //
    // function random(min, max) {
    //     return (Math.random() * (max - min)) + min;
    // }
    //
    // $(split.chars).each(function(i) {
    //     TweenMax.to($(this), 10, {
    //         opacity: 0,
    //         x: random(-100, 100),
    //         y: random(400, 450),
    //         z: random(-0, 200),
    //         scale: .5,
    //         delay: 0,
    //         yoyo: true,
    //         // repeat: -1,
    //         repeatDelay: 10
    //     });
    // });

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
    fill(0, 102, 153);
    if (json) {
        // $("svg g text:eq(" + 0 + ")").attr("transform", "translate(0," + (pos++) + ")")
        // text(json.statuses[0].text, 10, 10, 70, 80);


        // $("#text").children('g:text').get(0).attr("transform"))
        // $("#text>g>text")[0].style.transform="translate(0,"+100+")"
        // text(json.statuses[0].text, 10, 10, 70, 80);
    }
    // acc.getElementsByTagName("li")[0].innerHTML = "X: " + Math.round(accelerationX * 100);
    // acc.getElementsByTagName("li")[1].innerHTML = "Y: " + Math.round(accelerationY * 100);
    // acc.getElementsByTagName("li")[2].innerHTML = "Z: " + Math.round(accelerationZ * 100);
    // acc.getElementsByTagName("li")[3].innerHTML = "rX: " + Math.round(rX);
    // acc.getElementsByTagName("li")[4].innerHTML = "rY: " + Math.round(rY);
    // acc.getElementsByTagName("li")[5].innerHTML = "rZ: " + Math.round(rZ);
    fill(255, 100)
    rect(0, 0, width, height);
    // background(255);
    if (particles.length < 200) {
        particles.push(new Particle())
        particles.push(new Particle())

    }
    if (particles.length > 200) {
        particles.splice(200, 1);

    }
    // for (var i = 0; i < particles.length; i++) {
    //
    //     particles[i].update()
    //     if (particles[i].lifespan <= 0 || particles[i].pos.x <= -100 || particles[i].pos.x >= width + 100 || particles[i].pos.y >= height + 100 || particles[i].pos.y < -100) {
    //         particles.splice(i, 1);
    //     }
    //
    // }

    // console.log(particles.length)
}
