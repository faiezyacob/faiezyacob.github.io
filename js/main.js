window.addEventListener('load', onLoad);

function onLoad() {
	const PARTICLE_SPEED = 0.5;
	const PARTICLE_NUMBER = 100;
	const PARTICLE_MAX_SIZE = 10;
	const PARTICLE_MIN_SIZE = 5;

	initClass_();

	function initClass_() {
		initScrollSpy_();
		initParticle_();
		onScroll_();
		bindEvents_();
	}

	function bindEvents_() {
		document.addEventListener('scroll', onScroll_, { passive: true });
		window.addEventListener('resize', onResize_);
	}

	function initParticle_() {
		const options = {
			container: '.particle__container'
		}

		new Particle_(options)
	}
	
	function initScrollSpy_() {
		const options = {
			sectionClass: 'section',
			menuActiveTarget: '.navigation__list',
			offset: 100
		}

		scrollSpy('.navigation__container', options)
	}

	function onResize_() {}

	function onScroll_() {}

	function Particle_(options) {
		let containerEl_ = null;
		let particlesArr = [];

		initClass__();

		function initClass__() {
			containerEl_ = document.querySelector(options.container);

			setupStyle__();
			generateParticles__();

			animate__();
		}

		function animate__() {
			for (let i = 0; i < particlesArr.length; i++) {
				let curPos = particlesArr[i].top + PARTICLE_SPEED;
				if (curPos > containerEl_.offsetHeight) {
					let posX = Math.floor(getRandomValue(containerEl_.offsetWidth, 1));
					curPos = -5;
					particlesArr[i].el.style.left = posX + 'px';
				}
				particlesArr[i].el.style.top =  curPos + 'px';
				particlesArr[i].top = curPos;
			}
			requestAnimationFrame(animate__);
		}

		function generateParticles__() {
			for (let i = 0; i < PARTICLE_NUMBER; i++) {
				let posX = Math.floor(getRandomValue(1, containerEl_.offsetWidth));
				let posY = Math.floor(getRandomValue(1, containerEl_.offsetHeight));
				let particle = document.createElement('div');
				let randomSize = getRandomValue(PARTICLE_MIN_SIZE, PARTICLE_MAX_SIZE);
				let particleObj = {};

				particle.style.backgroundColor = '#fff';
				particle.style.borderRadius = '50%';
				particle.style.height = randomSize + 'px';
				particle.style.width = randomSize + 'px';
				particle.style.position = 'absolute';
				particle.style.left = posX + 'px';
				particle.style.top = posY + 'px';
				particle.style.opacity = randomSize < ((PARTICLE_MAX_SIZE + PARTICLE_MIN_SIZE) / 2) ? 0.5 : 1;
				particle.style.zIndex = randomSize < ((PARTICLE_MAX_SIZE + PARTICLE_MIN_SIZE) / 2) ? 0 : 1;

				particleObj.el = particle;
				particleObj.top = posY;
				particlesArr.push(particleObj);

 				containerEl_.appendChild(particle);
			}
		}

		function getRandomValue(min, max) {
			return Math.random() * (max - min) + min;
		}

		function setupStyle__() {
			containerEl_.style.height = '100%';
			containerEl_.style.overflow = 'hidden';
			containerEl_.style.position = 'absolute';
			containerEl_.style.width = '100%';
		}
	}
}