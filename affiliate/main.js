window.addEventListener('load' , ()=> {
    initParticle_();

    function initParticle_() {
		particlesJS.load('particles__container', 'particles.json', function () { });
	}
})