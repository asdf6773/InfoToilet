var tunet = require('tunet');
var childProcess = require('child_process');


// var tsinghua = require('tsinghua-university-network');
// tsinghua.login("y-zhang-13", "89154055qQ", function(error, dataUsage) {
//     if (!error) {
//         console.log("Login successful! " + dataUsage)
//     }
// })
var options = {
    name: 'y-zhang-13',
    pwd: '89154055qQ'
}
tunet.login(options.name, options.pwd, function() {
    childProcess.exec('start chrome --kiosk artisticode.net/mirror --window-position=1920,0 --kiosk --user-data-dir=c:/monitor1');
    childProcess.exec('start chrome --kiosk artisticode.net/projector --window-position=0,0 --kiosk --user-data-dir=c:/monitor2');
});
// Login is successful.
// do logout
// tunet.logout();
