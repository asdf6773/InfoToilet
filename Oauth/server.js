// var http = require('http');
// var querystring = require('querystring');
// //json转换为字符串
// var data = querystring.stringify({
//     id:"1",
//     pw:"hello"
// });
// var options = {
//     host: '115.29.45.194',
// //    host:'localhost',
// //    port: 14000,
// //    path: '/v1?command=getAuthenticode',
//     path:'/callme/index.cfm/userService/command/getAuthenticode/',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(data)
//     }
// };
//
// var req = http.request(options, function(res) {
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//         console.log("body: " + chunk);
//     });
//     res.on('end',function(chunk){
//         console.log("body: " + chunk);
//     })
// });
// req.write(data);
// req.end();
var request = require('request');

var fs = require('fs')
var bodyParser = require("body-parser");
var express = require('express'),
    sinaOAuth = require('./lib/sinaOAuth');
var app = express();
var server = app.listen(80);
console.log("connect 80")
app.use(bodyParser.urlencoded({
    extended: false
}));
var access_token = 'https://api.weibo.com/oauth2/access_token'
var authorizeUrl = "https://api.weibo.com/oauth2/authorize"
var id = "3344334023"
var secret = "f9ce91dc122208107705851c53b7d035"
var redirect = "http://192.168.137.1/"
var pull = 'https://api.weibo.com/2/place/nearby_timeline.json'
var authorize = authorizeUrl + id + redirect;

app.get('/login', function(req, res) {
    //  req = authorize+
    res.redirect("https://api.weibo.com/oauth2/authorize?client_id=3344334023&redirect_uri=http://192.168.137.1/")
    //  console.log(res)
})

var destroy = "https://api.weibo.com/2/statuses/destroy.json"

app.get('/pull', function(req, res) {
    // var exchange = {
    //     access_token: '2.00eSb_UD2DU1eDf3a9e590d50d5pCZ',
    //     lat: '40.00007894152658', // replace by your APP_ID
    //     long:'116.33607387542725'
    // };
    // request.get(pull, {
    //     form: exchange,
    // }, function(e, r, body) {
    //     var obj = JSON.parse(body);
    //     console.log(obj);
    //     // You need to store this object in your database to reuse it and call API on behalf of the user
    //   //  var token = obj.access_token;
    // });
    request('https://api.weibo.com/2/place/poi_timeline.json?access_token=2.00eSb_UD2DU1eDf3a9e590d50d5pCZ&poiid=B2094654D26EABF8449E&count=30',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body);
                for(var i=0;i<obj.statuses.length;i++)
                console.log(obj.statuses[i].text)
                fs.writeFile('./record.json', JSON.stringify(obj), function(err) {
                    console.log('write')
                });
            }
        })
})


app.get('/', function(req, res) {
    var queryData = req.query;
    if (queryData.code) {
        var exchange = {
            client_id: '3344334023', // replace by your APP_ID
            client_secret: 'f9ce91dc122208107705851c53b 7d035', // replace by your APP_SECRET
            grant_type: 'authorization_code',
            redirect_uri: redirect,
            code: queryData.code,
        };
        // console.log(exchange)
        // Exchange code for an access_token
        request.post(access_token, {
            form: exchange,
        }, function(e, r, body) {
            var obj = JSON.parse(body);
            console.log(obj);

            // You need to store this object in your database to reuse it and call API on behalf of the user
            var token = obj.access_token;
        });
    }
})



// app.post('/test', function(req, res) {
//     req = {
//
//     }
//     console.log(req)
// })
