var router = express.Router();


router.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/washroom/home/index.html");
})
router.get('/toilet', function(req, res) {
    res.sendFile(__dirname + "/public/washroom/closestool/uploader.html");
})
router.get('/faucet', function(req, res) {
    res.sendFile(__dirname + "/public/washroom/faucet/index.html");
})
router.get('/dryer', function(req, res) {
    res.sendFile(__dirname + "/public/washroom/dryer/index.html");
})
router.get("/mirror", function(req, res) {
    res.sendFile(__dirname + "/public/washroom/mirror/index.html");
});
router.get("/mirrorClient", function(req, res) {
    res.sendFile(__dirname + "/public/washroom/mirror/client.html");
});
router.get("/me", function(req, res) {
      res.sendFile(__dirname + "/public/washroom/author/index.html");
});
