var express = require('express');
var fs = require('fs');
var events = require("events");
var serialport = require("serialport");

var app = express();
var server = app.listen(5000);

var flush = false;
var lastFlush = false;
var myEmitter = new events.EventEmitter();
var send = false;
var preload = JSON.parse(fs.readFileSync('./ip.json', 'utf8'));
var ip = preload.ip
var socket = require('socket.io-client')('http://' + ip + '/serialPort');
// var ip = preload.ip





var setup = function(portname) {
    console.log("ServerAddress: "+ip)
    openPort(portname);

}

var closePort = function(portname) {
    var myPort = new serialport(portname, {
        baudRate: 9600,
        options: false,
        parser: serialport.parsers.readline("\r\n")
    });
    myPort.close(function(err) {
        {
            if (err) {
                console.log("close port ERROR")
            } else {
                console.log("close port")
            }
        }
    })
}

function openPort(portname) {
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
    socket.on("flushIsOver", function() {
        console.log("flushIsOver")
        myPort.write("O", function(err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        })

    })
    myPort.on('data', function(data) {
        if (data.charAt(0) == 'h') { //handDryer
            // console.log(data)
            data = data.substr(1);
            var value = parseInt(data);
            if (value <= 500) {
                // flush = true;
                socket.emit("switchOn", flush)
                console.log("h" + value)
            }
            if (value > 500) {
                // flush = true;
                socket.emit("switchOff", flush)
                console.log("h" + value)
            }

        }
        if (data.charAt(0) == 't') { //toilet
            // console.log(data)
            data = data.substr(1);
            var value = parseInt(data);
            if (value >= 500) {
                // flush = true;
                socket.emit("flushPressedFrombutton")
                console.log("t" + value)
            }

            if (value < 500) {
                // flush = true;
                // socket.emit("switchOff", flush)
                console.log("t" + value)
            }

        }
        if (data.charAt(0) == 'f') { //faucet
            // console.log(data)
            data = data.substr(1);
            var value = parseInt(data);
            if (value >= 500) {
                // flush = true;
                socket.emit("faucetOn")
                console.log("f" + value)
            }
            if (value < 500) {
                // flush = true;
                // socket.emit("switchOff", flush)
                console.log("f" + value)
            }

        }
        setTimeout(function() {

            if (data <= 70) {
                lastFlush = flush;
                flush = false;
                send = false;
            }
            // flag=false;
        }, 200);

    })
}

module.exports.setup = setup;
// module.exports.close = closePort;
