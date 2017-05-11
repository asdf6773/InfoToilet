var access_token = 'https://api.weibo.com/oauth2/access_token'

function (req, response) {
  var queryData = url.parse(req.url, true).query;
  var pathname = url.parse(req.url).pathname;
  // You can customize this callback as you want
  if (pathname === '/auth/idnet/callback') {

    // check if there is a code
    if (queryData.code) {
      var exchange = {
        code: queryData.code,
        client_id: '3344334023', // replace by your APP_ID
        client_secret: 'f9ce91dc122208107705851c53b7d035', // replace by your APP_SECRET
        grant_type: 'authorization_code'
      };
      // Exchange code for an access_token
      request.post(access_token + '/oauth/token', {form: exchange}, function(e,r, body){
        var obj = JSON.parse(body);
        console.log(obj);
        // You need to store this object in your database to reuse it and call API on behalf of the user
        var token = obj.access_token;
        options = {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
        // Request User information API with access_token
        request.get(site + '/api/v1/json/profile', options, function(e, r, body){
          var obj = JSON.parse(body);
          console.log(obj);
          response.end('Connected as ' + obj.nickname + ' / PID: ' + obj.pid);
        });

      });
    }
  }
}
