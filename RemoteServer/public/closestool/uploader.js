function resizeCanvas() {
    // if (window.innerWidth <= 320) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight - 50;
    // } else {
    //     w = canvas.width = 320;
    //     h = canvas.height = window.innerHeight - 50;
    //
    // }
    //
    // if (window.innerWidth <= 320) {
    w = canvasBG.width = window.innerWidth;
    h = canvasBG.height = window.innerHeight - 50;
    // } else {
    //     w = canvasBG.width = 320;
    //     h = canvasBG.height = window.innerHeight - 50;
    // }
    var elem = document.getElementById('wrapper');
    elem.style.height = canvasBG.height + "px"
    var imgLabel = document.getElementById('img');
    var subLabel = document.getElementById('sub');
    //  imgLabel.style.padding = window.innerWidth/4-imgLabel.style.width/4
}


window.onload = function() {
    // $("#imgFile").on("change", function(e) {
    //     var files = $(this)[0].files;
    //     var fileName = e.target.value.split('\\').pop();
    //     $("#label_span").text("");
    // })
    var toilet = new Image();

    var uploading = false;
    window.addEventListener("resize", resizeCanvas, false);
    var canvasBG = document.getElementById("canvasBG");
    var ctxBG = canvasBG.getContext('2d');
    var fps = 1000 / 25; //number of frames per sec
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    resizeCanvas();
    var cw = canvas.width;
    var ch = canvas.height;

    ctx.save();
    toilet.src = 'http://' + ip + '/lib/toilet.png'
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    toilet.onload = function() {
        ctxBG.drawImage(toilet, 0, 0, canvas.width, canvas.width * 16 / 9);
    };
    ctx.restore();
    var socket = io.connect('http://' + ip + '/test');
    var moving = false;
    var completed = 0;
    var img = [];
    var imgTemp = [];


    var ang = 0;
    var cw,
        ch,
        iw,
        ih;
    var wid, hei;
    var padding;
    var size = [];
    var orien = [];

    socket.on('uploaded', success);

    function success() {
        uploading = false;
        var ran = Math.random();
        console.log('success')
        var fly = 0;
        var step = 0;
        var cache = this;
        var anmi = setInterval(move, fps);

        function move() {
            moving = true;
            ctx.save(); //saves the state of canvas

            ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
            //ctx.drawImage(toilet, 0, 0, 320, 600);
            ctx.translate(canvas.width / 2, canvas.height / 2);

            if (img.length > 1)
                if (!img[1].error) {

                    ctx.save();
                    checkOrientation(orien[1])
                    ctx.drawImage(img[1], -size[1].iw / 2, -size[1].ih / 2 - 200 - fly, size[1].iw, size[1].ih - 200 - fly);
                    ctx.restore();
                }
            ctx.translate(0, -fly); //let's translate

            ctx.rotate(Math.PI / 180 * (ang += ran > 0.5 ? 20 : -20)); //increment the angle and rotate the image
            if (img.length > 0) {
                if (!img[0].error)
                    ctx.drawImage(img[0], -size[0].iw / 2, -size[0].ih / 2, size[0].iw, size[0].ih); //draw the image ;)
            }
            ctx.restore(); //restore the state of canvas
            step += 5;
            fly -= step;
            if (canvas.height / 2 - fly >= 600) {

                clearInterval(anmi);
                moving = false
                //        console.log(moving)
                img.shift();
                size.shift();
                orien.shift();


                data = canvas.toDataURL("image/png")
                console.log(img.length + ' ' + size.length)
                ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canv
                if (img.length > 0) {
                    idisplay(0);
                }
                console.log(img.length)
            }
        }

    }
    var data;
    var input = document.getElementById('imgFile');
    input.addEventListener('change', handleFiles);
    //callback


    function handleFiles(e) {
        img = []
        size = []
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.drawImage(toilet, 0, 0, 320, 600);
        completed = 0;
        for (var i = 0; i < e.target.files.length; i++) {
            var file = e.target.files[i];
            var fr = new FileReader;
            fr.readAsBinaryString(file);



            //  console.log(e.target.files.length)
            var url = URL.createObjectURL(e.target.files[i]);
            console.log(url)
            img.push(new Image());
            orien.push(0)
            size.push({
                iw,
                ih
            });
            //如何判断这里是否是图片
            //if(是图片)
            img[i].src = url;
            //else
            //img[i].src = urlof empty image
            function iter(i, fr) {
                //  fr.onloadend = function() {?????????????????????????why
                // get EXIF data
                EXIF.getData(file, function() {

                    orien[i] = this.exifdata.Orientation;
                    //    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    //ctx.drawImage(toilet, 0, 0, 320, 600);
                    console.log(i + " " + this.exifdata.Orientation)
                });
                // alert a value
                //  };
                img[i].onload = addSize
                img[i].onerror = function() {
                    console.log(img[0].error)
                    img[i].error = true;
                    console.log(img[0])
                    var blank = document.createElement('canvas');
                    blank.width = canvas.width;
                    blank.height = canvas.height;
                    data = blank.toDataURL("image/png")
                }

                function addSize() {
                    img[i].error = false;
                    size[i].iw = img[i].width;
                    size[i].ih = img[i].height;
                    if (size[i].ih >= size[i].iw) {
                        var hei = window.innerWidth;
                        var wid = size[i].iw * hei / size[i].ih
                        // var wid = ch * size[i].iw / size[i].ih;
                        // var hei = size[i].ih * wid / size[i].iw;
                        size[i].iw = wid;
                        size[i].ih = hei;
                    } else {
                        var hei = cw * size[i].ih / size[i].iw;
                        var wid = size[i].iw * hei / size[i].ih
                        size[i].iw = wid;
                        size[i].ih = hei;
                    }
                    completed += 1;
                    // console.log(i)
                    // console.log(size)
                    idisplay(0); //不是按顺序来的
                    ctx.restore();
                }
            }
            iter(i, fr)
        }
        //  imgTemp = img.slice();
    }
    //submit, send data to server
    $('#submit').click(function() {
        if (document.getElementById("imgFile").value == "" && img.length == 0) {
            alert("没有东西可以丢")
        } else if (moving || uploading) {
            if (uploading)
                alert("慢一点,别着急:)")
        } else {
            socket.emit('imgData', data);
            uploading = true;
            document.getElementById("imgFile").value = "";
            console.log('sent')
        }

    })

    function isCanvasBlank(canvas) {
        var blank = document.createElement('canvas');
        blank.width = canvas.width;
        blank.height = canvas.height;

        return canvas.toDataURL() == blank.toDataURL();
    }

    function idisplay(j) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (size[j].ih >= size[j].iw) {
            if (!img[0].error) {
                //  ctx.save()
                checkOrientation(orien[0])
                console.log(ctx)
                ctx.drawImage(img[0], -size[0].iw / 2, -size[0].ih / 2, size[0].iw, size[0].ih);
                //ctx.restore()
            }
        } else {
            if (!img[0].error) {
                //    ctx.save()
                checkOrientation(orien[0])
                console.log(ctx)
                ctx.drawImage(img[0], -size[0].iw / 2, -size[0].ih / 2, size[0].iw, size[0].ih);
                //ctx.restore()
            }
        }
        //if (!isCanvasBlank(canvas))
        console.log(isCanvasBlank(canvas))

        data = canvas.toDataURL("image/png")
        // else {

        // }
        ctx.restore();

    }
    function checkOrientation(orient) {

        switch (orient) {

            case 2:
                // horizontal flip
                //    ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                break;
            case 3:
                // 180° rotate left
                //        ctx.translate(canvas.width, canvas.height);
                ctx.rotate(Math.PI);
                break;
            case 4:
                // vertical flip
                //        ctx.translate(0, canvas.height);
                ctx.scale(1, -1);
                break;
            case 5:
                // vertical flip + 90 rotate right
                ctx.rotate(0.5 * Math.PI);
                ctx.scale(1, -1);
                break;
            case 6:
                // 90° rotate right
                ctx.rotate(0.5 * Math.PI);
                //        ctx.translate(0, -canvas.height);
                break;
            case 7:
                // horizontal flip + 90 rotate right
                ctx.rotate(0.5 * Math.PI);
                //      ctx.translate(canvas.width, -canvas.height);
                ctx.scale(-1, 1);
                break;
            case 8:
                // 90° rotate left
                ctx.rotate(-0.5 * Math.PI);
                //          ctx.translate(-canvas.width, 0);
                break;
        }
    }
}
