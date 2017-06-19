//var camera = new THREE.OrthographicCamera(innerWidth / -2, innerWidth, innerHeight / 2, innerHeight / -2,1,1000) ////1
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


//
// document.addEventListener('touchstart', touch, false);
// document.addEventListener('touchmove', touch, false);
// document.addEventListener('touchend', touch, false);

// function touch(event) {
//     var event = event || window.event;
//
//     var oInp = document.getElementById("inp");
//
//     switch (event.type) {
//         case "touchstart":
//             oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
//             break;
//         case "touchend":
//             oInp.innerHTML = "<br>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
//             break;
//         case "touchmove":
//             event.preventDefault();
//             oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
//             break;
//     }
//     console.log(1);
//
// }


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
    vertexShader: vShader.text(),
    fragmentShader: fShader.text(),
    depthTest:false,
    depthWrite: false,
});
var shaderMaterialForLine = new THREE.ShaderMaterial({ //6
    uniforms: uniforms,
    vertexShader: vShader.text(),
    fragmentShader: fShaderforline.text()
});
shaderMaterial.blendEquation = THREE.MaxEquation;
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
var MAX_POINTS = 2000;
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
console.log(geometry);


function createCanvasMaterial(color, size) {
    var matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    var matContext = matCanvas.getContext('2d');
    // create exture object from canvas.
    var texture = new THREE.Texture(matCanvas);
    // Draw a circle
    var center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
}


shaderMaterialForLine.transparent = true;
shaderMaterial.transparent = true;

var material = new THREE.PointsMaterial({
    // color: 0x888888,
    map: createCanvasMaterial('#88FFFF'  , 256),
    size: 100,
    transparent: true,
    opacity:0.1,
    depthWrite: false,
    depthTest:false
})
console.log(material)
material.blending = THREE.CustomBlending;
material.blendEquation = THREE.AddEquation; //default
material.blendSrc = THREE.SrcAlphaFactor; //default
material.blendDst = THREE.OneMinusDstAlphaFactor; //default
// shaderMaterial.blending = THREE.CustomBlending;
// shaderMaterial.blendEquation = THREE.SubtractEquation; //default
// shaderMaterial.blendSrc = THREE.OneMinusSrcColorFactor; //default
// shaderMaterial.blendDst = THREE.OneMinusDstAlphaFactor; //default
var line = new THREE.LineSegments(geometry, shaderMaterial);
var point = new THREE.Points(geometry, shaderMaterial );
// app.scene.add(line);
app.scene.add(point);
//console.log(line.geometry.attributes.position.needsUpdate);
//console.log(line.material);

positions = line.geometry.attributes.position.array;
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
createLoop(function(dt) {
    if (particles.length < MAX_POINTS) {
        particles.push(new Particle());
        particles.push(new Particle());
        particles.push(new Particle());
        particles.push(new Particle());
        particles.push(new Particle());
        particles.push(new Particle());
        particles.push(new Particle());

        particles.push(new Particle());
        particles.push(new Particle());
        particles.push(new Particle());

    }
    for (var i = 0; i < particles.length; i++) {
        //
        particles[i].update();
    }

    for (var i = 0; i < particles.length; i++) {
        if (particles[i].pos.z > 9000)
            particles.splice(i, 1)
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
