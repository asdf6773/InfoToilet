(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
  This is a generic "ThreeJS Application"
  helper which sets up a renderer and camera
  controls.
 */
// const THREE = require('three');
const createControls = require('orbit-controls');
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
    const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 10000);
    const target = new THREE.Vector3();

    // 3D scene
    const scene = new THREE.Scene();


    // 3D orbit controller with damping
    const controls = createControls(assign({
        canvas: canvas,
        theta: (5) * (Math.PI) / 180,
        phi: -90 * Math.PI / 180,
        distance: 800,
        distanceBounds: [0, 50000]
    }, opt));

    // Update frame size
    window.addEventListener('resize', resize);

    // Setup initial size
    resize();

    return {
        updateProjectionMatrix: updateProjectionMatrix,
        camera: camera,
        scene: scene,
        renderer: renderer,
        controls: controls,
        canvas: canvas,
        frame: frame
    };

    function updateProjectionMatrix() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;
        controls.rotateSpeed = 0.05
        controls.damping = 0.05;
        // update camera controls
        controls.update();
        controls.zoomSpeed = 0.3;
        //  controls.damping =0.01;
        camera.position.fromArray(controls.position);
        camera.up.fromArray(controls.up);
        camera.lookAt(target.fromArray(controls.direction));
        // Update camera matrices
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    }

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateProjectionMatrix();
    }
}

},{"object-assign":23,"orbit-controls":24}],2:[function(require,module,exports){
//var camera = new THREE.OrthographicCamera(innerWidth / -2, innerWidth, innerHeight / 2, innerHeight / -2,1,1000) ////1
var createApp = require('./app')
var createLoop = require('raf-loop')
var app = createApp({
    antialias: true
});
var pMouseV = new THREE.Vector3(0.0, 0.0, 0.0);
var mouse = new THREE.Vector3(0.0, 0.0, 0.0);
var mouseV = new THREE.Vector3(0.0, 0.0, 0.0);
app.renderer.setClearColor('#000000', 1);
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
// var $ = require('jquery');
var Particle = require('./particles.js');



document.addEventListener('touchstart', touch, false);
document.addEventListener('touchmove', touch, false);
document.addEventListener('touchend', touch, false);

function touch(event) {
    var event = event || window.event;

    var oInp = document.getElementById("inp");

    switch (event.type) {
        case "touchstart":
            // oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
            break;
        case "touchend":
            // oInp.innerHTML = "<br>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
            break;
        case "touchmove":
            event.preventDefault();
            // oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
            break;
    }
    console.log(1);

}


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
    fragmentShader: fShader.text()
});
var shaderMaterialForLine = new THREE.ShaderMaterial({ //6
    uniforms: uniforms,
    vertexShader: vShader.text(),
    fragmentShader: fShaderforline.text()
});
var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 10000) ////1
camera.position.set(0, 0, 600);

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
var MAX_POINTS = 20000;
for (var i = 0; i < MAX_POINTS; i++) {
    particles.push(new Particle());
}

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

shaderMaterialForLine.transparent = true;
shaderMaterial.transparent = true;

var line = new THREE.LineSegments(geometry, shaderMaterialForLine);
var point = new THREE.Points(geometry, shaderMaterial);
app.scene.add(line);
app.scene.add(point);
//console.log(line.geometry.attributes.position.needsUpdate);
//console.log(line.material);

positions = line.geometry.attributes.position.array;
var x = y = z = index = 0;
for (var i = 0, l = MAX_POINTS; i < l; i++) {
    //    opacity[i] = 0.5;
    positions[index++] = particles[i].pos.x;
    positions[index++] = particles[i].pos.y;
    positions[index++] = particles[i].pos.z;
}
var n = 0;
// draw range
drawCount = 10000; // draw the first 2 points, only
geometry.setDrawRange(0, drawCount);

var cameraZ = 0;

