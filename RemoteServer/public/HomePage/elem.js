var logo;
var work;
var other;

var Logo = function() {
    var newLogo = {
        maxSize: 400,
        minSize: 200,
        // img: createImg('./lib/logo_white.png', "logo"),
        diff: 0,
        img: select("#logo"),
        pos: createVector(grid[0][0].x, grid[0][0].y),
        size: 200,
        initSize: function() {
            if (mobile)
                return width / 2.5
            else
                return width / 4
        },
        target: {
            pos: createVector(grid[0][0].x, grid[0][0].y),
            size: 200,
        },
        init: function() {
          if(unfolded)

            this.target.size = grid[0][0].size;
            this.target.pos.x = grid[0][0].x;
            this.target.pos.y = grid[0][0].y;
            this.maxSize = grid[0][0].size;
            this.minSize = grid[0][0].size;
            this.pos = createVector(grid[0][0].x, grid[0][0].y);
        }
    }
    return newLogo
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
        img: createDiv(""),
        inner: createImg(src, "name"),
        diff: 0,
        pos: createVector(0, 0),
        size: 200,
        maxSize: 200,
        minSzie: 100,

        target: {
            pos: createVector(0, 0),
            size: 200,
        },
        init: function() {
            this.img.child(this.inner)
            this.inner.style("width", grid[0][0].size + "px")
            this.img.class("work")
            this.img.style("z-index", 100 - this.id)

        }
    };
    countOfWork += 1;
    return newWork;
}
console.log(work)
