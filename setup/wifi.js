var wifi = require('node-wifi');
var tunet = require('tunet');
var childProcess = require('child_process');
var options = {
    name: 'y-zhang-13',
    pwd: '89154055qQ'
}
// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
});

wifi.connect({
    ssid: "Tsinghua",
    password: ""
}, function(err) {
    if (err) {
        console.log(err);
    }
    setTimeout(function() {
        tunet.login(options.name, options.pwd, function() {
            setTimeout(function() {
                childProcess.exec('start chrome --kiosk artisticode.net/mirror --window-position=1920,0 --kiosk --user-data-dir=c:/monitor1');
                childProcess.exec('start chrome --kiosk artisticode.net/projector --window-position=0,0 --kiosk --user-data-dir=c:/monitor2')
            }, 5000)
        });
    }, 5000);

    console.log('Connected');
});
