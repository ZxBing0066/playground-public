import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const loader = new GLTFLoader();
const clock = new THREE.Clock();

let app = {
    el: document.getElementById('app'),
    scene: null,
    renderer: null,
    camera: null,
    controls: null
};

let idleAction, walkAction, mixer, model, stats;

const init = () => {
    const renderer = (app.renderer = new THREE.WebGLRenderer({ antialias: true }));
    app.renderer.setSize(window.innerWidth, window.innerHeight);
    app.el.appendChild(app.renderer.domElement);

    const scene = (app.scene = new THREE.Scene());
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = (app.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    app.controls = new OrbitControls(app.camera, app.renderer.domElement);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 50;

    loader.load(
        new URL('/assets/rabbit.glb', import.meta.url) + '',
        function (gltf) {
            model = gltf.scene;
            model.rotateY(Math.PI / 2);
            model.scale.set(0.4, 0.4, 0.4);
            app.scene.add(model);

            const animations = gltf.animations;
            mixer = new THREE.AnimationMixer(model);

            walkAction = mixer.clipAction(animations[0]);
            walkAction.play();
            render();
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
};

const render = () => {
    const delta = clock.getDelta();
    mixer.update(delta);
    app.renderer.render(app.scene, app.camera);
    app.controls.update();
    requestAnimationFrame(render);
};

init();
