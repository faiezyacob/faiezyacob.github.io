window.addEventListener('load', onLoad)

function onLoad() {
    let likeBtns = null
    let lastTimeStamp = 0;

    initClass()

    function initClass() {
        likeBtns = document.querySelectorAll('.like-btn')
        postImgs = document.querySelectorAll('.post-image')

        bindEvents();
    }

    function bindEvents() {
        likeBtns.forEach((el) => {
            el.addEventListener('click', onLikeBtnClick)
        })

        postImgs.forEach((el) => {
            el.addEventListener('click', onPostImgClick);
        })
    }

    function onLikeBtnClick() {
        this.querySelector('svg').classList.toggle('fill-red-400')
        this.querySelector('svg').classList.toggle('stroke-0')
    }

    function postImageDblClick(event) {
        event.querySelector('div.like-btn svg').classList.add('fill-red-400');
        event.querySelector('div.like-btn svg').classList.add('stroke-0');
        event.querySelector('.like-overlay').classList.add('opacity-100');

        setTimeout(() => {
            event.querySelector('.like-overlay').classList.remove('opacity-100');
        }, 1000)
    }

    function onPostImgClick() {
        let now = new Date().getTime();
        let currentTimeStamp = now - lastTimeStamp;

        if ((currentTimeStamp < 600) && (currentTimeStamp > 0)) {
            postImageDblClick(this);
        }

        lastTimeStamp = new Date().getTime();
    }
}