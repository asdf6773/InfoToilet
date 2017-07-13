var grid
var mobile
window.onload = function() {
    if (window.innerWidth <= window.innerHeight) {
        mobile = true;
    } else {
        mobile = false;
    }

    if (mobile)
        positionOnMobile();
    else {
        positionOnDestop();
    }
}

function positionOnDestop() {
    grid = new Grid(6, 3, window.innerWidth / 50)
    // $(".name").css("top", window.innerWidth / 50+"vw")
    $(".img").css("position", "absolute")
    $(".item").css("position", "absolute")
    $(".name").css("font-size", window.innerWidth / 80 + "px")
    $(".name").css("top", window.innerWidth / 16 + "px")
    $(".en").css("font-size", window.innerWidth / 104 + "px")
    $(".en").css("top", window.innerWidth / 13 + "px")
    $("#toilet").css("top", grid.grid[0][1].y + "px")
    $("#toilet").css("left", grid.grid[0][1].x + "px")
    $("#toilet").css("width", grid.grid[0][1].size + "px")

    $("#faucet").css("top", grid.grid[1][2].y + "px")
    $("#faucet").css("left", grid.grid[1][2].x + "px")
    $("#faucet").css("width", grid.grid[1][2].size + "px")

    $("#dryer").css("top", grid.grid[0][3].y + "px")
    $("#dryer").css("left", grid.grid[0][3].x + "px")
    $("#dryer").css("width", grid.grid[0][3].size + "px")

    $("#mirror").css("top", grid.grid[1][4].y + "px")
    $("#mirror").css("left", grid.grid[1][4].x + "px")
    $("#mirror").css("width", grid.grid[1][4].size + "px")

    $("#me").css("top", grid.grid[1][0].y + "px")
    $("#me").css("left", grid.grid[1][0].x + "px")
    $("#me").css("width", grid.grid[1][0].size + "px")

    $("#logo").css("top", grid.grid[0][0].y + "px")
    $("#logo").css("left", grid.grid[0][0].x + "px")
    $("#logo").css("width", grid.grid[0][0].size + "px")


    $("#catalog1").css("top", grid.grid[1][1].y + "px")
    $("#catalog1").css("left", grid.grid[1][1].x + "px")
    $("#catalog1").css("width", grid.grid[1][1].size + "px")

    $("#catalog2").css("top", grid.grid[0][2].y + "px")
    $("#catalog2").css("left", grid.grid[0][2].x + "px")
    $("#catalog2").css("width", grid.grid[0][2].size + "px")

    $("#catalog3").css("top", grid.grid[1][3].y + "px")
    $("#catalog3").css("left", grid.grid[1][3].x + "px")
    $("#catalog3").css("width", grid.grid[1][3].size + "px")

    $("#catalog4").css("top", grid.grid[0][4].y + "px")
    $("#catalog4").css("left", grid.grid[0][4].x + "px")
    $("#catalog4").css("width", grid.grid[0][4].size + "px")


    // $("#catalog5").css("top", grid.grid[4][0].y * 0.95 + "px")
    // $("#catalog5").css("left", grid.grid[4][0].x + "px")
    // $("#catalog5").css("width", grid.grid[4][0].size + "px")
    //
    // $("#catalog6").css("top", grid.grid[4][1].y * 0.95 + "px")
    // $("#catalog6").css("left", grid.grid[4][1].x + "px")
    // $("#catalog6").css("width", grid.grid[4][1].size + "px")
    $("body").css("height", grid.bodyHeight + "px")




    $("#nodejs")
        .css("bottom", grid.grid[2][5].size / 5 *0.6+ "px")
        .css("left", grid.grid[2][5].x * 1.06 + "px")
        .css("width", grid.grid[2][5].size * 0.5 + "px")
    $("#p5js")
        .css("bottom", grid.grid[2][5].size / 1.7*0.6 + "px")
        .css("left", grid.grid[2][5].x * 1.064 + "px")
        .css("width", grid.grid[2][5].size * 0.3 + "px")

    $("#powerby")
        // .css("width", 100 + "%")
        // .css("height", 100 + "px")
        // .css("text-align", "right")
        .css("position", "absolute")
        .css("left", grid.grid[2][5].x*1.063+ "px")
        .css("bottom", grid.grid[2][5].size / 1.15*0.6 + "px")

    $("#up1")
        .css("top", grid.grid[1][1].y + grid.grid[0][1].size * 0.20 + "px")
        .css("left", grid.grid[1][1].x + grid.grid[0][1].size * 0.42 + "px")
        .css("width", grid.grid[1][1].size * 0.1 + "px")
    $("#up2")
        .css("top", grid.grid[1][3].y + grid.grid[0][1].size * 0.20 + "px")
        .css("left", grid.grid[1][3].x + grid.grid[0][1].size * 0.42 + "px")
        .css("width", grid.grid[1][3].size * 0.1 + "px")
    $("#down1")
        .css("top", grid.grid[0][4].y + grid.grid[0][1].size * 0.6 + "px")
        .css("left", grid.grid[0][4].x + grid.grid[0][1].size * 0.42 + "px")
        .css("width", grid.grid[0][4].size * 0.1 + "px")
    $("#down2")
        .css("top", grid.grid[0][4].y + grid.grid[0][1].size * 0.6 + "px")
        .css("left", grid.grid[0][2].x + grid.grid[0][1].size * 0.42 + "px")
        .css("width", grid.grid[0][2].size * 0.1 + "px")


    $(".hori")
        .css("display", "none")





}

