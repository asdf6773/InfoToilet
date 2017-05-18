window.onload = function() {
    document.getElementById('back').href = 'http://' + ip + '/graduateProject';
    var type = 1;
    var socket = io.connect('http://' + ip + '/mirrorClient')
    $("#like").click(function() {
        socket.emit("sendLike", type);
    })
}
