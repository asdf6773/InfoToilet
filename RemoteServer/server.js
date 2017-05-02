var express = require('express');
// var serialport = require("serialport");
// var portname = process.argv[2];
var fs = require('fs');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var socket = require("socket.io")
var server = app.listen(80);
var io = socket(server);
var uploadName;
var flush = true;

app.use(bodyParser.json());
console.log("running on 80;")
//upload

var imageBuffer = [];
var imageScaleBuffer = [];
//  isFlushing: false;
//consoleData
var consoleData = {
    isFlushing: false,
    totalUser: 0,
    onlineUser: 0,
    totalProjector: 0,
    onlineProjector: 0,
    totalImage: 0,
    currentImage: 0,
    totalFlush: 0,
    maxImage: 0,
    maxOnlineUser: 0,
    maxOnlineProjector: 0

}
// setInterval(function() {
//     console.log(consoleData)
// }, 1000)

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/Images");
    },
    filename: function(req, file, callback) {
        uploadName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        imageBuffer.push(uploadName);
        //console.log("Now have " + imageBuffer.length + " images");
        callback(null, uploadName);
    }
});
var upload = multer({
    storage: Storage
}).array("imgUploader", 1);


var ServerLimit = Math.round(imageBuffer.length / 3) >= 3 ? Math.round(imageBuffer.length / 3) : 3;
//router
// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// });
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/closestool/uploader.html");
});
app.get("/display", function(req, res) {
    res.sendFile(__dirname + "/public/display/display.html");
});
app.get("/console", function(req, res) {
    res.sendFile(__dirname + "/public/console/console.html");
});
app.post("/api/Upload", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            //  alert(failed);
            return res.end("Something went wrong!");
        }

        io.of('/projector').emit('uploadName', uploadName);

        return res.redirect("/uploadSuccess.html");
    });

});

app.use(express.static(__dirname + '/public'))

var dt = {
    x: 2,
    y: 10
}

//Websocket
var projectors = [];
var user = [];
var uploadNum = 0;
io.of("/uploaded").on('connection', function(socket) {
    consoleData.totalImage += 1;
    uploadNum += 1;
    //console.log("upload Success!  " + uploadNum + " imges have been upload");
    // io.of('/projector').emit('uploadName', uploadName);
});

