$(document).ready(function() {

    var isFlushing = false;
    var totalUser = 0,
        onlineUser = 0,
        onlineProjector = 0,
        totalImage = 0,
        currentImage = 0,
        totalFlush = 0,
        maxImage = 0,
        maxOnlineUser = 0,
        maxOnlineProjector = 0;
    var socket = io.connect('http://' + ip + '/console');


    socket.on("consoleData", getConsole);
    $("#restart").click(function() {
        var c = confirm("确认重启？");
        if (c)
            socket.emit("restart")

    })
    $("#reOpen").click(function() {
        var c = confirm("确认重开串口？");
        if (c)
            socket.emit("reOpen")

    })
    var current = document.getElementById("current");
    var total = document.getElementById("total");
    var max = document.getElementById("max");
    current.getElementsByTagName("li")[0].innerHTML = "当前在线人数：" + onlineUser;
    current.getElementsByTagName("li")[1].innerHTML = "当前观察剩余：" + onlineProjector;
    current.getElementsByTagName("li")[2].innerHTML = "当前图片剩余：" + totalImage;
    current.getElementsByTagName("li")[3].innerHTML = "马桶冲水状态：" + isFlushing;

    max.getElementsByTagName("li")[0].innerHTML = "最多在线人数：" + totalUser;
    max.getElementsByTagName("li")[1].innerHTML = "最多观察人数：" + onlineProjector;
    max.getElementsByTagName("li")[2].innerHTML = "最多图片剩余：" + totalImage;

    total.getElementsByTagName("li")[0].innerHTML = "累计在线人数：" + totalUser;
    total.getElementsByTagName("li")[1].innerHTML = "累计观察人数：" + onlineProjector;
    total.getElementsByTagName("li")[2].innerHTML = "累计图片丢入：" + totalImage;
    total.getElementsByTagName("li")[3].innerHTML = "累计冲水次数：" + totalFlush;

    function getConsole(data) {


        onlineUser = data.onlineUser;
        onlineProjector = data.onlineProjector;
        currentImage = data.currentImage;
        isFlushing = data.isFlushing;





        maxOnlineUser = data.maxOnlineUser;
        maxOnlineProjector = data.maxOnlineProjector;
        maxImage = data.maxImage;


        totalUser = data.totalUser;
        totalProjector = data.totalProjector;
        totalImage = data.totalImage;
        totalFlush = data.totalFlush;

        current.getElementsByTagName("li")[0].innerHTML = "当前在线人数：" + onlineUser;
        current.getElementsByTagName("li")[1].innerHTML = "当前观察剩余：" + onlineProjector;
        current.getElementsByTagName("li")[2].innerHTML = "当前图片剩余：" + currentImage;
        current.getElementsByTagName("li")[3].innerHTML = "马桶冲水状态：" + isFlushing;


        max.getElementsByTagName("li")[0].innerHTML = "最多在线人数：" + maxOnlineUser;
        max.getElementsByTagName("li")[1].innerHTML = "最多观察人数：" + maxOnlineProjector;
        max.getElementsByTagName("li")[2].innerHTML = "最多图片剩余：" + maxImage;

        total.getElementsByTagName("li")[0].innerHTML = "累计在线人数：" + totalUser;
        total.getElementsByTagName("li")[1].innerHTML = "累计观察人数：" + totalProjector;
        total.getElementsByTagName("li")[2].innerHTML = "累计图片丢入：" + totalImage;
        total.getElementsByTagName("li")[3].innerHTML = "累计冲水次数：" + totalFlush;
        //    console.log(document.getElementById("current").getChildElements(0))


    }


    // setInterval(function() {
    //     // $("body").append("在线上传人数：" + onlineUser);
    //     // $("body").append("在线观察人数：" + onlineProjector);
    //     // $("body").append("图片总数：" + totalImage);
    //     // $("body").append("当前图片数量：" + currentImage);
    // }, 1000)


    //服务器硬盘容量，已用容量，冲水次数，累计登陆
});
