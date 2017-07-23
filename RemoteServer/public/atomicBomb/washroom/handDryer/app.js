/*
  This is a generic "ThreeJS Application"
  helper which sets up a renderer and camera
  controls.
 */
// const THREE = require('three');
// const createControls = require('orbit-controls');
const assign = require('object-assign');

module.exports = createApp;

function createApp(opt) {
    opt = opt || {};
    var frame = 0;
    // Scale for retina
    const dpr = window.devicePixelRatio;

    // Our WebGL renderer with alpha and device-scaled
    const renderer = new THREE.WebGLRenderer(assign({
        antialias: true // default enabled
    }, opt));

    // Not available in old ThreeJS versions
    if (typeof renderer.setPixelRatio === 'function') {
        renderer.setPixelRatio(dpr);
    }

    // Show the <canvas> on screen
    const canvas = renderer.domElement;
    document.body.appendChild(canvas);

    // 3D camera looking
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 10000);
    const target = new THREE.Vector3();

    // 3D scene
    const scene = new THREE.Scene();


    // 3D orbit controller with damping
    // const controls = createControls(assign({
    //     canvas: canvas,
    //     theta: (0) * (Math.PI) / 180,
    //     phi: -90 * Math.PI / 180,
    //     distance: -1200,
    //     distanceBounds: [0, 50000]
    // }, opt));

    // Update frame size
    window.addEventListener('resize', resize);

    // Setup initial size
    resize();

    return {
        updateProjectionMatrix: updateProjectionMatrix,
        camera: camera,
        scene: scene,
        renderer: renderer,
        // controls: controls,
        canvas: canvas,
        frame: frame
    };

    function updateProjectionMatrix() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;
        // controls.rotateSpeed = 0.05
        // controls.damping = 0.05;
        // update camera controls
        // controls.update();
        // controls.zoomSpeed = 0.3;
        // //  controls.damping =0.01;
        camera.position.z=-100;
        // camera.up.fromArray(new THREE.Vector3( 0, 0, 0 ));
            camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
        // camera.lookAt(target.fromArray(controls.direction));
        // Update camera matrices
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    }

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateProjectionMatrix();
    }
}
