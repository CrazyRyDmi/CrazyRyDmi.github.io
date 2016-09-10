// Include styles
import "../css/app.less";
// Include polyfills
import "babel-polyfill";

import THREE from "./ThreeProxy";

import base_fs from "../glsl/base.fs.glsl";
import base_vs from "../glsl/base.vs.glsl";

import loading_fs from "../glsl/LoadingEffects/loading.fs.glsl";
import loading_vs from "../glsl/LoadingEffects/loading.vs.glsl";

import floorImage from "../images/Floor.jpg";
import rsquareImage from "../images/rsquare.png";

let manager = new THREE.LoadingManager();
let loader = new THREE.TextureLoader(manager);

let texture = loader.load(floorImage);
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;

let squareTex = loader.load(rsquareImage);
squareTex.wrapS = THREE.MirroredRepeatWrapping;
squareTex.wrapT = THREE.MirroredRepeatWrapping;

let uniforms = {
    texture: { type: "t", value: texture },
    squareTex: { type: "t", value: squareTex }
};

let scene = new THREE.Scene();
let shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: base_vs,
    fragmentShader: base_fs
});

let geometry = new THREE.PlaneGeometry(1.0, 0.7);
let planeMesh = new THREE.Mesh(geometry, shaderMaterial);
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

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor("white");
document.body.appendChild(renderer.domElement);

let camera = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, -1.0, 1.0);

let resize = () => {
    let aspect = window.innerHeight / window.innerWidth;
    camera.top = aspect;
    camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
    renderer.setSize(window.innerWidth, window.innerHeight - 5);
};

let prevTime: number = 0;
let animate = (time: number) => {
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

window.onresize = resize;
resize();
animate(prevTime = Date.now());