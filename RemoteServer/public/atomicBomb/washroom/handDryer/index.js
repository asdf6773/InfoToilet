//var camera = new THREE.OrthographicCamera(innerWidth / -2, innerWidth, innerHeight / 2, innerHeight / -2,1,1000) ////1
// const THREE = require('three');
var createApp = require('./app')
var createLoop = require('raf-loop')
var app = createApp({
    antialias: true
});


var pMouseV = new THREE.Vector3(0.0, 0.0, 0.0);
var mouse = new THREE.Vector3(0.0, 0.0, 0.0);

var mouseV = new THREE.Vector3(0.0, 0.0, 0.0);
app.renderer.setClearColor('#ffffff', 1);
app.renderer.clearColor('#ffffff', 1);
/*
window.show_coords = function(event) {
    //<body onmousemove ="show_coords(event)">
    x = event.clientX;
    y = event.clientY;
    mouse.x = x - innerWidth / 2;
    mouse.y = -y + innerHeight / 2;
    mouse.z = 200 * Math.random() - 100;
    //  console.log(x + ' ' + y);
}
*/
window.show_coords = function(event) {
    //<body onmousemove ="show_coords(event)">
    x = event.clientX;
    y = event.clientY;
    mouse.x = 200 * Math.random();
    mouse.y = 200 * Math.random();
    mouse.z = 200 * Math.random() - 100;
    //  console.log(x + ' ' + y);
}
var $ = require('jquery');
var Particle = require('./particles.js');





//var THREE = require('three');
var vShader = $('#vertexshader');
var fShader = $('#fragmentshader');
var fShaderforline = $('#fragmentshaderforline');
var uniforms = {
    amplitude: {
        type: 'float',
        value: 0
    },
    mouse: {
        type: 'vec2',
        value: new THREE.Vector2(0, 0)
    },
    seed: {
        type: 'float',
        value: 0.001
    }
}
var shaderMaterial = new THREE.ShaderMaterial({ //6
    uniforms: uniforms,
    transparent: true,
    // color:"#333333",
    vertexShader: vShader.text(),
    fragmentShader: fShader.text(),
    side: THREE.BackSide,
    blending: 5,
    depthTest: false,
    depthWrite: false,
    alphaTest: 1,
    // overdraw:1,
    opacity: 0.8,
    // colorWrite:false
    needsUpdate: true
});
// shaderMaterial.blending = THREE.CustomBlending;
// shaderMaterial.blendEquation = THREE.AddEquation; //default
// shaderMaterial.blendSrc = THREE.SrcAlphaFactor; //default
// shaderMaterial.blendDst = THREE.OneMinusDstAlphaFactor; //default

var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 10000) ////1
camera.position.set(0, 0, 1200);

var scene = new THREE.Scene(); //2
var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(0, 0, 0);
scene.add(light);
var renderer = new THREE.WebGLRenderer();
scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const RADIUS = 50;
const SEGMENTS = 10;
const RINGS = 10;
var particles = [];
var MAX_POINTS = 10000;
// for (var i = 0; i < MAX_POINTS; i++) {
//     particles.push(new Particle());
// }

var dx = new THREE.Vector3(0.0, 0.0, 0.0);

var frame = 0;
var seed = 588.0; //
var pushRad = 10;

var geometry = new THREE.BufferGeometry();
var positions = new Float32Array(MAX_POINTS * 3);
var attrib = new THREE.BufferAttribute(positions, 3);
geometry.addAttribute('position', attrib);
geometry.addAttribute('pp', new THREE.BufferAttribute(undefined, 3));
//geometry.attributes.pp.array = positions;
var pp = geometry.getAttribute('pp')
pp.array = positions
// console.log(shaderMaterial);


var starsMaterial = new THREE.PointsMaterial({
    color: 0x88ffff,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    size: 100
})
starsMaterial.blending = THREE.CustomBlending;
starsMaterial.blendEquation = THREE.AddEquation; //default
starsMaterial.blendSrc = THREE.SrcAlphaFactor; //default
starsMaterial.blendDst = THREE.OneMinusDstAlphaFactor; //default
// var line = new THREE.LineSegments(geometry, shaderMaterialForLine);
var point = new THREE.Points(geometry, shaderMaterial);
// app.scene.add(line);
app.scene.add(point);
//console.log(line.geometry.attributes.position.needsUpdate);
//console.log(line.material);

