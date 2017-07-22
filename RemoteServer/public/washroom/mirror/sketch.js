function setup() {
    createCanvas(windowWidth, windowHeight);
    mirrorSetup()
}



function changeStatus() {
    dryerFlag = !dryerFlag;
    console.log(dryerFlag)
}


function keyPressed() {
    socket.emit("restart")
}

function draw() {
    background(0);
    mirrorLoop()
}
