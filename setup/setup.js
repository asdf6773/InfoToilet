var childProcess = require('child_process');


childProcess.exec('start chrome --kiosk artisticode.net/mirror --window-position=1920,0 --kiosk --user-data-dir=c:/monitor1');
childProcess.exec('start chrome --kiosk artisticode.net/projector --window-position=0,0 --kiosk --user-data-dir=c:/monitor2');
