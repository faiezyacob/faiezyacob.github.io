function Particle(options) {
    let containerEl_ = null;
    let particlesArr = [];

    initClass();

    function initClass() {
        containerEl_ = document.querySelector(options.container);

        if (containerEl_ === null) {
            console.error(`[Particle.js] Container ${options.container} does not exist!`);
            return;
        }

        setupContainerStyle_();
        generateParticles_();

        animate_();
    }

    function animate_() {
        for (let i = 0; i < particlesArr.length; i++) {
            let curPos = particlesArr[i].top + options.speed;
            if (curPos > containerEl_.offsetHeight) {
                let posX = Math.floor(getRandomValue_(containerEl_.offsetWidth, 1));
                curPos = -5;
                particlesArr[i].el.style.left = posX + 'px';
            }
            particlesArr[i].el.style.top =  curPos + 'px';
            particlesArr[i].top = curPos;
        }
        requestAnimationFrame(animate_);
    }

    function generateParticles_() {
        for (let i = 0; i < options.number; i++) {
            let posX = Math.floor(getRandomValue_(1, containerEl_.offsetWidth));
            let posY = Math.floor(getRandomValue_(1, containerEl_.offsetHeight));
            let particle = document.createElement('div');
            let randomSize = getRandomValue_(options.min, options.max);
            let particleObj = {};

            particle.style.backgroundColor = '#6f6f6f';
            particle.style.borderRadius = '50%';
            particle.style.height = randomSize + 'px';
            particle.style.width = randomSize + 'px';
            particle.style.position = 'absolute';
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = randomSize < ((options.min + options.max) / 2) ? 0.5 : 1;

            particleObj.el = particle;
            particleObj.top = posY;
            particlesArr.push(particleObj);

             containerEl_.appendChild(particle);
        }
    }

    function getRandomValue_(min, max) {
        return Math.random() * (max - min) + min;
    }

    function setupContainerStyle_() {
        containerEl_.style.height = '100%';
        containerEl_.style.overflow = 'hidden';
        containerEl_.style.position = 'fixed';
        containerEl_.style.top = 0;
        containerEl_.style.width = '100%';
        containerEl_.style.zIndex = 0;
    }
}