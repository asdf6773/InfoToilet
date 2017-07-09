var express = require('express');
var app = express();
var server = app.listen(8888)
console.log("server running on 8888")


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
})
app.use(express.static(__dirname + '/public'))
