window.addEventListener('load', onLoad);

function onLoad() {
	const ROTATION_SPEED = 0.025;

	initClass_();

	function initClass_() {
		initScrollSpy_();
		onScroll_();
		bindEvents_();
	}

	function bindEvents_() {
		document.addEventListener('scroll', onScroll_, { passive: true });
		window.addEventListener('resize', onResize_);
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
}