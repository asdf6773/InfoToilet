function FlowField(){
       xvec = floor((windowWidth+50) / scl);
       yvec = floor((windowHeight+50) / scl);
       flowfield = new Array(xvec * yvec);

       var yNoise = 0;
       for (var y = 0; y < yvec+1; y++) {
              var xNoise = 0;
              for (var x = 0; x < xvec+1; x++) {
                     var vecDirect = noise(xNoise, yNoise, time) * 2*(TWO_PI);
                     var dir = p5.Vector.fromAngle(vecDirect);
                     var index = x + y * xvec;
                     flowfield[index] = dir;
                     dir.setMag(3);
                     xNoise += noiseInc;
                     stroke(180);
                     push();
                     translate(x * scl, y * scl);
                     rotate(dir.heading());
                    //  line(0, 0, scl, 0);
                     pop();
              }
              yNoise += noiseInc;
              time += .0001;
       }
}
