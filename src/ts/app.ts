import "babel-polyfill";
import * as THREE from "three";

/* tslint:disable */
let vs = `
    void main() {
    	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

let fs = `
        void main() {
        vec3 coord = normalize(gl_FragCoord.xyz);
        gl_FragColor = vec4(coord.x, coord.y, coord.z, 1.0);
    }
`;

/* tslint:enable */

let uniforms = {
};

let scene = new THREE.Scene();
let shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs
});

let geometry = new THREE.PlaneGeometry(1.0, 0.7);
let planeMesh = new THREE.Mesh(geometry, shaderMaterial);

scene.add(planeMesh);

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor("black");

document.body.appendChild(renderer.domElement);

let camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1.0, 1.0);

let resize = () => {
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

let animate = (time: number) => {
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

window.onresize = resize;
resize();
animate(Date.now());