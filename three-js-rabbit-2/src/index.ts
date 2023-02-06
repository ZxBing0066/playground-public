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

const controller = {
    idle: () => {
        setWeight(idleAction, 1);
        setWeight(walkAction, 0);
        actions.idle.weight = 1;
        actions.walk.weight = 0;
    },
    walk: () => {
        setWeight(idleAction, 0);
        setWeight(walkAction, 1);
        actions.idle.weight = 0;
        actions.walk.weight = 1;
    },
    idleToWalk: () => {
        prepareCrossFade(idleAction, walkAction, 0.5);
    },
    walkToIdle: () => {
        prepareCrossFade(walkAction, idleAction, 0.5);
    },
    scale: 0.4,
    rotateY: Math.PI / 2,
    switchDuration: 0.4,
    timeScale: 1
};

let idleController, walkController, idleToWalkController, walkToIdleController;

let currentBaseAction = 'idle';
const crossFadeControls = [];
const actions = {
    idle: { weight: 1, action: null },
    walk: { weight: 0, action: null }
};

function modifyTimeScale(speed) {
    mixer.timeScale = speed;
}

const createPanel = () => {
    const panel = new GUI({ width: 310 });
    panel.add(document, 'title');
    panel.add(controller, 'scale', 0.1, 2, 0.01).onChange(value => {
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

    const folder = panel.addFolder('Animate');
    idleController = folder.add(controller, 'idle');
    walkController = folder.add(controller, 'walk');
    // idleToWalkController = folder.add(controller, 'idleToWalk');
    // walkToIdleController = folder.add(controller, 'walkToIdle');
    folder
        .add(actions.idle, 'weight', 0, 1)
        .name('idleWeight')
        .listen()
        .onChange(value => {
            setWeight(idleAction, value);
        });
    folder
        .add(actions.walk, 'weight', 0, 1)
        .name('walkWeight')
        .listen()
        .onChange(value => {
            setWeight(walkAction, value);
        });
    // folder.add(controller, 'switchDuration', 0.1, 2, 0.1);
    folder.add(controller, 'timeScale', 0.0, 2, 0.01).onChange(modifyTimeScale);
};

function setWeight(action, weight) {
    action.setEffectiveTimeScale(1);
    action.setEffectiveWeight(weight);
}

function prepareCrossFade(startAction, endAction, duration) {
    // If the current action is 'idle', execute the crossfade immediately;
    // else wait until the current action has finished its current loop

    if (currentBaseAction === 'idle' || !startAction || !endAction) {
        executeCrossFade(startAction, endAction, duration);
    } else {
        synchronizeCrossFade(startAction, endAction, duration);
    }

    // Update control colors

    if (endAction) {
        const clip = endAction.getClip();
        currentBaseAction = clip.name;
    } else {
        currentBaseAction = 'None';
    }

    crossFadeControls.forEach(function (control) {
        const name = control.property;

        if (name === currentBaseAction) {
            control.setActive();
        } else {
            control.setInactive();
        }
    });
}

function synchronizeCrossFade(startAction, endAction, duration) {
    mixer.addEventListener('loop', onLoopFinished);

    function onLoopFinished(event) {
        if (event.action === startAction) {
            mixer.removeEventListener('loop', onLoopFinished);

            executeCrossFade(startAction, endAction, duration);
        }
    }
}

function executeCrossFade(startAction, endAction, duration) {
    // Not only the start action, but also the end action must get a weight of 1 before fading
    // (concerning the start action this is already guaranteed in this place)

    if (endAction) {
        setWeight(endAction, 1);
        endAction.time = 0;

        if (startAction) {
            // Crossfade with warping

            startAction.crossFadeTo(endAction, duration, true);
        } else {
            // Fade in

            endAction.fadeIn(duration);
        }
    } else {
        // Fade out

        startAction.fadeOut(duration);
    }
}

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

            [idleAction, walkAction] = [mixer.clipAction(animations[0]), mixer.clipAction(animations[1])];
            actions.idle.action = idleAction;
            actions.walk.action = walkAction;
            idleAction.play();
            walkAction.play();
            setWeight(idleAction, actions.idle.weight);
            setWeight(walkAction, actions.walk.weight);
            createPanel();
            render();
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    stats = Stats();
    app.el.appendChild(stats.dom);
};

const render = () => {
    const delta = clock.getDelta();
    mixer.update(delta);
    app.renderer.render(app.scene, app.camera);
    app.controls.update();
    // baseActions.idle.weight = idleAction.getEffectiveWeight();
    // baseActions.walk.weight = walkAction.getEffectiveWeight();
    stats.update();
    requestAnimationFrame(render);
};

init();
