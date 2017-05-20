var express = require("express")
var app = express();
var server = app.listen(8888)

var socket = require("socket.io");
var io = socket(server);
console.log("listen to 8888")
io.of("/setup").on('connection', function(socket) {
    socket.on("check", function() {
        socket.emit("connected");
    })
    socket.on('disconnect', function() {
        //text me
    });
});