io.of("/user").on('connection', function(socket) {
    user.push(socket.id);
    //console.log("New user connected" + ' ' + "Online User: " + user.length)
    consoleData.totalUser += 1;
    //  consoleData.onlineUser = user.length;

    socket.on('disconnect', function() {
        for (var i = 0; i < user.length; i++) {
            if (user[i] === socket.id) {
                user.splice(i, 1);
                consoleData.onlineUser = user.length;
                consoleData.maxOnlineUser = consoleData.onlineUser > consoleData.maxOnlineUser ? consoleData.onlineUser : consoleData.maxOnlineUser;
                //console.log("User disconnected" + "Online User: " + user.length)
            }
        }
    });
});
io.of("/console").on('connection', function(socket) {
    socket.emit("consoleData", consoleData)
    setInterval(function() {
        socket.emit("consoleData", consoleData)
    }, 1000)
});
var numOfFlushOver = 0;
io.of("/projector").on('connection', function(socket) {
    socket.emit('limitFromServer', ServerLimit);
    socket.emit('isFlushingSetup', consoleData.isFlushing);
    io.of('/projector').emit('imageBuffer', imageBuffer);
    io.of('/projector').emit('imageScaleBuffer', imageScaleBuffer);
    projectors.push(socket.id);
    consoleData.totalProjector += 1;
    consoleData.onlineProjector = projectors.length;
    consoleData.maxOnlineProjector = consoleData.onlineProjector > consoleData.maxOnlineProjector ? consoleData.onlineProjector : consoleData.maxOnlineProjector;
    //console.log(socket.id + ' ' + projectors.length)
    //projectorId.push(socket.id);
    socket.on('imgFlushed', function(i) {
        io.of('/projector').emit('imageBuffer', imageBuffer);
        io.of('/projector').emit('imageScaleBuffer', imageScaleBuffer);
        if (ServerLimit > 0) {
            //console.log(i)
            imageScaleBuffer.splice(i, 1);
            imageBuffer.splice(i, 1);
            io.of('/projector').emit('flushByOther');
            ServerLimit -= 1;
        }
        consoleData.currentImage = imageBuffer.length;
    });
    // socket.on('flushOver', function() {
    //     //   //console.log())
    //     numOfFlushOver += 1;
    //     //console.log(numOfFlushOver + " " + projectors.length + " " + isFlushing);
    //     if (numOfFlushOver == projectors.length) {
    //         isFlushing = false;
    //         numOfFlushOver = 0;
    //         io.of('/projector').emit('isFlushing', isFlushing);
    //     }
    //
    // });
    socket.on('requestNewLimit', function() {
        socket.emit('limitFromServer', ServerLimit)
    });
    socket.on('flushPressed', function() {
        consoleData.totalFlush += 1;
        // //console.log(i)
        consoleData.isFlushing = true;
        ServerLimit = Math.round(imageBuffer.length / 3) >= 3 ? Math.round(imageBuffer.length / 3) : 3;
        //console.log(ServerLimit)
        io.of('/projector').emit('limitFromServer', ServerLimit);
        io.of('/projector').emit('isFlushing', consoleData.isFlushing);
        io.of('/projector').emit('flushPressedFromServer');
        setTimeout(function() {
            limit = 2;
            consoleData.isFlushing = false;
            io.of('/projector').emit('isFlushing', consoleData.isFlushing);
        }, 6500) //新进来的Socket没有触发回调函数
    });
    socket.on('disconnect', function() {

        for (var i = 0; i < projectors.length; i++) {
            if (projectors[i] === socket.id) {
                projectors.splice(i, 1);
                //            //console.log(socket.id + ' ' + projectors.length+" "+isFlushing)
            }
        }
        consoleData.onlineProjector = projectors.length;
        //  numOfFlushOver += 1;

        // if (numOfFlushOver == projectors.length) {
        //     isFlushing = false;
        //     numOfFlushOver = 0;
        //     io.of('/projector').emit('isFlushing', isFlushing);

        // }

    });
});
//new uploadMode
io.of("/test").on('connection', function(socket) {
    user.push(socket.id);
    consoleData.totalUser += 1;
    consoleData.onlineUser = user.length;
    consoleData.maxOnlineUser = consoleData.onlineUser > consoleData.maxOnlineUser ? consoleData.onlineUser : consoleData.maxOnlineUser;

    socket.on('imgData', saveImage);
    socket.on('disconnect', function() {
        for (var i = 0; i < user.length; i++) {
            if (user[i] === socket.id) {
                user.splice(i, 1);
                consoleData.onlineUser = user.length;

                //console.log("User disconnected" + "Online User: " + user.length)
            }
        }
    });

    function saveImage(data) {
        var dataUrl = data;
        // //console.log(dataUrl)
        if (dataUrl.split(",")) { //bug
            var buffer = new Buffer(dataUrl.split(",")[1], 'base64');
        } else {
            var buffer = new Buffer('empty', 'base64'); //?????????????????????????????????????
        }
        var newUpload = 'img_' + Date.now() + ".png"
        fs.writeFile("public/Images/" + newUpload, buffer, (err) => {
            if (err) {
                io.of('/').emit('error');
                throw err;
            } else {
                // io.of('/').emit('uploaded');
                consoleData.totalImage += 1;
                io.of('/projector').emit('uploadName', newUpload);
                imageBuffer.push(newUpload);
                imageScaleBuffer.push(1 + 0.5 * Math.random())
                consoleData.currentImage = imageBuffer.length;
                consoleData.maxImage = consoleData.currentImage > consoleData.maxImage ? consoleData.currentImage : consoleData.maxImage;
                //console.log(socket.id)
                socket.emit('uploaded');
            }
        });
        //console.log('get');
    }
})



// app.get('/', handle);
//
// function handle(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('hahahah');
//     res.end();
// }
//---------Serial Port
// var myPort = new serialport(portname, {
//     baudRate: 9600,
//     options: false,
//     parser: serialport.parsers.readline("\r\n")
// });
//
// myPort.on('open', function() {
//     //console.log('port is open')
// });
// myPort.on('close', function() {
//     //console.log('port is closed')
// });
//
// myPort.on('error', function() {
//     //console.log('error')
// })
//
// myPort.on('data', function(data) {
//     if(data>70){
//       flush = true;
//
//     }else{
//       flush = false;
//     }
//
// })
