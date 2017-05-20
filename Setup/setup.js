var request = require("request")
var portname = process.argv[2];
var tunet = require('./tunet');
var listenPort = require("./listenPort-module")
var socket = require('socket.io-client')('http://59.110.143.143:8000/setup');
var childProcess = require('child_process');
var WiFiControl = require('wifi-control');
var options = {
    name: 'y-zhang-13',
    pwd: '89154055qQ'
}
//wifi init
WiFiControl.init({
    debug: true
});
var ifaceState = WiFiControl.getIfaceState();
if (ifaceState) {
    console.log("wifi is connect")
} else {
    console.log("wifi is not connect")
}
// console.log(ifaceState.ssid === undefined)

if (ifaceState.ssid != "Tsinghua" || ifaceState.ssid == undefined) {
    var _ap = {
        ssid: "Tsinghua",
        password: ""
    };
    var results = WiFiControl.connectToAP(_ap, function(err, response) {
        if (err) console.log(err);
        console.log(response);
        login();
    });
} else {
    login()
}
listenPort.setup("COM8")
// Initialize wifi module
// Absolutely necessary even to set interface to null


// setup();
//-------------------------------check wifi connection
function checkInternet(cb) {
    require('dns').lookup('baidu.com', function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

//1. check whether it is Tsinghua WIFI
setInterval(function() {
    ifaceState = WiFiControl.getIfaceState();
    if (ifaceState.ssid != "Tsinghua" || ifaceState.ssid == undefined) {
        var _ap = {
            ssid: "Tsinghua",
            password: ""
        };
        var results = WiFiControl.connectToAP(_ap, function(err, response) {
            if (err) console.log(err);
            login();
            console.log(response);
        });
    } else {

        console.log("network status " + socket.connected)
        if (!socket.connected) {
            login();
        }
        socket.emit("check")

    }
}, 10000)

//2.check login Status Or Server status



socket.on("connected", function() {
    console.log("server connected ")
})
//---------------------------------------------------


// taskkill / IM chrome.exe
function login() {
    setTimeout(function() {
        tunet.login(options.name, options.pwd, function() {
            setup();
        });
    }, 5000);
}

function setup() {
    childProcess.exec("taskkill /IM chrome.exe");
    setTimeout(function() {
        childProcess.exec('start chrome --kiosk artisticode.net/mirror --window-position=1920,0 --kiosk --user-data-dir=c:/monitor1');
        setTimeout(function() {
            childProcess.exec('start chrome --kiosk artisticode.net/projector --window-position=0,0 --kiosk --user-data-dir=c:/monitor2');
        }, 1000)

    }, 5000)
}
