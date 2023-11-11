window.addEventListener('load', onLoad);

function onLoad() {
	const PARTICLE_SPEED = 0.5;
	const PARTICLE_NUMBER = 100;

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
			container: '.particle__container',
			speed: PARTICLE_SPEED,
			number: PARTICLE_NUMBER,
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
		let curPos = 0;

		initClass__();

		function initClass__() {
			containerEl_ = document.querySelector(options.container);

			setupStyle__();
			generateParticles__();

			animate__();
		}

		function animate__() {
			for (let i = 0; i < particlesArr.length; i++) {
				let curPos = particlesArr[i].top + options.speed;
				if (curPos > containerEl_.offsetHeight) {
					let posX = Math.floor(Math.random() * (containerEl_.offsetWidth - 1 + 1) + 1);
					curPos = -5;
					particlesArr[i].el.style.left = posX + 'px';

				}
				particlesArr[i].el.style.top =  curPos + 'px';
				particlesArr[i].top = curPos;
			}
			requestAnimationFrame(animate__);
		}

		function generateParticles__() {
			for (let i = 0; i < options.number; i++) {
				let posX = Math.floor(Math.random() * (containerEl_.offsetWidth - 1 + 1) + 1);
				let posY = Math.floor(Math.random() * (containerEl_.offsetHeight - 1 + 1) + 1);
				let particle = document.createElement('div');
				let particleObj = {};

				particle.style.backgroundColor = '#fff';
				particle.style.borderRadius = '50%';
				particle.style.height = '10px';
				particle.style.width = '10px';
				particle.style.position = 'absolute';
				particle.style.left = posX + 'px';
				particle.style.top = posY + 'px';

				particleObj.el = particle;
				particleObj.top = posY;
				particlesArr.push(particleObj);

 				containerEl_.appendChild(particle);
			}
		}

		function setupStyle__() {
			containerEl_.style.height = '100%';
			containerEl_.style.overflow = 'hidden';
			containerEl_.style.position = 'absolute';
			containerEl_.style.width = '100%';
		}
	}
}