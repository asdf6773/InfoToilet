window.onload = function() {
    var type = 1;
    var socket = io.connect('http://' + ip + '/mirrorClient')
    $("#like").click(function() {
        socket.emit("sendLike", type);
    })
}