// positions = line.geometry.attributes.position.array;
// var x = y = z = index = 0;
// for (var i = 0, l = MAX_POINTS; i < l; i++) {
//     //    opacity[i] = 0.5;
//     positions[index++] = particles[i].pos.x;
//     positions[index++] = particles[i].pos.y;
//     positions[index++] = particles[i].pos.z;
// }
var n = 0;
// draw range
drawCount = 10000; // draw the first 2 points, only
geometry.setDrawRange(0, particles.length);

var cameraZ = 800;

//--------------------------renderer-----------------------
var time = 0;
// var flag = false;

// document.onmousedown = function() {
//     flag = true;
//
// }
//
// document.onmouseup = function() {
//     flag = false;
//
// }
var increment = 10;
// document.addEventListener("touchstart", touchHandler, false);
// document.addEventListener("touchend", touchHandler2, false);
window.ondevicemotion = function(event) {
	var accelerationX = event.accelerationIncludingGravity.x;
	var accelerationY = event.accelerationIncludingGravity.y;
	var accelerationZ = event.accelerationIncludingGravity.z;
  // alert(accelerationZ)
}

function touchHandler() {
    flag = true;

}
function touchHandler2() {
    flag = false;

}
createLoop(function(dt) {
  console.log(flag)
    if (flag && increment > -2) {
        increment -= 1
    } else if (increment < 15) {
        increment += 0.1
    }
    // console.log(increment)

    if (particles.length < MAX_POINTS) {


        for (var i = 0; i < increment; i++) {
            particles.push(new Particle())
        }


    }
    for (var i = 0; i < particles.length; i++) {
        //
        particles[i].update(flag);
    }
    // console.log(particles[2].speed)
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].pos.z > 600 || particles[i].speed > 18) {
            // console.log("splice")
            particles.splice(i, 1)
        }

    }


    time += dt / 1000;
    mouse.x = 200 * Math.random();
    mouse.y = 200 * Math.random();
    mouse.z = 200 * Math.random();
    mouseV.x = mouse.x;
    mouseV.y = mouse.y;
    mouseV.z = mouse.z;
    // for (var i = 0; i < particles.length; i++) {
    //     //  var mouseTemp = mouseV;
    //     var A = particles[i];
    //     dx = new THREE.Vector3().subVectors(A.pos, pMouseV);
    //     if (Math.abs(dx.x) < pushRad) {
    //         if (Math.abs(dx.y) < pushRad) {
    //             if (dx.length() < pushRad) {
    //                 //dx.normalize();
    //                 // A.f.add(PVector.mult(dx, 0.8));
    //                 //var temp = new THREE.Vector3().
    //                 //subVectors(mouseV, pMouseV);
    //                 //temp.subVectors(temp, A.vel);
    //                 //temp.multiplyScalar(1.5);
    //                 //A.vel.addVectors(A.vel, temp);
    //                 mouseV.sub(pMouseV);
    //                 mouseV.sub(A.vel);
    //                 mouseV.multiplyScalar(0.3);
    //                 A.vel.add(mouseV);
    //             }
    //         }
    //     }
    //     A.update();
    // }
    index = 0;
    for (var i = 0, l = MAX_POINTS; i < particles.length; i++) {
        positions[index++] = particles[i].pos.x;
        positions[index++] = particles[i].pos.y;
        positions[index++] = particles[i].pos.z;

    }
    geometry.attributes.position.needsUpdate = true;
    geometry.setDrawRange(0, particles.length);
    pMouseV.x = mouseV.x;
    pMouseV.y = mouseV.y;
    pMouseV.z = mouseV.z;
    app.updateProjectionMatrix();
    app.renderer.render(app.scene, app.camera);
    app.frame += 0.1
    //  console.log(app.frame)
}).start();