function positionOnMobile() {
    grid = new Grid(2, 5, 10)
    $(".name").css("top", +window.innerWidth / 5 + "px")
    $(".en").css("top", +window.innerWidth / 3.5 + "px")
    $(".img").css("position", "absolute")
    $(".item").css("position", "absolute")
    $("#toilet")
        .css("top", grid.grid[0][0].y + "px")
        .css("left", grid.grid[0][0].x + "px")
        .css("width", grid.grid[0][0].size + "px")

    $("#faucet")
        .css("top", grid.grid[1][1].y + "px")
        .css("left", grid.grid[1][1].x + "px")
        .css("width", grid.grid[1][1].size + "px")

    $("#dryer")
        .css("top", grid.grid[2][0].y + "px")
        .css("left", grid.grid[2][0].x + "px")
        .css("width", grid.grid[2][0].size + "px")

    $("#mirror")
        .css("top", grid.grid[3][1].y + "px")
        .css("left", grid.grid[3][1].x + "px")
        .css("width", grid.grid[3][1].size + "px")

    $("#me")
        .css("top", grid.grid[4][0].y + "px")
        .css("left", grid.grid[4][0].x + "px")
        .css("width", grid.grid[4][0].size + "px")

    $("#logo")
        .css("top", grid.grid[4][1].y + "px")
        .css("left", grid.grid[4][1].x + "px")
        .css("width", grid.grid[4][1].size + "px")


    $("#catalog1")
        .css("top", grid.grid[0][1].y + "px")
        .css("left", grid.grid[0][1].x + "px")
        .css("width", grid.grid[0][1].size + "px")

    $("#catalog2")
        .css("top", grid.grid[1][0].y + "px")
        .css("left", grid.grid[1][0].x + "px")
        .css("width", grid.grid[1][0].size + "px")

    $("#catalog3")
        .css("top", grid.grid[2][1].y + "px")
        .css("left", grid.grid[2][1].x + "px")
        .css("width", grid.grid[2][1].size + "px")

    $("#catalog4")
        .css("top", grid.grid[3][0].y + "px")
        .css("left", grid.grid[3][0].x + "px")
        .css("width", grid.grid[3][0].size + "px")


    $("#catalog5")
        .css("top", grid.grid[4][0].y * 0.95 + "px")
        .css("left", grid.grid[4][0].x + "px")
        .css("width", grid.grid[4][0].size + "px")

    $("#catalog6").css("top", grid.grid[4][1].y * 0.95 + "px")
        .css("left", grid.grid[4][1].x + "px")
        .css("width", grid.grid[4][1].size + "px")
    $("body").css("height", grid.bodyHeight * 1.1 + "px")

    $("#nodejs").css("top", grid.grid[4][1].y * 1.25 * 1.029 + "px")
        .css("left", grid.grid[4][1].x + "px")
        .css("width", grid.grid[4][1].size * 0.5 + "px")
    $("#p5js").css("top", grid.grid[4][1].y * 1.265 * 1.029 + "px")
        .css("left", grid.grid[4][1].x * 0.62 + "px")
        .css("width", grid.grid[4][1].size * 0.3 + "px")

    $("#powerby")
        .css("width", 100 + "%")
        .css("text-align", "center")
        .css("position", "absolute")
        .css("font-size",grid.grid[4][1].size/12 + "px")
        .css("top", grid.grid[4][1].y * 1.22 * 1.029 + "px")

    $("#left1")
        .css("top", grid.grid[0][1].y + grid.grid[0][1].size * 0.42 + "px")
        .css("left", grid.grid[0][1].x + "px")
        .css("width", grid.grid[0][1].size * 0.1 + "px")
    $("#right1")
        .css("top", grid.grid[1][0].y + grid.grid[0][1].size * 0.42 + "px")
        .css("left", grid.grid[1][0].x + grid.grid[1][0].size / 1.13 + "px")
        .css("width", grid.grid[1][0].size * 0.1 + "px")
    $("#left2")
        .css("top", grid.grid[2][1].y + grid.grid[0][1].size * 0.42 + "px")
        .css("left", grid.grid[2][1].x + "px")
        .css("width", grid.grid[2][1].size * 0.1 + "px")
    $("#right2")
        .css("top", grid.grid[3][0].y + grid.grid[0][1].size * 0.42 + "px")
        .css("left", grid.grid[3][0].x + grid.grid[1][0].size / 1.13 + "px")
        .css("width", grid.grid[3][0].size * 0.1 + "px")


    $(".vert")
        .css("display", "none")

}
