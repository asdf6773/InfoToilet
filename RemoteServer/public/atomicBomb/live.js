// video = createVideo(["/atomicBomb/lib/video.mov"])
// video.size(200, 200)
// video.id ("video")
// $("#video").attr("playsinline")
// button = createButton('play');
// button.mousePressed(toggleVid);
var socket;
var video;
var button;
var mobile;

function toggleVid() {
    video.loop();
}

function setup() {
      createCanvas(window.innerWidth, window.innerHeight);
  qr = createImg('/atomicBomb/lib/qr_atom.png', "qr");
  qr.style("opacity", "0.6")
  qr.id("qr")
  var qrSize = {
      width: width / 10,
      height: width / 10
  }
  qr.size(qrSize.width, qrSize.height)

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true;

    } else {
        mobile = false;

    }
    if (!mobile) {
        socket = io.connect('http://' + ip + '/Button')
        imageMode(CENTER)

        video = createVideo(["/atomicBomb/lib/video.mov"])
        socket.on("boom", function(init) {
            toggleVid()
            console.log("boom!!")
        })
        video.style("display", "none")
    }
}

function draw() {
    textAlign(CENTER);
    background(255);
    if (mobile) {
        text("将此页发送至电脑端显示", width / 2, height / 2)
    } else {

        image(video, width / 2, height / 2, video.width, video.height)
        // text("将此页发送至电脑端显示", width / 2, height / 2)
    }

}
