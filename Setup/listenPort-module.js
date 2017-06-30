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
var Port;
var faucet_status, toilet_status, dryer_status;

faucet_status = false;
toilet_status = false;
dryer_status = false;


var setup = function(portname) {
    console.log("ServerAddress: " + ip)
    var myPort = new serialport(portname, {
        baudRate: 9600,
        options: false,
        parser: serialport.parsers.readline("\r\n")
    });
    Port = myPort;
    listening(Port);

}
// socket.emit("initStatus");
var isOpen = function() {

    return Port.isOpen()
}
var restart = function() {

    closePort();
}
var openPort = function() {
    Port.open(function(err) {
        console.log('open open err:', err);
    });
}
var closePort = function() {
    Port.close(function(err) {
        console.log('port closed err:', err);
        Port.open(function(err) {
            console.log('port open err:', err);
        })
    });
}

function listening(myPort) {
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
        if (data.charAt(0) == 'H') {
            dryer_status = true;
            socket.emit("dryerStatus", dryer_status)
        } //handDryerCheck
        if (data.charAt(0) == 'T') {
            toilet_status = true;
            socket.emit("toiletStatus", toilet_status)
        } //toiletCheck
        if (data.charAt(0) == 'F') {
            faucet_status = true;
            socket.emit("faucetStatus", faucet_status)
        } //faucetCheck
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
module.exports.restart = restart;
module.exports.isOpen = isOpen;
module.exports.setup = setup;
module.exports.close = closePort;
module.exports.open = openPort;
