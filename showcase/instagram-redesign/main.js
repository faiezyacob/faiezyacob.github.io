window.addEventListener('load', onLoad)

function onLoad() {
    let likeBtns = null

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
            el.addEventListener('dblclick', onPostImgDblClick);
        })
    }

    function onLikeBtnClick() {
        this.querySelector('svg').classList.toggle('fill-red-400')
        this.querySelector('svg').classList.toggle('stroke-0')
    }

    function onPostImgDblClick() {
        this.querySelector('div.like-btn svg').classList.toggle('fill-red-400');
        this.querySelector('div.like-btn svg').classList.toggle('stroke-0');
    }
}