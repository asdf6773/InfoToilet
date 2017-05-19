var wifi = require('node-wifi');
var tunet = require('tunet');
var socket = require('socket.io-client')('http://192.168.137.1/setup');
var childProcess = require('child_process');
var cheerio = require('cheerio')
var options = {
    name: 'y-zhang-13',
    pwd: '89154055qQ'
}
// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
});

setup();
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
setInterval(function() {
    checkInternet(function(isConnected) {
        if (isConnected) {
            console.log("wifi connected")
        } else {
            console.log("wifi  doesn't connected")
            setup();
        }
    })
}, 5000)
setInterval(function() {
    console.log("status " + socket.connected)
    if (!socket.connected) {
        setup();
    }
    socket.emit("check")
}, 5000)


socket.on("connected", function() {
    console.log("server connected ")
})
//---------------------------------------------------


// taskkill / IM chrome.exe
function setup() {
    wifi.connect({
        ssid: "Tsinghua",
        password: ""
    }, function(err) {
        if (err) {
            console.log(err);
        }
        setTimeout(function() {
            tunet.login(options.name, options.pwd, function() {
                childProcess.exec("taskkill /IM chrome.exe");
                setTimeout(function() {
                    childProcess.exec('start chrome --kiosk artisticode.net/mirror --window-position=1920,0 --kiosk --user-data-dir=c:/monitor1');
                    // childProcess.exec('start chrome --kiosk artisticode.net/projector --window-position=0,0 --kiosk --user-data-dir=c:/monitor2')
                }, 5000)
            });
        }, 5000);

        console.log('Connected');
    });
}
