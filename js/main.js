import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.addEventListener('load', onLoad);

function onLoad() {
	let animSpeed_ = 3000;
	let canvas_ = null;
	let curPos_ = 0;
	let group_ = null;
	let camera_ = null;
	let renderer_ = null;
	let scene_ = null;

	let isRotateLeft_ = true;

	const ROTATION_SPEED = 0.025;

	initClass_();

	function initClass_() {
		canvas_ = document.querySelector('.canvas-container');
		scene_ = new THREE.Scene();

		initAmbientLight_();
		initDirectionalLight_();
		initRenderer_();
		initCamera_();
		// initBoxGeometry_();
		initSphereGeometry_();
		initScrollSpy_();
		initSwiper_();
		onScroll_();
		bindEvents_();

		// new OrbitControls(camera_, renderer_.domElement);

		animate_();
	}

	function animate_() {
		requestAnimationFrame(animate_);
		// let rotate = getRotateDirection_();
		group_.rotation.x += 0.005;
		group_.rotation.y += 0.005;
		renderer_.render(scene_, camera_);
	}

	function bindEvents_() {
		document.addEventListener('scroll', onScroll_, { passive: true });
		window.addEventListener('resize', onResize_);
	}

	function getRotateDirection_() {
		if (isRotateLeft_ === true) {
			curPos_ -= ROTATION_SPEED;
		} else {
			curPos_ += ROTATION_SPEED;
		}

		if (curPos_ < -0.5) {
			isRotateLeft_ = false;
		}

		if (curPos_ > 0.5) {
			isRotateLeft_ = true;
		}

		return curPos_;
	}

	function initRenderer_() {
		renderer_ = new THREE.WebGLRenderer({ canvas: canvas_, antialias: true });
		renderer_.setSize(canvas_.clientWidth, canvas_.clientHeight);
		renderer_.shadowMap.enabled = true;
		renderer_.shadowMap.type = THREE.VSMShadowMap;
		// renderer_.setClearColor(0xffffff, 0);
		renderer_.setClearColor(0xb0b0b0, 0);
	}

	function initCamera_() {
		camera_ = new THREE.PerspectiveCamera(50, canvas_.clientWidth / canvas_.clientHeight, 0.1, 1000);
		camera_.position.set(0, 0, 25);
	}

	function initBoxGeometry_() {
		let geometry = new THREE.BoxGeometry(10, 10, 0.5);
		let material = new THREE.MeshPhongMaterial({ color: 0x229e8d });

		let leftWall = new THREE.Mesh(geometry, material);
		let rightWall = leftWall.clone();
		let bottomWall = leftWall.clone();

		leftWall.receiveShadow = true;
		rightWall.receiveShadow = true;
		bottomWall.receiveShadow = true;

		leftWall.position.set(0, 0, 0);
		rightWall.position.set(4.7, 0, 4.7);
		rightWall.rotation.y = Math.PI / 2;
		bottomWall.rotation.x = Math.PI / 2;
		bottomWall.position.set(0, -5, 4.7);

		group_ = new THREE.Object3D();
		group_.add(leftWall);
		group_.add(rightWall);
		group_.add(bottomWall);
		scene_.add(group_);
	}

	function initSphereGeometry_() {
		const geometry = new THREE.SphereGeometry(10, 32, 16);
		const wireframe = new THREE.WireframeGeometry(geometry);
		const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({color: 0x32d2c2}));
		line.material.depthTest = false;
		line.material.opacity = 0.25;
		line.material.transparent = true;
		group_ = new THREE.Object3D();
		group_.add(line);
		scene_.add(group_)
	}

	function initAmbientLight_() {
		const light = new THREE.AmbientLight(0x999999);
		scene_.add(light);
	}

	function initDirectionalLight_() {
		const light = new THREE.DirectionalLight()
		light.position.set(-15, 2, 20)
		light.castShadow = true
		light.shadow.mapSize.width = 256
		light.shadow.mapSize.height = 256
		light.shadow.camera.near = 0.5
		light.shadow.camera.far = 25
		light.shadow.radius = 8
		light.shadow.blurSamples = 16
		scene_.add(light)

		// const lightHelper = new THREE.DirectionalLightHelper(light, 0.5);
		// scene_.add(lightHelper);
	}

	function initScrollSpy_() {
		const options = {
			sectionClass: 'section',
			menuActiveTarget: '.nav-link',
			offset: 100
		}

		scrollSpy('#nav', options)
	}

	function initSwiper_() {
		const swiper = new Swiper('.swiper', {
			// Optional parameters
			direction: 'horizontal',
			centeredSlides: true,
			slidesPerView: 1.5,
			spaceBetween: 10,
			initialSlide: 1,
			mousewheel: {
				forceToAxis: true,
				invert: false
			},
			on: {
				slideChange: function () {
					let contentEls = document.querySelectorAll('.showcase-container .section-content');
					contentEls.forEach((el) => {
						el.classList.remove('active');
					})

					let activeEl = document.querySelector(`p.section-content[data-index="${this.realIndex}"]`);
					if (activeEl === null) {
						return;
					}

					activeEl.classList.add('active');
				}
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				progressbarOpposite: true
			},
			breakpoints: {
				800: {
					direction: 'vertical',
					slidesPerView: 2
				}
			}
		});
	}

	function onResize_() {
		renderer_.setSize(canvas_.clientWidth, canvas_.clientHeight);
		camera_.aspect = canvas_.clientWidth / canvas_.clientHeight;
		camera_.updateProjectionMatrix();
	}

	function onScroll_() {
		let container = document.querySelector('.about-container');
		let nav = document.querySelector('.navigation-container');

		if (container.getBoundingClientRect().top < 0) {
			nav.classList.add('scrolling');
		} else {
			nav.classList.remove('scrolling');
		}
	}
}