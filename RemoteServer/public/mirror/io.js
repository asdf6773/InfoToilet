var socket;


socket = io.connect('http://' + ip + '/handDryer')
socket.on('on', function() {
    console.log("handDryer on")
    dryerFlag = true;
});
socket.on('off', function() {
    dryerFlag = false;
});
