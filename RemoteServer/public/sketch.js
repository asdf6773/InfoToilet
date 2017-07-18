var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 10000) ////1
var scene = new THREE.Scene(); //2
//const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );; //3
var renderer = new THREE.WebGLRenderer();
//pointLight.position.x = 10;
//pointLight.position.y = 50;
//pointLight.position.z = 130;
scene.add(camera);
//scene.add(pointLight);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const RADIUS = 100;
const SEGMENTS = 200;
const RINGS = 200;


var mouse = new THREE.Vector2(0, 0);

function show_coords(event) {
    x = event.clientX;
    y = event.clientY;

    mouse.x = x;
    mouse.y = y;

}
//console.log(clientX);
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
var frame = 0;
//--------------------------------shader-----------------
var geometry = new THREE.SphereBufferGeometry(RADIUS, SEGMENTS, RINGS); //4
var seed = 588.0; //5
var vShader = $('#vertexshader');
var fShader = $('#fragmentshader');
var shaderMaterial = new THREE.ShaderMaterial({ //6
    uniforms: uniforms,
    vertexShader: vShader.text(),
    fragmentShader: fShader.text()
});
//for (var v = 0; v < displacement.length; v++) {
//  displacement[v] = Math.random() * 5;
//}
//geometry.addAttribute('seed', new THREE.BufferAttribute(seed, 1));
var sphere = new THREE.Mesh(geometry, shaderMaterial);
sphere.position.z = -300;
scene.add(sphere);
//--------------------------renderer-----------------------
function update() {
    uniforms.seed.value += 0.1;
    //sphere.rotation.x +=0.002;
      sphere.rotation.z+=0.002;
    //  sphere.rotation.y+=0.002;
    uniforms.mouse.value = mouse;
    //  console.log( uniforms.mouse.value);
    uniforms.amplitude.value = Math.sin(frame);
    renderer.render(scene, camera);
    requestAnimationFrame(update);
    frame += 0.1;
}
requestAnimationFrame(update);
