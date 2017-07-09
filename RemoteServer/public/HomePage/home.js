var unfolded;
var works = [];
var countOfWork;
var mask;
var logo;
var work;
var ratioLogoBorder;
var mobile;
var grid;
var others = []
var other;
var row, col, spacing;
var qr;

function homePreload() {
    qr = createImg('./lib/qr.png', "qr");

    if (width < height) {
        mobile = true;
    } else {
        mobile = false;
    }
    if (mobile) {
        row = 3
        col = 5
        spacing = window.innerWidth / 20;
        select("#name").style("font-size", 20 + "px")
        select("#name").style("top", spacing + "px")
        select("#name").style("right", spacing + "px");
    } else {
        row = 7
        col = 5
        spacing = window.innerWidth / 50
        select("#name").style("font-size", 50 + "px")
        select("#name").style("top", spacing + "px")
        select("#name").style("right", spacing + "px");

    }
    select("#footer").style("text-align", "left")
    select("#footer").style("bottom", +1.5 + "%")
    select("#footer").style("left", spacing + "px")
    grid = new Grid(row, col, spacing);
    // grid = new Grid(row, col, window.innerWidth / 20);
    //   grid = new Grid(6, 4, window.innerWidth / 50);
    console.log(grid)
    ratioLogoBorder = 60;
    ratioWorkSpacing = mobile === true ? 120 : 200;;
    logo = {
        maxSize: 400,
        minSize: 200,
        img: createImg('./lib/logo_white.png', "logo"),
        diff: 0,
        pos: createVector(grid[0][0].x, grid[0][0].y),
        size: 200,
        initSize: function() {
            if (mobile)
                return width / 2.5
            else
                return width / 4
        },
        target: {
            pos: createVector(width / ratioLogoBorder, width / ratioLogoBorder),
            size: 200,
        },
        init: function() {
            this.size = grid[0][0].size;
            this.target.size = grid[0][0].size;
            this.maxSize = grid[0][0].size;
            this.minSize = grid[0][0].size;
            this.img.position(logo.pos.x, logo.pos.y);
            this.img.mouseClicked(unfold);
            this.img.id("logo");
            this.img.style("z-index", 100)
        }
    }
    other = function(name, src) {
        var newOther = {
            id: countOfWork,
            name: name,
            img: createImg(src, "name"),
            diff: 0,
            pos: createVector(0, 0),
            size: 200,
            maxSize: 200,
            minSzie: 100,

            target: {
                pos: createVector(width / ratioLogoBorder, width / ratioLogoBorder),
                size: 200,
            },
            initSize: function() {
                if (mobile)
                    return width / 2.5
                else
                    return width / 4
            },
            init: function() {
                this.size = grid[0][this.id % row].size;
                this.maxSize = grid[0][this.id % row].size;
                this.minSize = grid[0][this.id % row].size;
                this.img.style("z-index", -this.id + 10)
                this.img.position(this.pos.x, this.pos.y)
                this.target.size = grid[0][this.id % row].size
                this.target.pos.x = logo.pos.x + width / ratioWorkSpacing * (this.id % row + 1);
                this.target.pos.y = logo.pos.y + width / ratioWorkSpacing * (this.id % row + 1);
                this.img.size(this.size, this.size);
            }
        };

        return newOther;
    }


    work = function(name, src) {
        var newWork = {
            id: countOfWork,
            name: name,
            img: createImg(src, "name"),
            diff: 0,
            pos: createVector(0, 0),
            size: 200,
            maxSize: 200,
            minSzie: 100,

            target: {
                pos: createVector(width / ratioLogoBorder, width / ratioLogoBorder),
                size: 200,
            },
            initSize: function() {
                if (mobile)
                    return width / 2.5
                else
                    return width / 4
            },
            init: function() {
                this.size = grid[0][this.id].size;
                this.maxSize = grid[0][this.id].size;
                this.minSize = grid[0][this.id].size;
                this.img.style("z-index", -this.id + 10)
                this.img.position(this.pos.x, this.pos.y)
                this.target.size = grid[0][this.id].size
                this.target.pos.x = logo.pos.x + width / ratioWorkSpacing * (this.id + 1);
                this.target.pos.y = logo.pos.y + width / ratioWorkSpacing * (this.id + 1);
                this.img.size(this.size, this.size);
            }
        };
        countOfWork += 1;
        return newWork;
    }

}

//---------------------------Setup---------------------------------
function homeSetup() {
    var qrSize = {
        width: width / 10,
        height: width / 10
    }

    qr.size(qrSize.width, qrSize.height)
    qr.position(width - qrSize.width - window.innerWidth / 50, height - qrSize.width - window.innerWidth / 50)
    countOfWork = 0;
    mask = createDiv("");
    mask.id("mask");
    mask.size(width, height);
    unfolded = false;
    works.push(new work("washroom", './lib/washroom.jpg'))
    works.push(new work("atomicBomb", './lib/atomicBomb.jpg'))
    works.push(new work("domino", './lib/domino.jpg'))

    others.push(new other("about", './lib/about.png'))
    others.push(new other("about", './lib/blog.png'))
    works[0].img.mouseClicked(function() {
        window.location = "http://artisticode.net/washroom"
    })
    works[1].img.mouseClicked(function() {
        window.location = "http://artisticode.net/atomicBomb"
    })
    works[2].img.mouseClicked(function() {
        window.location = "http://artisticode.net/domino"
    })
    others[0].img.mouseClicked(function() {
        window.location = "http://artisticode.net/me"
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
    logo.img.size(logo.size, logo.size);
    logo.diff = logo.target.size - logo.size;
    logo.size += logo.diff * 0.3;
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
    var temp = p5.Vector.sub(object.target.pos, object.pos)
    object.pos.add(temp.mult(0.3));
    object.img.position(object.pos.x, object.pos.y)
    object.img.size(object.size, object.size)
}


function unfold() {
    if (!unfolded) {
        logo.target.size = grid[0][0].doubleSize;
        var rand = floor(random(3));
        for (var i = 0; i < works.length; i++) {
            works[i].target.size = grid[0][i].size;
            if (mobile) {
                works[i].target.pos.x = grid[0][i].x; //step*index+start
                works[i].target.pos.y = grid[i % 2 == 0 ? 3 : 2][i].y;
            } else {
                works[i].target.pos.x = grid[0][i + 2].x; //step*index+start
                works[i].target.pos.y = grid[i % 2 == 0 ? 1 : 0][i].y;
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

        select('#mask').style("display", "block");
        unfolded = !unfolded;
    } else {
        logo.target.size = grid[0][0].size;
        for (var i = 0; i < works.length; i++) {
            works[i].target.size = grid[0][i].size;
            works[i].target.pos.x = logo.pos.x + width / ratioWorkSpacing * (i + 1); //border+offset
            works[i].target.pos.y = logo.pos.y + width / ratioWorkSpacing * (i + 1);
        }
        for (var i = 0; i < others.length; i++) {
            others[i].target.size = grid[0][i].size;
            others[i].target.pos.x = logo.pos.x + width / ratioWorkSpacing * (i + countOfWork); //border+offset
            others[i].target.pos.y = logo.pos.y + width / ratioWorkSpacing * (i + countOfWork);
        }
        select('#mask').style("display", "none");
        unfolded = !unfolded;
    }

}
