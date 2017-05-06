var express = require('express');
var app = express();
var server = app.listen(5000);
var socket = require('socket.io');
var io = socket(server);
var serialport = require("serialport");
var flush = false;
var lastFlush = false;
var fs = require('fs');
var events = require("events");
var myEmitter = new events.EventEmitter();
//var SerialPort = serialport.SerialPort;
var portname = process.argv[2];
// serialport.list(function(err, ports) {
//     ports.forEach(function(port) {
//         console.log(port.comName);
//         console.log(port.pnpId);
//         console.log(port.manufacturer);
//     });
// });
var send = false;


var preload = JSON.parse(fs.readFileSync('./ip.json', 'utf8'));
var ip = preload.ip
console.log(ip)



app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/uploadSuccess.html")
})

io.sockets.on('connection', function(socket) {
    console.log("Serial Page connect Successfully!  " + socket.id);
    //  socket.on('flush', triggerButton);
    setInterval(function() {
        lastFlush = flush;
        if (flush === true && send === false) {
            send = true;
            socket.broadcast.emit('flushFromToilet', flush);
        }
    }, 200);

});
var socket = require('socket.io-client')('http://'+ip+'/serialPort');

function triggerButton() {
    socket.broadcast.emit('flush', flush);
}
var myPort = new serialport(portname, {
    baudRate: 9600,
    options: false,
    parser: serialport.parsers.readline("\r\n")
});

myPort.on('open', function() {
    console.log('port is open')
});
myPort.on('close', function() {
    console.log('port is closed')
});

myPort.on('error', function() {
    console.log('error')
})

myPort.on('data', function(data) {
    // console.log(data)
    if (data >= 500) {
        flush = true;
        socket.emit("switchOn", flush)
        console.log(data)
    }
    if (data< 500) {
        flush = true;
        socket.emit("switchOff", flush)
        console.log(data)
    }
    // else {
    //     flush = false;
    // }
    setTimeout(function() {

        if (data <= 70) {
            lastFlush = flush;
            flush = false;
            send = false;
        }
        // flag=false;
    }, 200);
    // console.log(flush + " " + send)

})
// socket.emit('connect', function() {
//     // var lastStatus = false;
//     // var status = false;
//     // setInterval(function() {
//     //     status = flush
//     //     if (lastStatus != status) {
//     //
//     //     }
//     // }, 200)
//
// });
