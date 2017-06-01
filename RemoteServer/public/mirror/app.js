window.onload = function() {
  var likes
    document.getElementById('back').href = 'http://' + ip + '/graduateProject';
    var type = 1;
    var socket = io.connect('http://' + ip + '/mirrorClient')
      socket.on("initLikes",function (data) {
        likes=data;
        document.getElementById("num").innerHTML = likes;
      })
      socket.on("likeNum",function (data) {
        likes=data;
              document.getElementById("num").innerHTML = likes;
      })
    $("#like").click(function() {
        socket.emit("sendLike", type);
    })
}
