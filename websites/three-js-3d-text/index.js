import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

THREE.Cache.enabled = true;

let container;

let camera, cameraTarget, scene, renderer, controls;

let group, textMesh1, textGeo, materials, font;

const height = 20,
    size = 70,
    hover = -60,
    curveSegments = 4,
    bevelThickness = 2,
    bevelSize = 1.5;

const fontMap = {
    helvetiker: 0,
    optimer: 1,
    gentilis: 2,
    'droid/droid_sans': 3,
    'droid/droid_serif': 4
};

const weightMap = {
    regular: 0,
    bold: 1
};

const reverseFontMap = [];
const reverseWeightMap = [];

for (const i in fontMap) reverseFontMap[fontMap[i]] = i;
for (const i in weightMap) reverseWeightMap[weightMap[i]] = i;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.set(0, 400, 700);
    cameraTarget = new THREE.Vector3(0, 150, 0);

    scene = new THREE.Scene();

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    scene.background = new THREE.Color().setHex(0xffffff);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.color.setHex(0xff0000);
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);

    materials = [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];

    group = new THREE.Group();
    group.position.y = 100;

    scene.add(group);

    loadFont();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
}

function loadFont() {
    const loader = new FontLoader();
    loader.load('/fonts/longzhuti.typeface.json', function (response) {
        font = response;
        refreshText();
    });
}

function createText() {
    textGeo = new TextGeometry('兔然暴富', {
        font: font,

        size: size,
        height: height,
        curveSegments: curveSegments,

        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: true
    });

    textGeo.computeBoundingBox();

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    console.log(centerOffset);
    textMesh1 = new THREE.Mesh(textGeo, materials);

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = hover;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    group.add(textMesh1);
}

function refreshText() {
    group.remove(textMesh1);

    createText();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(cameraTarget);
    controls.update();
    renderer.clear();
    renderer.render(scene, camera);
}
