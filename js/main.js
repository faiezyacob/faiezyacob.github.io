window.addEventListener('load', onLoad);

function onLoad() {
	const PARTICLE_SPEED = 0.5;
	const PARTICLE_NUMBER = 100;
	const PARTICLE_MAX_SIZE = 5;
	const PARTICLE_MIN_SIZE = 1;

	let particle_ = null;

	initClass_();

	function initClass_() {
		generateShowcase_();
		initScrollSpy_();
		initParticle_();
		onScroll_();
		bindEvents_();
	}

	function bindEvents_() {
		document.addEventListener('scroll', onScroll_, { passive: true });
		window.addEventListener('resize', onResize_);
	}

	function generateShowcase_() {
		let showcaseWrapper = document.querySelector('.showcase__wrapper');
		
		for (let i = 0; i < showcase.length; i++) {
			let showcaseList = document.createElement('div');
			showcaseList.classList.add('showcase__list');

			let img = document.createElement('img');
			img.src = showcase[i].thumbnail;
			showcaseList.appendChild(img);

			let showcaseContent = document.createElement('div');
			showcaseContent.classList.add('showcase__content');
			showcaseList.appendChild(showcaseContent);

			let title = document.createElement('p');
			title.classList.add('header__small');
			title.innerHTML = showcase[i].title;
			showcaseContent.appendChild(title);

			let description = document.createElement('p');
			description.classList.add('description__text');
			description.innerHTML = showcase[i].description;
			showcaseContent.appendChild(description);

			let showcaseStack = document.createElement('div');
			showcaseStack.classList.add('showcase__stack');
			showcaseContent.appendChild(showcaseStack);

			for (let j = 0; j < showcase[i].stack.length; j++) {
				let span = document.createElement('span');
				span.innerHTML = showcase[i].stack[j];
				showcaseStack.appendChild(span);
			}

			let hr = document.createElement('hr');
			showcaseContent.appendChild(hr);

			let a = document.createElement('a');
			a.href = showcase[i].link;
			a.innerHTML = 'View demo';
			showcaseContent.appendChild(a);

			showcaseWrapper.appendChild(showcaseList)
		}
	}

	function initParticle_() {
		const options = {
			container: '.particle__container',
			number: window.innerWidth > 500 ? PARTICLE_NUMBER : PARTICLE_NUMBER / 2,
			max: PARTICLE_MAX_SIZE,
			min: PARTICLE_MIN_SIZE,
			speed: PARTICLE_SPEED
		}

		particle_ = new Particle(options)
	}
	
	function initScrollSpy_() {
		const options = {
			sectionClass: 'section',
			menuActiveTarget: '.navigation__list',
			offset: 100
		}

		scrollSpy('.navigation__container', options)
	}

	function onResize_() {

	}

	function onScroll_() {}
}