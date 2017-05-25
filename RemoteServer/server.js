var express = require('express');
var fs = require('fs');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var socket = require("socket.io")
var request = require('request');
var server = app.listen(80);
var io = socket(server);
var uploadName;
var flush = true;
var Console = [];
var comments = JSON.parse(fs.readFileSync('./public/lib/comments.json', 'utf8'));


console.log("running on 80;")
var imageBuffer = [];
var imageScaleBuffer = [];
var consoleData = JSON.parse(fs.readFileSync('./public/lib/record.json', 'utf8'));
//toiletData
consoleData.onlineUser = 0;
consoleData.onlineProjector = 0;
consoleData.currentImage = 0;
consoleData.isFlushing = false;
//others
consoleData.faucetOnline = 0;
consoleData.mirrorOnline = 0;
consoleData.dryerOnline = 0;
console.log(consoleData)
setInterval(function() {
    fs.writeFile('./public/lib/record.json', JSON.stringify(consoleData), function(err) {});
}, 1000)

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
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/catalog/index.html");
});
app.get("/mirrorClient", function(req, res) {
    res.sendFile(__dirname + "/public/mirror/client.html");
});
app.get("/author", function(req, res) {
    res.sendFile(__dirname + "/public/author/index.html");
});
app.get("/me", function(req, res) {
    res.sendFile(__dirname + "/public/author/index.html");
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
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
app.post("/comments", urlencodedParser, function(req, res) {
    var id = comments.comments.length
    var txt = req.body.text;
    comments.comments.push({
        id: id + 1,
        comment: txt
    });
    fs.writeFile('./public/lib/comments.json', JSON.stringify(comments), function(err) {});
    res.send(comments)
    console.log(txt)
});
app.get("/comments", urlencodedParser, function(req, res) {
    var id = comments.comments.length
    var txt = req.body.text;
    res.send(comments)
    console.log(txt)
});
//
//
// app.post("/api/Upload", function(req, res) {
//     upload(req, res, function(err) {
//         if (err) { //  alert(failed);
//             return res.end("Something went wrong!");
//         }
//         io.of('/projector').emit('uploadName', uploadName);
//         return res.redirect("/uploadSuccess.html");
//     });
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
    extended: false
}));
app.use(express.static(__dirname + '/public'))


//Websocket
var projectors = [];
var user = [];
var uploadNum = 0;
var likes = 0;
var pullData = "https://api.weibo.com/2/statuses/public_timeline.json?access_token=2.00eSb_UD2DU1eDf3a9e590d50d5pCZ"
// var pullData = 'https://api.weibo.com/2/place/poi_timeline.json?access_token=2.00eSb_UD2DU1eDf3a9e590d50d5pCZ&poiid=B2094654D26EABF8449E&count=30';
var weiboData = JSON.parse(fs.readFileSync('./public/lib/weibo.json', 'utf8'));;
var timer = 60 * 60 * 1000;
setInterval(function() {
    request(pullData, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);

            console.log('refresh weiboData');
            // socket.emit("weiboData", obj);
            weiboData = obj;
            fs.writeFile('./public/lib/weibo.json', JSON.stringify(weiboData), function(err) {

            });
        }
    })
}, timer);
//3600000





//mirrir
io.of("/mirror").on('connection', function(socket) {
    socket.emit("initLikes", likes);
    socket.on("disconnect", function() {
        io.of("/checkStatus").emit("restart")
    })
});
//socket
io.of("/faucet").on('connection', function(socket) {
    socket.on("test", function() {
        socket.emit("weiboData", weiboData);
    })
});
io.of("/mirrorClient").on('connection', function(socket) {
    socket.on("sendLike", function(type) {
        io.of("/mirror").emit("like", type);
        likes += 1;
    });
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

io.of("/uploaded").on('connection', function(socket) {
    consoleData.totalImage += 1;
    uploadNum += 1;
    //console.log("upload Success!  " + uploadNum + " imges have been upload");
    // io.of('/projector').emit('uploadName', uploadName);
});
io.of("/checkStatus").on("connection", function(socket) {

})
io.of("/serialPort").on('connection', function(socket) {
    //handDryer
    socket.on("switchOn", function(data) {
        io.of('/handDryer').emit('on');
        console.log("on");
    })
    socket.on("switchOff", function() {
        io.of('/handDryer').emit('off');
        console.log("off");
    })
    //faucet
    socket.on("faucetOn", function() {
        io.of("/faucet").emit('weiboData', weiboData);
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
    socket.on("Cfont", function(key) {
        io.of('/projector').emit('Cfont', key);
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
        io.of('/checkStatus').emit('restart');
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
        if (dataUrl.includes(",")) { //bug
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