//--------------------------renderer-----------------------
var time = 0;
createLoop(function(dt) {
    time += dt / 1000;
    mouse.x = 200 * Math.random();
    mouse.y = 200 * Math.random();
    mouse.z = 200 * Math.random();
    mouseV.x = mouse.x;
    mouseV.y = mouse.y;
    mouseV.z = mouse.z;
    for (var i = 0; i < particles.length; i++) {
        //  var mouseTemp = mouseV;
        var A = particles[i];
        dx = new THREE.Vector3().subVectors(A.pos, pMouseV);
        if (Math.abs(dx.x) < pushRad) {
            if (Math.abs(dx.y) < pushRad) {
                if (dx.length() < pushRad) {
                    //dx.normalize();
                    // A.f.add(PVector.mult(dx, 0.8));
                    //var temp = new THREE.Vector3().
                    //subVectors(mouseV, pMouseV);
                    //temp.subVectors(temp, A.vel);
                    //temp.multiplyScalar(1.5);
                    //A.vel.addVectors(A.vel, temp);
                    mouseV.sub(pMouseV);
                    mouseV.sub(A.vel);
                    mouseV.multiplyScalar(0.3);
                    A.vel.add(mouseV);
                }
            }
        }
        A.update();
    }
    index = 0;
    for (var i = 0, l = MAX_POINTS; i < l; i++) {
        positions[index++] = particles[i].pos.x;
        positions[index++] = particles[i].pos.y;
        positions[index++] = particles[i].pos.z;

    }
    geometry.attributes.position.needsUpdate = true;
    geometry.setDrawRange(0, MAX_POINTS);
    pMouseV.x = mouseV.x;
    pMouseV.y = mouseV.y;
    pMouseV.z = mouseV.z;
    app.updateProjectionMatrix();
   app.renderer.render(app.scene, app.camera);
app.frame+=0.1
  //  console.log(app.frame)
}).start();

// function update() { ///////why vector can't use=?
//     mouse.x = 200 * Math.random();
//     mouse.y = 200 * Math.random();
//     mouse.z = 200 * Math.random();
//     mouseV.x = mouse.x;
//     mouseV.y = mouse.y;
//     mouseV.z = mouse.z;
//     //  n = noise(frame);
//     //  console.log(particles[0].pos);
//     for (var i = 0; i < particles.length; i++) {
//         //  var mouseTemp = mouseV;
//         var A = particles[i];
//         dx = new THREE.Vector3().subVectors(A.pos, pMouseV);
//         if (Math.abs(dx.x) < pushRad) {
//             if (Math.abs(dx.y) < pushRad) {
//                 if (dx.length() < pushRad) {
//                     //dx.normalize();
//                     // A.f.add(PVector.mult(dx, 0.8));
//                     //var temp = new THREE.Vector3().
//                     //subVectors(mouseV, pMouseV);
//                     //temp.subVectors(temp, A.vel);
//                     //temp.multiplyScalar(1.5);
//                     //A.vel.addVectors(A.vel, temp);
//                     mouseV.sub(pMouseV);
//                     mouseV.sub(A.vel);
//                     mouseV.multiplyScalar(0.3);
//                     A.vel.add(mouseV);
//                 }
//             }
//         }
//         A.update();
//     }
//     index = 0;
//
//     //  console.log(mouseV);
//     app.camera.position.set(600 * Math.cos(frame), 0, 600 * Math.sin(frame));
//     app.camera.lookAt(new THREE.Vector3(0, 0, 0));
//     cameraZ += 1;
//     for (var i = 0, l = MAX_POINTS; i < l; i++) {
//         positions[index++] = particles[i].pos.x;
//         positions[index++] = particles[i].pos.y;
//         positions[index++] = particles[i].pos.z;
//
//     }
//
//     //    material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
//
//
//
//     //  console.log(line.material);
//
//     geometry.attributes.position.needsUpdate = true;
//     geometry.setDrawRange(0, MAX_POINTS);
//     pMouseV.x = mouseV.x;
//     pMouseV.y = mouseV.y;
//     pMouseV.z = mouseV.z;
//     app.renderer.render(scene, camera);
//     requestAnimationFrame(update);
//     frame += 0.001;
//     //console.log(mouse.x+' '+mouse.y);
//     //i = 0;
// }

