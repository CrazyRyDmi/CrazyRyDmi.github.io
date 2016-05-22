/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _ThreeProxy = __webpack_require__(1);
	
	var _ThreeProxy2 = _interopRequireDefault(_ThreeProxy);
	
	var _baseFs = __webpack_require__(2);
	
	var _baseFs2 = _interopRequireDefault(_baseFs);
	
	var _baseVs = __webpack_require__(3);
	
	var _baseVs2 = _interopRequireDefault(_baseVs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var manager = new _ThreeProxy2.default.LoadingManager();
	var loader = new _ThreeProxy2.default.TextureLoader(manager);
	var texture = loader.load("images/Floor.jpg");
	texture.wrapS = _ThreeProxy2.default.MirroredRepeatWrapping;
	texture.wrapT = _ThreeProxy2.default.MirroredRepeatWrapping;
	var squareTex = loader.load("images/rsquare.png");
	squareTex.wrapS = _ThreeProxy2.default.MirroredRepeatWrapping;
	squareTex.wrapT = _ThreeProxy2.default.MirroredRepeatWrapping;
	var uniforms = {
	    texture: { type: "t", value: texture },
	    squareTex: { type: "t", value: squareTex }
	};
	var scene = new _ThreeProxy2.default.Scene();
	var shaderMaterial = new _ThreeProxy2.default.ShaderMaterial({
	    uniforms: uniforms,
	    vertexShader: _baseVs2.default,
	    fragmentShader: _baseFs2.default
	});
	var geometry = new _ThreeProxy2.default.PlaneGeometry(1.0, 0.7);
	var planeMesh = new _ThreeProxy2.default.Mesh(geometry, shaderMaterial);
	planeMesh.translateX(0.5);
	planeMesh.translateY(0.5);
	scene.add(planeMesh);
	// let textGeometry = new THREE.TextGeometry("Hello World!", {
	//     font: new THREE.Font("Tahoma"),
	//     size: 14,
	//     height: 10,
	//     curveSegments: null,
	//     bevelEnabled: false,
	//     bevelThickness: 10,
	//     bevelSize: 10
	// });
	// let textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: "red" }));
	// scene.add(textMesh);
	var renderer = new _ThreeProxy2.default.WebGLRenderer();
	renderer.setClearColor("black");
	document.body.appendChild(renderer.domElement);
	var camera = new _ThreeProxy2.default.OrthographicCamera(0.0, 1.0, 1.0, 0.0, -1.0, 1.0);
	var resize = function resize() {
	    // camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    // renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
	    renderer.setSize(window.innerWidth, window.innerHeight - 5);
	};
	var animate = function animate(time) {
	    camera.updateProjectionMatrix();
	    renderer.render(scene, camera);
	    requestAnimationFrame(animate);
	};
	window.onresize = resize;
	resize();
	animate(Date.now());

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = THREE;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "uniform sampler2D texture;\r\nuniform sampler2D squareTex;\r\nvarying vec2 texPos;\r\n\r\nvoid main() {\r\n    vec3 coord = normalize(gl_FragCoord.xyz);\r\n    vec4 texColor = texture2D( texture, texPos );\r\n    vec4 squareColor = texture2D(squareTex, texPos);\r\n\r\n    // gl_FragColor = texColor * squareColor * vec4(coord.x, coord.y, coord.z, 1.0);\r\n    gl_FragColor = texColor * vec4(coord.x, coord.y, coord.z, 1.0);\r\n}"

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "varying vec2 texPos;\r\n\r\nvoid main() {\r\n    texPos = position.xy;\r\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\r\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n}"

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map