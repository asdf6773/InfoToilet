var weibo = require('./weibo');

var wb = new weibo();
wb.getAuthorize(function(err, access_token, refresh_token) {
    //wb.update({
    //    "status": "中文不行？"
    //},
    //function(error, body, response) {
    //    if (error) {
    //        console.log("error:");
    //        console.log(error);
    //    }
    //    else {
    //        console.log("body:" + body);
    //    }
    //});
    wb.upload({
        "status": "中文不行？",
        "pic": "E:/XX.jpg"
    },
    function(error, body, response) {
        if (error) {
            console.log("error:");
            console.log(error);
        }
        else {
            console.log("body:" + body);
        }
    });
});
