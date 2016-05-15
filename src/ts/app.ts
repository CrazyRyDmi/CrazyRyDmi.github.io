import * as Three from "three";

let text = "hello world!";
let renderer = new Three.WebGLRenderer();
renderer.clearDepth();
document.getElementById("main").innerText = text; 