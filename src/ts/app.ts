import "babel-polyfill";
import * as Three from "three";

let text = "hello world!";
let renderer = new Three.WebGLRenderer();
renderer.clearDepth();
document.getElementById("main").innerText = text;
let a = async () => {
    console.log("doSome");
};

a();
