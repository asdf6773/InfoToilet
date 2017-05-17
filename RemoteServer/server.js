var express = require('express');
// var serialport = require("serialport");
// var portname = process.argv[2];
var fs = require('fs');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var socket = require("socket.io")
// var record = require("./public/lib/record.json")

var request = require('request');
var server = app.listen(80);
var io = socket(server);
var uploadName;
var flush = true;
var Console = [];
app.use(bodyParser.json());
console.log("running on 80;")
//upload
// var record="d:\\0.json";
// var textBuffer = [];
var imageBuffer = [];
var imageScaleBuffer = [];
//  isFlushing: false;
//consoleData
var consoleData = JSON.parse(fs.readFileSync('./public/lib/record.json', 'utf8'));
// console.log(temp)

consoleData.onlineUser = 0;
consoleData.onlineProjector = 0;
consoleData.currentImage = 0;
consoleData.isFlushing = false;

console.log(consoleData)
setInterval(function() {
    fs.writeFile('./public/lib/record.json', JSON.stringify(consoleData), function(err) {

    });


}, 1000)
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
// var ServerLimit = Math.round(imageBuffer.length / 3) >= 3 ? Math.round(imageBuffer.length / 3) : 3;
var ServerLimit = 200000;
//router
// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// });
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/catalog/index.html");
});
app.get("/toilet", function(req, res) {
    res.sendFile(__dirname + "/public/closestool/uploader.html");
});
app.get("/mirror", function(req, res) {
    res.sendFile(__dirname + "/public/mirror/index.html");
});
app.get("/mirror", function(req, res) {
    res.sendFile(__dirname + "/public/mirror/index.html");
});
app.get("/graduateProject", function(req, res) {
    res.sendFile(__dirname + "/public/catalog/index.html");
});
app.get("/catalog", function(req, res) {
    res.sendFile(__dirname + "/public/catalog/index.html");
});
app.get("/dryer", function(req, res) {
    res.sendFile(__dirname + "/public/dryer/index.html");
});
app.get("/author", function(req, res) {
    res.sendFile(__dirname + "/public/author/index.html");
});
app.get("/projector", function(req, res) {
    res.sendFile(__dirname + "/public/display/projector.html");
});
app.get("/display", function(req, res) {
    res.sendFile(__dirname + "/public/display/display.html");
});
app.get("/handDryer", function(req, res) {
    res.sendFile(__dirname + "/public/handDryer/index.html");
});
app.get("/faucet", function(req, res) {
    res.sendFile(__dirname + "/public/faucet/index.html");
});
app.get("/console", function(req, res) {
    res.sendFile(__dirname + "/public/console/console.html");
});
app.post("/api/Upload", function(req, res) {
    upload(req, res, function(err) {
        if (err) { //  alert(failed);
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







var pullData = "https://api.weibo.com/2/statuses/public_timeline.json?access_token=2.00eSb_UD2DU1eDf3a9e590d50d5pCZ"

// var pullData = 'https://api.weibo.com/2/place/poi_timeline.json?access_token=2.00eSb_UD2DU1eDf3a9e590d50d5pCZ&poiid=B2094654D26EABF8449E&count=30';



var weiboData;
request(pullData, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);
        // console.log('getcha');
        // socket.emit("weiboData", obj);
        weiboData = obj;
    }
})
io.of("/faucet").on('connection', function(socket) {
    request(pullData, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            // console.log('getcha');
            socket.emit("weiboData", obj);
            // weiboData = obj;
        }
    })
});
io.of("/dryer").on('connection', function(socket) {
    socket.emit("weiboData", weiboData);
});
io.of("/toilet").on('connection', function(socket) {
    socket.on('flushPressedFromButton', function() {
        consoleData.totalFlush += 1;
        // //console.log(i)
        consoleData.isFlushing = true;
        ServerLimit = 100000;
        //console.log(ServerLimit)
        io.of('/projector').emit('limitFromServer', ServerLimit);
        io.of('/projector').emit('isFlushing', consoleData.isFlushing);
        io.of('/projector').emit('flushPressedFromServer');
        setTimeout(function() {
            limit = 200000;
            consoleData.isFlushing = false;
            io.of('/projector').emit('isFlushing', consoleData.isFlushing);
        }, 6500) //新进来的Socket没有触发回调函数
    });

});
//socket
io.of("/uploaded").on('connection', function(socket) {
    consoleData.totalImage += 1;
    uploadNum += 1;
    //console.log("upload Success!  " + uploadNum + " imges have been upload");
    // io.of('/projector').emit('uploadName', uploadName);
});
io.of("/serialPort").on('connection', function(socket) {
    socket.on("switchOn", function(data) {
        io.of('/handDryer').emit('on');
        console.log("on");
    })
    socket.on("switchOff", function() {
        io.of('/handDryer').emit('off');
        console.log("off");
    })


    socket.on("flushPressedFrombutton", function() {
        // if (!consoleData.isFlushing) {
        consoleData.totalFlush += 1;
        // //console.log(i)
        consoleData.isFlushing = true;
        // ServerLimit = Math.round(imageBuffer.length / 3) >= 3 ? Math.round(imageBuffer.length / 3) : 3;
        ServerLimit = 200000;
        //console.log(ServerLimit)
        io.of('/projector').emit('limitFromServer', ServerLimit);
        io.of('/projector').emit('isFlushing', consoleData.isFlushing);
        io.of('/projector').emit('flushPressedFromServer');
        setTimeout(function() {
            limit = 200000;
            consoleData.isFlushing = false;
            io.of('/projector').emit('isFlushing', consoleData.isFlushing);
            io.of('/serialPort').emit('flushIsOver');
        }, 6500) //新进来的Socket没有触发回调函数
        console.log("flushPressedFrombutton");
        // }
    })
    // socket.on("")
    console.log("serialPort Connected")
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
    var id = socket.id
    var interval;
    Console.push({
        interval,
        id
    });

    for (var i = 0; i < Console.length; i++) {
        // console.log("I come from" + socket.id)
        // console.log(Console[i].id + " " + socket.id)
        if (Console[i].id === socket.id) {
            Console[i].interval = setInterval(function() {
                socket.emit("consoleData", consoleData)
                // console.log("I come from" + socket.id)
            }, 1000)
        }
    }
    socket.on('disconnect', function() {
        for (var i = 0; i < Console.length; i++) {
            //  console.log(Console[i].id + " " + socket.id)
            if (Console[i].id === socket.id) {
                // console.log("disconnect" + socket.id)
                clearInterval(Console[i].interval)
                Console.splice(i, 1);
                //            //console.log(socket.id + ' ' + projectors.length+" "+isFlushing)
            }
        }
    })

});