//requestAnimationFrame(update);

},{"./app":1,"./particles.js":35,"raf-loop":30}],3:[function(require,module,exports){
module.exports = clamp

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

},{}],4:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],5:[function(require,module,exports){
module.exports = defaultProperty

function defaultProperty (get, set) {
  return {
    configurable: true,
    enumerable: true,
    get: get,
    set: set
  }
}

},{}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],7:[function(require,module,exports){
module.exports = invert

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert (out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
    dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
    invDot = dot ? 1.0 / dot : 0

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot
  out[1] = -a1 * invDot
  out[2] = -a2 * invDot
  out[3] = a3 * invDot
  return out
}

},{}],8:[function(require,module,exports){
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
module.exports = require('gl-vec4/normalize')

},{"gl-vec4/normalize":19}],9:[function(require,module,exports){
module.exports = distance

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1]
    return Math.sqrt(x*x + y*y)
}
},{}],10:[function(require,module,exports){
module.exports = add;

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0]
    out[1] = a[1] + b[1]
    out[2] = a[2] + b[2]
    return out
}
},{}],11:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}
},{}],12:[function(require,module,exports){
module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}
},{}],13:[function(require,module,exports){
module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
},{}],14:[function(require,module,exports){
module.exports = length;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return Math.sqrt(x*x + y*y + z*z)
}
},{}],15:[function(require,module,exports){
module.exports = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len)
        out[0] = a[0] * len
        out[1] = a[1] * len
        out[2] = a[2] * len
    }
    return out
}
},{}],16:[function(require,module,exports){
module.exports = set;

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}
},{}],17:[function(require,module,exports){
module.exports = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0]
    out[1] = a[1] - b[1]
    out[2] = a[2] - b[2]
    return out
}
},{}],18:[function(require,module,exports){
module.exports = transformQuat;

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx
    return out
}
},{}],19:[function(require,module,exports){
module.exports = normalize

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize (out, a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3]
  var len = x * x + y * y + z * z + w * w
  if (len > 0) {
    len = 1 / Math.sqrt(len)
    out[0] = x * len
    out[1] = y * len
    out[2] = z * len
    out[3] = w * len
  }
  return out
}

},{}],20:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],21:[function(require,module,exports){
var rootPosition = { left: 0, top: 0 }

module.exports = mouseEventOffset
function mouseEventOffset (ev, target, out) {
  target = target || ev.currentTarget || ev.srcElement
  if (!Array.isArray(out)) {
    out = [ 0, 0 ]
  }
  var cx = ev.clientX || 0
  var cy = ev.clientY || 0
  var rect = getBoundingClientOffset(target)
  out[0] = cx - rect.left
  out[1] = cy - rect.top
  return out
}

function getBoundingClientOffset (element) {
  if (element === window ||
      element === document ||
      element === document.body) {
    return rootPosition
  } else {
    return element.getBoundingClientRect()
  }
}

},{}],22:[function(require,module,exports){
'use strict'

var toPX = require('to-px')

module.exports = mouseWheelListen

function mouseWheelListen(element, callback, noScroll) {
  if(typeof element === 'function') {
    noScroll = !!callback
    callback = element
    element = window
  }
  var lineHeight = toPX('ex', element)
  var listener = function(ev) {
    if(noScroll) {
      ev.preventDefault()
    }
    var dx = ev.deltaX || 0
    var dy = ev.deltaY || 0
    var dz = ev.deltaZ || 0
    var mode = ev.deltaMode
    var scale = 1
    switch(mode) {
      case 1:
        scale = lineHeight
      break
      case 2:
        scale = window.innerHeight
      break
    }
    dx *= scale
    dy *= scale
    dz *= scale
    if(dx || dy || dz) {
      return callback(dx, dy, dz, ev)
    }
  }
  element.addEventListener('wheel', listener)
  return listener
}

},{"to-px":33}],23:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],24:[function(require,module,exports){
var defined = require('defined')
var clamp = require('clamp')

var inputEvents = require('./lib/input')
var quatFromVec3 = require('quat-from-unit-vec3')
var quatInvert = require('gl-quat/invert')

var glVec3 = {
  length: require('gl-vec3/length'),
  add: require('gl-vec3/add'),
  subtract: require('gl-vec3/subtract'),
  transformQuat: require('gl-vec3/transformQuat'),
  copy: require('gl-vec3/copy'),
  normalize: require('gl-vec3/normalize'),
  cross: require('gl-vec3/cross')
}

var Y_UP = [0, 1, 0]
var EPSILON = Math.pow(2, -23)
var tmpVec3 = [0, 0, 0]

module.exports = createOrbitControls
function createOrbitControls (opt) {
  opt = opt || {}

  var inputDelta = [0, 0, 0] // x, y, zoom
  var offset = [0, 0, 0]

  var upQuat = [0, 0, 0, 1]
  var upQuatInverse = upQuat.slice()

  var controls = {
    update: update,
    copyInto: copyInto,

    position: opt.position ? opt.position.slice() : [0, 0, 1],
    direction: [0, 0, -1],
    up: opt.up ? opt.up.slice() : [0, 1, 0],

    target: opt.target ? opt.target.slice() : [0, 0, 0],
    phi: defined(opt.phi, Math.PI / 2),
    theta: opt.theta || 0,
    distance: defined(opt.distance, 1),
    damping: defined(opt.damping, 0.25),
    rotateSpeed: defined(opt.rotateSpeed, 0.28),
    zoomSpeed: defined(opt.zoomSpeed, 0.0075),
    pinchSpeed: defined(opt.pinchSpeed, 0.0075),

    pinch: opt.pinching !== false,
    zoom: opt.zoom !== false,
    rotate: opt.rotate !== false,

    phiBounds: opt.phiBounds || [0, Math.PI],
    thetaBounds: opt.thetaBounds || [-Infinity, Infinity],
    distanceBounds: opt.distanceBounds || [0, Infinity]
  }

  // Compute distance if not defined in user options
  if (typeof opt.distance !== 'number') {
    glVec3.subtract(tmpVec3, controls.position, controls.target)
    controls.distance = glVec3.length(tmpVec3)
  }

  // Apply an initial phi and theta
  applyPhiTheta()

  const input = inputEvents({
    parent: opt.parent || window,
    element: opt.element,
    rotate: opt.rotate !== false ? inputRotate : null,
    zoom: opt.zoom !== false ? inputZoom : null,
    pinch: opt.pinch !== false ? inputPinch : null
  })

  controls.enable = input.enable
  controls.disable = input.disable

  return controls

  function inputRotate (dx, dy) {
    var PI2 = Math.PI * 2
    inputDelta[0] -= PI2 * dx * controls.rotateSpeed
    inputDelta[1] -= PI2 * dy * controls.rotateSpeed
  }

  function inputZoom (delta) {
    inputDelta[2] += delta * controls.zoomSpeed
  }

  function inputPinch (delta) {
    inputDelta[2] -= delta * controls.pinchSpeed
  }

  function update () {
    var cameraUp = controls.up || Y_UP
    quatFromVec3(upQuat, cameraUp, Y_UP)
    quatInvert(upQuatInverse, upQuat)

    var distance = controls.distance

    glVec3.subtract(offset, controls.position, controls.target)
    glVec3.transformQuat(offset, offset, upQuat)

    var theta = Math.atan2(offset[0], offset[2])
    var phi = Math.atan2(Math.sqrt(offset[0] * offset[0] + offset[2] * offset[2]), offset[1])

    theta += inputDelta[0]
    phi += inputDelta[1]

    theta = clamp(theta, controls.thetaBounds[0], controls.thetaBounds[1])
    phi = clamp(phi, controls.phiBounds[0], controls.phiBounds[1])
    phi = clamp(phi, EPSILON, Math.PI - EPSILON)

    distance += inputDelta[2]
    distance = clamp(distance, controls.distanceBounds[0], controls.distanceBounds[1])

    var radius = Math.abs(distance) <= EPSILON ? EPSILON : distance
    offset[0] = radius * Math.sin(phi) * Math.sin(theta)
    offset[1] = radius * Math.cos(phi)
    offset[2] = radius * Math.sin(phi) * Math.cos(theta)

    controls.phi = phi
    controls.theta = theta
    controls.distance = distance

    glVec3.transformQuat(offset, offset, upQuatInverse)
    glVec3.add(controls.position, controls.target, offset)
    camLookAt(controls.direction, cameraUp, controls.position, controls.target)

    var damp = typeof controls.damping === 'number' ? controls.damping : 1
    for (var i = 0; i < inputDelta.length; i++) {
      inputDelta[i] *= 1 - damp
    }
  }

  function copyInto (position, direction, up) {
    if (position) glVec3.copy(position, controls.position)
    if (direction) glVec3.copy(direction, controls.direction)
    if (up) glVec3.copy(up, controls.up)
  }

  function applyPhiTheta () {
    var dist = Math.max(EPSILON, controls.distance)
    controls.position[0] = dist * Math.sin(controls.phi) * Math.sin(controls.theta)
    controls.position[1] = dist * Math.cos(controls.phi)
    controls.position[2] = dist * Math.sin(controls.phi) * Math.cos(controls.theta)
    glVec3.add(controls.position, controls.position, controls.target)
  }
}

function camLookAt (direction, up, position, target) {
  glVec3.copy(direction, target)
  glVec3.subtract(direction, direction, position)
  glVec3.normalize(direction, direction)
}

},{"./lib/input":25,"clamp":3,"defined":4,"gl-quat/invert":7,"gl-vec3/add":10,"gl-vec3/copy":11,"gl-vec3/cross":12,"gl-vec3/length":14,"gl-vec3/normalize":15,"gl-vec3/subtract":17,"gl-vec3/transformQuat":18,"quat-from-unit-vec3":29}],25:[function(require,module,exports){
var mouseWheel = require('mouse-wheel')
var eventOffset = require('mouse-event-offset')
var createPinch = require('touch-pinch')

module.exports = inputEvents
function inputEvents (opt) {
  var element = opt.element || window
  var parent = opt.parent || element
  var mouseStart = [0, 0]
  var dragging = false
  var tmp = [0, 0]
  var tmp2 = [0, 0]
  var pinch

  var zoomFn = opt.zoom
  var rotateFn = opt.rotate
  var pinchFn = opt.pinch
  var mouseWheelListener
  var enabled = false
  enable()

  return {
    enable: enable,
    disable: disable
  }

  function enable () {
    if (enabled) return
    enabled = true
    if (zoomFn) {
      mouseWheelListener = mouseWheel(element, function (dx, dy) {
        zoomFn(dy)
      }, true)
    }

    if (rotateFn) {
      // for dragging to work outside canvas bounds,
      // mouse events have to be added to parent
      parent.addEventListener('mousedown', onInputDown, false)
      parent.addEventListener('mousemove', onInputMove, false)
      parent.addEventListener('mouseup', onInputUp, false)
    }

    if (rotateFn || pinchFn) {
      pinch = createPinch(element)

      // don't allow simulated mouse events
      element.addEventListener('touchstart', preventDefault, false)

      if (rotateFn) {
        element.addEventListener('touchmove', onTouchMove, false)
        pinch.on('place', onPinchPlace)
        pinch.on('lift', onPinchLift)
      }
      if (pinchFn) {
        pinch.on('change', onPinchChange)
      }
    }
  }

  function disable () {
    if (!enabled) return
    enabled = false
    if (mouseWheelListener) {
      element.removeEventListener('wheel', mouseWheelListener)
    }
    if (pinch) {
      pinch.disable()
      element.removeEventListener('touchstart', preventDefault, false)
      if (rotateFn) {
        element.removeEventListener('touchmove', onTouchMove, false)
      }
    }
    if (rotateFn) {
      parent.removeEventListener('mousedown', onInputDown, false)
      parent.removeEventListener('mousemove', onInputMove, false)
      parent.removeEventListener('mouseup', onInputUp, false)
    }
  }

  function preventDefault (ev) {
    ev.preventDefault()
  }

  function onTouchMove (ev) {
    if (!dragging || isPinching()) return

    // find currently active finger
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var changed = ev.changedTouches[i]
      var idx = pinch.indexOfTouch(changed)
      // if pinch is disabled but rotate enabled,
      // only allow first finger to affect rotation
      var allow = pinchFn ? idx !== -1 : idx === 0
      if (allow) {
        onInputMove(changed)
        break
      }
    }
  }

  function onPinchPlace (newFinger, lastFinger) {
    dragging = !isPinching()
    if (dragging) {
      var firstFinger = lastFinger || newFinger
      onInputDown(firstFinger)
    }
  }

  function onPinchLift (lifted, remaining) {
    dragging = !isPinching()
    if (dragging && remaining) {
      eventOffset(remaining, element, mouseStart)
    }
  }

  function isPinching () {
    return pinch.pinching && pinchFn
  }

  function onPinchChange (current, prev) {
    pinchFn(current - prev)
  }

  function onInputDown (ev) {
    eventOffset(ev, element, mouseStart)
    if (insideBounds(mouseStart)) {
      dragging = true
    }
  }

  function onInputUp () {
    dragging = false
  }

  function onInputMove (ev) {
    var end = eventOffset(ev, element, tmp)
    if (pinch && isPinching()) {
      mouseStart = end
      return
    }
    if (!dragging) return
    var rect = getClientSize(tmp2)
    var dx = (end[0] - mouseStart[0]) / rect[0]
    var dy = (end[1] - mouseStart[1]) / rect[1]
    rotateFn(dx, dy)
    mouseStart[0] = end[0]
    mouseStart[1] = end[1]
  }

  function insideBounds (pos) {
    if (element === window ||
        element === document ||
        element === document.body) {
      return true
    } else {
      var rect = element.getBoundingClientRect()
      return pos[0] >= 0 && pos[1] >= 0 &&
        pos[0] < rect.width && pos[1] < rect.height
    }
  }

  function getClientSize (out) {
    var source = element
    if (source === window ||
        source === document ||
        source === document.body) {
      source = document.documentElement
    }
    out[0] = source.clientWidth
    out[1] = source.clientHeight
    return out
  }
}

},{"mouse-event-offset":21,"mouse-wheel":22,"touch-pinch":34}],26:[function(require,module,exports){
module.exports = function parseUnit(str, out) {
    if (!out)
        out = [ 0, '' ]

    str = String(str)
    var num = parseFloat(str, 10)
    out[0] = num
    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
    return out
}
},{}],27:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))
},{"_process":28}],28:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],29:[function(require,module,exports){
// Original implementation:
// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final

var dot = require('gl-vec3/dot')
var set = require('gl-vec3/set')
var normalize = require('gl-quat/normalize')
var cross = require('gl-vec3/cross')

var tmp = [0, 0, 0]
var EPS = 1e-6

module.exports = quatFromUnitVec3
function quatFromUnitVec3 (out, a, b) {
  // assumes a and b are normalized
  var r = dot(a, b) + 1
  if (r < EPS) {
    /* If u and v are exactly opposite, rotate 180 degrees
     * around an arbitrary orthogonal axis. Axis normalisation
     * can happen later, when we normalise the quaternion. */
    r = 0
    if (Math.abs(a[0]) > Math.abs(a[2])) {
      set(tmp, -a[1], a[0], 0)
    } else {
      set(tmp, 0, -a[2], a[1])
    }
  } else {
    /* Otherwise, build quaternion the standard way. */
    cross(tmp, a, b)
  }

  out[0] = tmp[0]
  out[1] = tmp[1]
  out[2] = tmp[2]
  out[3] = r
  normalize(out, out)
  return out
}

},{"gl-quat/normalize":8,"gl-vec3/cross":12,"gl-vec3/dot":13,"gl-vec3/set":16}],30:[function(require,module,exports){
var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter
var now = require('right-now')
var raf = require('raf')

module.exports = Engine
function Engine(fn) {
    if (!(this instanceof Engine)) 
        return new Engine(fn)
    this.running = false
    this.last = now()
    this._frame = 0
    this._tick = this.tick.bind(this)

    if (fn)
        this.on('tick', fn)
}

inherits(Engine, EventEmitter)

Engine.prototype.start = function() {
    if (this.running) 
        return
    this.running = true
    this.last = now()
    this._frame = raf(this._tick)
    return this
}

Engine.prototype.stop = function() {
    this.running = false
    if (this._frame !== 0)
        raf.cancel(this._frame)
    this._frame = 0
    return this
}

Engine.prototype.tick = function() {
    this._frame = raf(this._tick)
    var time = now()
    var dt = time - this.last
    this.emit('tick', dt)
    this.last = time
}
},{"events":6,"inherits":20,"raf":31,"right-now":32}],31:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":27}],32:[function(require,module,exports){
(function (global){
module.exports =
  global.performance &&
  global.performance.now ? function now() {
    return performance.now()
  } : Date.now || function now() {
    return +new Date
  }

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],33:[function(require,module,exports){
'use strict'

var parseUnit = require('parse-unit')

module.exports = toPX

var PIXELS_PER_INCH = 96

function getPropertyInPX(element, prop) {
  var parts = parseUnit(getComputedStyle(element).getPropertyValue(prop))
  return parts[0] * toPX(parts[1], element)
}

//This brutal hack is needed
function getSizeBrutal(unit, element) {
  var testDIV = document.createElement('div')
  testDIV.style['font-size'] = '128' + unit
  element.appendChild(testDIV)
  var size = getPropertyInPX(testDIV, 'font-size') / 128
  element.removeChild(testDIV)
  return size
}

function toPX(str, element) {
  element = element || document.body
  str = (str || 'px').trim().toLowerCase()
  if(element === window || element === document) {
    element = document.body 
  }
  switch(str) {
    case '%':  //Ambiguous, not sure if we should use width or height
      return element.clientHeight / 100.0
    case 'ch':
    case 'ex':
      return getSizeBrutal(str, element)
    case 'em':
      return getPropertyInPX(element, 'font-size')
    case 'rem':
      return getPropertyInPX(document.body, 'font-size')
    case 'vw':
      return window.innerWidth/100
    case 'vh':
      return window.innerHeight/100
    case 'vmin':
      return Math.min(window.innerWidth, window.innerHeight) / 100
    case 'vmax':
      return Math.max(window.innerWidth, window.innerHeight) / 100
    case 'in':
      return PIXELS_PER_INCH
    case 'cm':
      return PIXELS_PER_INCH / 2.54
    case 'mm':
      return PIXELS_PER_INCH / 25.4
    case 'pt':
      return PIXELS_PER_INCH / 72
    case 'pc':
      return PIXELS_PER_INCH / 6
  }
  return 1
}
},{"parse-unit":26}],34:[function(require,module,exports){
var getDistance = require('gl-vec2/distance')
var EventEmitter = require('events').EventEmitter
var dprop = require('dprop')
var eventOffset = require('mouse-event-offset')

module.exports = touchPinch
function touchPinch (target) {
  target = target || window

  var emitter = new EventEmitter()
  var fingers = [ null, null ]
  var activeCount = 0

  var lastDistance = 0
  var ended = false
  var enabled = false

  // some read-only values
  Object.defineProperties(emitter, {
    pinching: dprop(function () {
      return activeCount === 2
    }),

    fingers: dprop(function () {
      return fingers
    })
  })

  enable()
  emitter.enable = enable
  emitter.disable = disable
  emitter.indexOfTouch = indexOfTouch
  return emitter

  function indexOfTouch (touch) {
    var id = touch.identifier
    for (var i = 0; i < fingers.length; i++) {
      if (fingers[i] &&
        fingers[i].touch &&
        fingers[i].touch.identifier === id) {
        return i
      }
    }
    return -1
  }

  function enable () {
    if (enabled) return
    enabled = true
    target.addEventListener('touchstart', onTouchStart, false)
    target.addEventListener('touchmove', onTouchMove, false)
    target.addEventListener('touchend', onTouchRemoved, false)
    target.addEventListener('touchcancel', onTouchRemoved, false)
  }

  function disable () {
    if (!enabled) return
    enabled = false
    activeCount = 0
    fingers[0] = null
    fingers[1] = null
    lastDistance = 0
    ended = false
    target.removeEventListener('touchstart', onTouchStart, false)
    target.removeEventListener('touchmove', onTouchMove, false)
    target.removeEventListener('touchend', onTouchRemoved, false)
    target.removeEventListener('touchcancel', onTouchRemoved, false)
  }

  function onTouchStart (ev) {
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var newTouch = ev.changedTouches[i]
      var id = newTouch.identifier
      var idx = indexOfTouch(id)

      if (idx === -1 && activeCount < 2) {
        var first = activeCount === 0

        // newest and previous finger (previous may be undefined)
        var newIndex = fingers[0] ? 1 : 0
        var oldIndex = fingers[0] ? 0 : 1
        var newFinger = new Finger()

        // add to stack
        fingers[newIndex] = newFinger
        activeCount++

        // update touch event & position
        newFinger.touch = newTouch
        eventOffset(newTouch, target, newFinger.position)

        var oldTouch = fingers[oldIndex] ? fingers[oldIndex].touch : undefined
        emitter.emit('place', newTouch, oldTouch)

        if (!first) {
          var initialDistance = computeDistance()
          ended = false
          emitter.emit('start', initialDistance)
          lastDistance = initialDistance
        }
      }
    }
  }

  function onTouchMove (ev) {
    var changed = false
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var movedTouch = ev.changedTouches[i]
      var idx = indexOfTouch(movedTouch)
      if (idx !== -1) {
        changed = true
        fingers[idx].touch = movedTouch // avoid caching touches
        eventOffset(movedTouch, target, fingers[idx].position)
      }
    }

    if (activeCount === 2 && changed) {
      var currentDistance = computeDistance()
      emitter.emit('change', currentDistance, lastDistance)
      lastDistance = currentDistance
    }
  }

  function onTouchRemoved (ev) {
    for (var i = 0; i < ev.changedTouches.length; i++) {
      var removed = ev.changedTouches[i]
      var idx = indexOfTouch(removed)

      if (idx !== -1) {
        fingers[idx] = null
        activeCount--
        var otherIdx = idx === 0 ? 1 : 0
        var otherTouch = fingers[otherIdx] ? fingers[otherIdx].touch : undefined
        emitter.emit('lift', removed, otherTouch)
      }
    }

    if (!ended && activeCount !== 2) {
      ended = true
      emitter.emit('end')
    }
  }

  function computeDistance () {
    if (activeCount < 2) return 0
    return getDistance(fingers[0].position, fingers[1].position)
  }
}

function Finger () {
  this.position = [0, 0]
  this.touch = null
}

},{"dprop":5,"events":6,"gl-vec2/distance":9,"mouse-event-offset":21}],35:[function(require,module,exports){
function Particle() {
    //   var acc, pos, frc;
    this.radius = 500;
    //   this.theta = Math.PI * Math.random() - Math.PI / 2;
    //   this.phi = 2 * Math.PI * Math.random();
    //   this.x = Math.cos(this.theta) * Math.cos(this.phi) * this.radius;
    //   this.y = Math.sin(this.theta) * this.radius;
    //   this.z = Math.sin(this.phi) * Math.cos(this.theta) * this.radius;
    this.x = this.radius * Math.random() - this.radius / 2;
    this.y = this.radius * Math.random() - this.radius / 2;
    this.z = this.radius * Math.random() - this.radius / 2

    this.temp = new THREE.Vector3(this.x, this.y, this.z);

    if (this.temp.length() < this.radius/2) {

        this.pos = new THREE.Vector3(this.x, this.y, this.z);
    } else {

        this.pos = new THREE.Vector3(this.x / 10, this.y / 10, this.z / 10);
    }



    //  this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3(0, 0, 0);
    this.acc = new THREE.Vector3(0, 0, 0);
    this.update = function() {
        this.vel.addVectors(this.vel, this.acc);
        this.pos.addVectors(this.pos, this.vel);
        this.acc.multiplyScalar(0);
    }
}
module.exports = Particle;
},{}]},{},[2]);
