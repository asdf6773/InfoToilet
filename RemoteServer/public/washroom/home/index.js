window.onload = function() {
    var grid = new Grid(2, 5, 10)
console.log(grid.grid[0][0])
$(".img").css("position","absolute")
$(".item").css("position","absolute")
$("#toilet").css("top",grid.grid[0][0].y+"px")
$("#toilet").css("left",grid.grid[0][0].x+"px")
$("#toilet").css("width",grid.grid[0][0].size+"px")

$("#faucet").css("top",grid.grid[1][1].y+"px")
$("#faucet").css("left",grid.grid[1][1].x+"px")
$("#faucet").css("width",grid.grid[1][1].size+"px")

$("#dryer").css("top",grid.grid[2][0].y+"px")
$("#dryer").css("left",grid.grid[2][0].x+"px")
$("#dryer").css("width",grid.grid[2][0].size+"px")

$("#mirror").css("top",grid.grid[3][1].y+"px")
$("#mirror").css("left",grid.grid[3][1].x+"px")
$("#mirror").css("width",grid.grid[3][1].size+"px")

$("#me").css("top",grid.grid[4][0].y+"px")
$("#me").css("left",grid.grid[4][0].x+"px")
$("#me").css("width",grid.grid[4][0].size+"px")

$("#logo").css("top",grid.grid[4][1].y+"px")
$("#logo").css("left",grid.grid[4][1].x+"px")
$("#logo").css("width",grid.grid[4][1].size+"px")


$("#catalog1").css("top",grid.grid[0][1].y+"px")
$("#catalog1").css("left",grid.grid[0][1].x+"px")
$("#catalog1").css("width",grid.grid[0][1].size+"px")

$("#catalog2").css("top",grid.grid[1][0].y+"px")
$("#catalog2").css("left",grid.grid[1][0].x+"px")
$("#catalog2").css("width",grid.grid[1][0].size+"px")

$("#catalog3").css("top",grid.grid[2][1].y+"px")
$("#catalog3").css("left",grid.grid[2][1].x+"px")
$("#catalog3").css("width",grid.grid[2][1].size+"px")

$("#catalog4").css("top",grid.grid[3][0].y+"px")
$("#catalog4").css("left",grid.grid[3][0].x+"px")
$("#catalog4").css("width",grid.grid[3][0].size+"px")


$("#catalog5").css("top",grid.grid[4][0].y*0.95+"px")
$("#catalog5").css("left",grid.grid[4][0].x+"px")
$("#catalog5").css("width",grid.grid[4][0].size+"px")

$("#catalog6").css("top",grid.grid[4][1].y*0.95+"px")
$("#catalog6").css("left",grid.grid[4][1].x+"px")
$("#catalog6").css("width",grid.grid[4][1].size+"px")
$("body").css("height",grid.bodyHeight+"px")

}