var numOfFlushOver = 0;
io.of("/projector").on('connection', function(socket) {
    socket.emit('limitFromServer', ServerLimit);
    socket.emit('isFlushingSetup', consoleData.isFlushing);
    io.of('/projector').emit('imageBuffer', imageBuffer);
    io.of('/projector').emit('imageScaleBuffer', imageScaleBuffer);
    // io.of('/projector').emit('textBuffer', textBuffer);
    projectors.push(socket.id);
    consoleData.totalProjector += 1;
    consoleData.onlineProjector = projectors.length;
    consoleData.maxOnlineProjector = consoleData.onlineProjector > consoleData.maxOnlineProjector ? consoleData.onlineProjector : consoleData.maxOnlineProjector;
    //console.log(socket.id + ' ' + projectors.length)
    //projectorId.push(socket.id);
    socket.on("typed", function(key) {
        io.of('/projector').emit('newText', key);
        // textBuffer.push("a");
        // imageBuffer.push();
    });

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

    socket.on('requestNewLimit', function() {
        socket.emit('limitFromServer', ServerLimit)
    });
    socket.on('flushPressed', function() {
        consoleData.totalFlush += 1;
        // //console.log(i)
        consoleData.isFlushing = true;
        ServerLimit = 200000;
        // ServerLimit = Math.round(imageBuffer.length / 3) >= 3 ? Math.round(imageBuffer.length / 3) : 3;
        //console.log(ServerLimit)
        io.of('/projector').emit('limitFromServer', ServerLimit);
        io.of('/projector').emit('isFlushing', consoleData.isFlushing);
        io.of('/projector').emit('flushPressedFromServer');
        setTimeout(function() {
            limit = 200000;
            consoleData.isFlushing = false;
            io.of('/projector').emit('isFlushing', consoleData.isFlushing);
            io.of('/serialPort').emit('flushIsOver');
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
