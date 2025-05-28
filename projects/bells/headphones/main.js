import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background.
renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around.
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning.
camera.position.set(6, 8, 14);

// Has to be done everytime we update the camera position.
orbit.update();

// // Creates a 12 by 12 grid helper.
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// // Creates an axes helper with an axis length of 4.
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

// Add some basic lighting for the GLB model
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 5);
scene.add(directionalLight);

// Load GLB file
const loader = new GLTFLoader();

// Replace 'your-model.glb' with the actual filename of your GLB file
loader.load(
    'public/export_4.glb', // Path to your GLB file in the public folder
    function (gltf) {
        // Success callback
        console.log('GLB model loaded successfully:', gltf);
        
        const model = gltf.scene;
        
        // Optional: Scale the model if needed
        // model.scale.set(0.5, 0.5, 0.5);
        
        // Optional: Position the model
        // model.position.set(0, 0, 0);
        
        // Add the model to the scene
        scene.add(model);
        
        // Optional: Play animations if the model has any
        if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
            
            // You'll need to update the mixer in your animate function
            // Add this line to your animate function: mixer.update(clock.getDelta());
        }
    },
    function (progress) {
        // Progress callback
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    },
    function (error) {
        // Error callback
        console.error('Error loading GLB model:', error);
    }
);

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});