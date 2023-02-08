import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
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

let idleAction, walkAction, deadAction, mixer, model;

const controller = {
    idle: () => {
        idleAction.play();
        walkAction.stop();
        deadAction.stop();
    },
    walk: () => {
        idleAction.stop();
        walkAction.play();
        deadAction.stop();
    },
    dead: () => {
        idleAction.stop();
        walkAction.stop();
        deadAction.play();
    },
    scale: 2,
    rotateY: Math.PI / 2,
    switchDuration: 0.4,
    timeScale: 1
};

const createPanel = () => {
    const panel = new GUI({ width: 310 });
    panel.add(document, 'title');
    panel.add(controller, 'scale', 0.1, 10, 0.01).onChange(value => {
        model.scale.set(value, value, value);
    });
    panel.add(controller, 'rotateY', -Math.PI, Math.PI, 0.1).onChange(value => {
        model.rotation.set(0, value, 0);
    });
    const colorFormats = {
        string: '#000000',
        int: 0x000000,
        object: { r: 1, g: 1, b: 1 },
        array: [1, 1, 1]
    };
    panel.addColor(colorFormats, 'string').onChange(value => {
        app.scene.background = new THREE.Color(value);
    });

    panel.add(controller, 'idle');
    panel.add(controller, 'walk');
    panel.add(controller, 'dead');
};

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
            model.scale.set(controller.scale, controller.scale, controller.scale);
            app.scene.add(model);

            const animations = gltf.animations;
            mixer = new THREE.AnimationMixer(model);

            [deadAction, idleAction, walkAction] = [
                mixer.clipAction(animations[0]),
                mixer.clipAction(animations[1]),
                mixer.clipAction(animations[2])
            ];
            idleAction.play();
            createPanel();
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
