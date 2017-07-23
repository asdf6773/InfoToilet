var unfolded;
var works = [];
var countOfWork;
var mask;
var ratioLogoBorder;
var mobile;
var grid;
var others = []
var row, col, spacing;
var qr;
var logo;

function initCSS() {
    if (width <= height) {
        mobile = true;
    } else {
        mobile = false;
    }
    if (mobile) {
        row = 3
        col = 10
        spacing = window.innerWidth / 20;
        grid = new Grid(row, col, spacing);
        select("body").style("height", 2 * height + "px")
        select(".name").style("top", height * 1.5 + "px")
        select(".name").style("right", spacing + "px");
        select(".name2").style("top", height * 1.7 + "px")
        select(".name2").style("right", spacing + "px");
    } else {
        row = 8
        col = 5
        spacing = window.innerWidth / 50
        grid = new Grid(row, col, spacing);
        select("body").style("height", 2 * height + "px")
        select(".name").style("top", height * 1.1 + "px")
        select(".name").style("right", spacing + "px");
        select(".name2").style("top", height * 1.3 + "px")
        select(".name2").style("right", spacing + "px");
    }
    select("#footer").style("text-align", "left")
    select("#footer").style("bottom", +1.5 + "%")
    select("#footer").style("left", spacing + "px")
    select("#footer").style("z-index", "10")
}

function homePreload() {
    qr = createImg('./lib/qr.png', "qr");
    qr.style("opacity", "0.6")
    qr.id("qr")

    initCSS(mobile)
    logo = new Logo();
    myp5 = new p5(s, 'logo')

    select("#logo").mouseClicked(unfold);
    // console.log(grid)
    ratioLogoBorder = 60;
    ratioWorkSpacing = mobile === true ? 120 : 200;;
}

//---------------------------Setup---------------------------------
function homeSetup() {
    var qrSize = {
        width: width / 10,
        height: width / 10
    }
    qr.size(qrSize.width, qrSize.height)
    countOfWork = 0;
    mask = createDiv("");
    mask.id("mask");
    mask.size(width, height + 10000);
    unfolded = false;
    works.push(new work("washroom", './lib/washroom.jpg'))
    works.push(new work("atomicBomb", './lib/atomicBomb.jpg'))
    works.push(new work("domino", './lib/domino.jpg'))
    works.push(new work("poseidon", './lib/poseidon_small.jpg'))
    works.push(new work("domino", './lib/jelly.jpg'))
    works.push(new work("domino", './lib/connection.jpg'))


    others.push(new other("about", './lib/about.png'))
    others.push(new other("about", './lib/blog.png'))
    works[0].img.mouseClicked(function() {
        window.location = "./washroom"
    })
    works[1].img.mouseClicked(function() {
        window.location = "./atomicBomb"
    })
    works[2].img.mouseClicked(function() {
        window.location = "./domino"
    })
    works[3].img.mouseClicked(function() {
        window.location = "https://v.qq.com/x/page/t03472zm3w5.html"
    })
    works[4].img.mouseClicked(function() {
        window.location = "./jelly"
    })
    works[5].img.mouseClicked(function() {
        window.location = "./connection"
    })
    others[0].img.mouseClicked(function() {
        window.location = "./me"
    })
    others[1].img.mouseClicked(function() {
        alert("敬请期待")
    })
    logo.init();
    for (var i = 0; i < works.length; i++) {
        works[i].init();
    }
    for (var i = 0; i < others.length; i++) {
        others[i].init();
    }
    unfold()
}
//---------------------------loop---------------------------------
function home() {
    if (canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
        resizeCanvas(window.innerWidth, window.innerHeight);
        resizeHome();
        // qr.position(width - qrSize.width - window.innerWidth / 50, height - qrSize.width - window.innerWidth / 50)
    }
    logo.diff = logo.target.size - logo.size;
    logo.size += logo.diff * 0.3;
    select("#defaultCanvas0").style("height", logo.size + "px")
    select("#defaultCanvas0").style("width", logo.size + "px")
    // console.log(logo)
    workAnim(logo)

    for (var i = 0; i < works.length; i++) {
        workAnim(works[i])
    }
    for (var i = 0; i < others.length; i++) {
        workAnim(others[i])
    }
    // rect(grid[1].x,grid[1].y,80,80)
}
//----------------------------------------------------------------

function workAnim(object) {
    object.diff = object.target.size - object.size;
    object.size += object.diff * 0.3;
    // console.log(object.target.pos)
    var temp = p5.Vector.sub(object.target.pos, object.pos)
    object.pos.add(temp.mult(0.3));
    if (object.img) {
        object.img.position(object.pos.x, object.pos.y)
        object.img.size(object.size, object.size)
    }


}

function unfold() {
    if (!unfolded) {
        collapse();
    } else {
        withdraw();
    }
    unfolded = !unfolded;
}

function collapse() {
    logo.target.pos.x = grid[0][0].x;
    logo.target.pos.y = grid[0][0].y;
    logo.target.size = grid[0][0].doubleSize;
    var rand = floor(random(3));
    for (var i = 0; i < works.length; i++) {
        works[i].target.size = grid[0][i % row].size;
        if (mobile) {
            // console.log(Math.floor(i / 5) + " " + Math.floor(i % col))
            works[i].target.pos.x = grid[0][Math.floor(i % row)].x; //step*index+start
            works[i].target.pos.y = grid[Math.floor(i / row) + 2][0].y;
        } else {
            works[i].target.pos.x = grid[0][Math.floor((i % (col - 2)) + 4)].x; //step*index+start
            works[i].target.pos.y = grid[Math.floor(i / (col - 2)) + 1][0].y;

        }
    }
    others[0].target.size = grid[0][0].size;
    others[1].target.size = grid[0][0].size;
    if (mobile) {
        others[0].target.pos.x = grid[0][2].x; //step*index+start
        others[0].target.pos.y = grid[0][2].y;
        others[1].target.pos.x = grid[1][2].x; //step*index+start
        others[1].target.pos.y = grid[1][2].y;
    } else {
        others[0].target.pos.x = grid[2][1].x; //step*index+start
        others[0].target.pos.y = grid[2][1].y;
        others[1].target.pos.x = grid[2][0].x; //step*index+start
        others[1].target.pos.y = grid[2][0].y;
    }
}

function withdraw() {
    logo.target.size = grid[0][0].size;
    for (var i = 0; i < works.length; i++) {
        works[i].target.size = grid[0][i % row].size;
        works[i].target.pos.x = logo.pos.x + width / ratioWorkSpacing * (i + 1); //border+offset
        works[i].target.pos.y = logo.pos.y + width / ratioWorkSpacing * (i + 1);
    }
    for (var i = 0; i < others.length; i++) {
        others[i].target.size = grid[0][i % row].size;
        others[i].target.pos.x = logo.pos.x + width / ratioWorkSpacing * (i + countOfWork); //border+offset
        others[i].target.pos.y = logo.pos.y + width / ratioWorkSpacing * (i + countOfWork);
    }
}
