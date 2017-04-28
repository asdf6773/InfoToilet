var express = require('express');
// var serialport = require("serialport");
// var portname = process.argv[2];
var fs = require('fs');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var socket = require("socket.io")
var server = app.listen(4000);
var io = socket(server);
var uploadName;
var flush = true;
app.use(bodyParser.json());
console.log("running on 4000;")
//upload
var imageBuffer = [];
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/Images");
    },
    filename: function(req, file, callback) {
        uploadName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        imageBuffer.push(uploadName);
        console.log("Now have " + imageBuffer.length + " images");
        callback(null, uploadName);
    }
});
var upload = multer({
    storage: Storage
}).array("imgUploader", 1);

//router
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/test", function(req, res) {
    res.sendFile(__dirname + "/public/closestool/test.html");
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
    uploadNum += 1;
    console.log("upload Success!  " + uploadNum + " imges have been upload");
    // io.of('/projector').emit('uploadName', uploadName);
});

io.of("/user").on('connection', function(socket) {
    user.push(socket.id);
    console.log("New user connected" + ' ' + "Online User: " + user.length)


    socket.on('disconnect', function() {
        for (var i = 0; i < user.length; i++) {
            if (user[i] === socket.id) {
                user.splice(i);
                console.log("User disconnected" + "Online User: " + user.length)
            }
        }
    });
});

io.of("/projector").on('connection', function(socket) {
    io.of('/projector').emit('imageBuffer', imageBuffer);
    projectors.push(socket.id);
    console.log(socket.id + ' ' + projectors.length)
    //projectorId.push(socket.id);
    socket.on('flushFromToilet', function(data) {
        console.log('flushing!');
        socket.broadcast.emit('flushAll')
        imageBuffer.splice(0, imageBuffer.length); //clear the imageBuffer
        console.log("Now have " + imageBuffer.length + " images");
    });
    socket.on('flushFromMobile', function(data) {
        console.log('flushing!');
        io.of('/projector').emit('flushOther');
        imageBuffer.splice(0, imageBuffer.length); //clear the imageBuffer
        console.log("Now have " + imageBuffer.length + " images");

    });
    socket.on('disconnect', function() {
        for (var i = 0; i < projectors.length; i++) {
            if (projectors[i] === socket.id) {
                projectors.splice(i);
                console.log(socket.id + ' ' + projectors.length)
            }
        }
    });
});
//new uploadMode
io.of("/test").on('connection', function(socket) {
    socket.on('imgData', saveImage);

    function saveImage(data) {
        var dataUrl = data;
        // console.log(dataUrl)
        if (dataUrl.split(",")) {
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
                io.of('/projector').emit('uploadName', newUpload);
                imageBuffer.push(newUpload);
                console.log(socket.id)
                socket.emit('uploaded');
            }
        });
        console.log('get');
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
//     console.log('port is open')
// });
// myPort.on('close', function() {
//     console.log('port is closed')
// });
//
// myPort.on('error', function() {
//     console.log('error')
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
