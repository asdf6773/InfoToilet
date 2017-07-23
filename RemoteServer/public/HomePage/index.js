function resizeHome() {
    ratioLogoBorder = 60;
    ratioWorkSpacing = mobile === true ? 120 : 200;;
    grid = new Grid(row, col, spacing);
    initCSS(mobile)
    logo.init();
    for (var i = 0; i < works.length; i++) {
        works[i].init();
    }
    for (var i = 0; i < others.length; i++) {
        others[i].init();
    }
    mask.size(window.innerWidth, window.innerHeight);
    if (unfolded) {
        collapse();
    } else {
        withdraw();
    }
}




function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    initApp();
    homePreload();
    homeSetup();
}
window.ondevicemotion = function(event) {
    accelerationX = event.accelerationIncludingGravity.x;
    accelerationY = event.accelerationIncludingGravity.y;
    accelerationZ = event.accelerationIncludingGravity.z;
    rX = event.rotationRate.alpha;
    rY = event.rotationRate.beta;
    rZ = event.rotationRate.gamma;
    rx = rX
    ry = rY
    rz = rZ
    ax = accelerationX;
    ay = accelerationY
    az = accelerationZ
}

function draw() {
  console.log(unfolded)
    loopApp();
    home();
}
