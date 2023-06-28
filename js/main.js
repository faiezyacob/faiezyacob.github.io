import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.addEventListener('load', onLoad);

function onLoad() {
	let canvas_ = null;
	let cube_ = null;
	let cube2_ = null;
	let camera_ = null;
	let renderer_ = null;
	let scene_ = null;
	
	const ROTATION_SPEED = 0.025;

	initClass_();

	function initClass_() {
		canvas_ = document.querySelector('.canvas-container');
		scene_ = new THREE.Scene();

		initAmbientLight_();
		initDirectionalLight_();
		initRenderer_();
		initCamera_();
		initBoxGeometry_();
		bindEvents_();

		new OrbitControls(camera_, renderer_.domElement);

		animate_();
	}

	function bindEvents_() {
		window.addEventListener('resize', onResize_);
	}

	function initRenderer_() {
		renderer_ = new THREE.WebGLRenderer({ canvas: canvas_, antialias: true });
		renderer_.setSize(canvas_.clientWidth, canvas_.clientHeight);
		renderer_.shadowMap.enabled = true;
		renderer_.shadowMap.type = THREE.VSMShadowMap;
		renderer_.setClearColor(0xb0b0b0, 0);
	}

	function initCamera_() {
		camera_ = new THREE.PerspectiveCamera(50, canvas_.clientWidth / canvas_.clientHeight, 0.1, 1000);
		camera_.position.set(-18, 0, 15);
	}

	function initBoxGeometry_() {
		let geometry = new THREE.BoxGeometry(10, 10, 10);
		let material = new THREE.MeshPhongMaterial({ color: 0x229e8d });
		let geometry2 = new THREE.BoxGeometry(5, 5, 5);
		let material2 = new THREE.MeshPhongMaterial({ color: 0x229e8d });

		cube_ = new THREE.Mesh(geometry, material);
		cube2_ = new THREE.Mesh(geometry2, material2);

		cube_.receiveShadow = true;
		cube2_.castShadow = true;
		cube2_.receiveShadow = true;

		cube_.position.set(-3, 0, 0);
		cube2_.position.set(2, 0, 10);

		scene_.add(cube_);
		scene_.add(cube2_);
	}

	function initAmbientLight_() {
		const light = new THREE.AmbientLight(0x999999); 
		scene_.add(light);
	}

	function initDirectionalLight_() {
		const light = new THREE.DirectionalLight()
		light.position.set(4, 2, 20)
		light.castShadow = true
		light.shadow.mapSize.width = 256
		light.shadow.mapSize.height = 256
		light.shadow.camera.near = 0.5
		light.shadow.camera.far = 25
		light.shadow.radius = 8
		light.shadow.blurSamples = 16
		scene_.add(light)

		const lightHelper = new THREE.DirectionalLightHelper(light, 0.5);
		scene_.add(lightHelper);
	}

	function onResize_() {
		renderer_.setSize(canvas_.clientWidth, canvas_.clientHeight);
		camera_.aspect = canvas_.clientWidth / canvas_.clientHeight;
		camera_.updateProjectionMatrix();
	}

	function animate_() {
		requestAnimationFrame(animate_);
		cube_.rotation.y += ROTATION_SPEED;
		cube2_.rotation.y += ROTATION_SPEED;
		cube2_.rotation.x += ROTATION_SPEED;
		renderer_.render(scene_, camera_);
	}
}