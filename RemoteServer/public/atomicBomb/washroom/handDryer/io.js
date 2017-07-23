var socket;
 var abc;
var flag = false
socket = io.connect('http://' + ip + '/handDryer')
socket.on('on', function() {
  console.log("handDryer on")
    flag = true;
});
socket.on('off', function() {
    flag = false;
});
