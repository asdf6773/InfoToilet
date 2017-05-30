var request = require("request")
var portname = process.argv[2];
var tunet = require('./tunet');
var listenPort = require("./listenPort-module")
var socket = require('socket.io-client')('http://59.110.143.143:8888/setup');
var socket2 = require('socket.io-client')('http://59.110.143.143/checkStatus');
var childProcess = require('child_process');
var WiFiControl = require('wifi-control');
var isSetup = false;
var isSetting = false;
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
listenPort.setup("COM3")
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
  console.log("isSetup？："+isSetup)
    ifaceState = WiFiControl.getIfaceState();
    if (ifaceState.ssid != "Tsinghua" || ifaceState.ssid == undefined) {//如果没连接校园网，则自动连接
         isSetup = false;
        var _ap = {
            ssid: "Tsinghua",
            password: ""
        }; //连上后自动登陆
        var results = WiFiControl.connectToAP(_ap, function(err, response) {
            if (err) console.log(err);
            login();
            console.log(response);
        });
    } else if (!isSetup) { //如果已经连上校园网，且窗口未启动，则启动窗口

        console.log("network status " + socket.connected)
        if (socket.connected) {
            login();
        }
        socket.emit("check")

    } else if (isSetup) { //如果已经连上校园网，窗口已启动，则在断网时自动重新登陆
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
socket2.on("restart", function() {
    if (!isSetting) {
        setup()
    }
})
//---------------------------------------------------


// taskkill / IM chrome.exe
function login() {
    setTimeout(function() {
        tunet.login(options.name, options.pwd, function() {
            setup();
            isSetup = true;
        });
    }, 5000);
}

function setup() {
    isSetting = true;
    childProcess.exec("taskkill /IM chrome.exe");
    // isSetup = false;
    setTimeout(function() {

        childProcess.exec('start chrome --kiosk artisticode.net/mirror --window-position=1920,0 --kiosk --user-data-dir=c:/monitor1');
        setTimeout(function() {
            childProcess.exec('start chrome --kiosk artisticode.net/projector --window-position=0,0 --kiosk --user-data-dir=c:/monitor2');

        }, 1000)
        isSetting = false;
    }, 5000)
}
