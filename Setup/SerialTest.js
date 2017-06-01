var listenPort = require("./listenPort-module")
listenPort.setup("COM19")

setInterval(function(){
  // console.log(listenPort.isOpen());
  listenPort.restart()
    // console.log(listenPort.isOpen());
},2000)
