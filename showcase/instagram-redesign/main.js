window.addEventListener('load', onLoad)

function onLoad() {
    let likeBtns = null

    initClass()
    
    function initClass() {
        likeBtns = document.querySelectorAll('.like-btn')

        bindEvents();
    }

    function bindEvents() {
        likeBtns.forEach((el) => {
            el.addEventListener('click', onLikeBtnClick)
        })
    }

    function onLikeBtnClick() {
        this.querySelector('svg').classList.toggle('fill-red-400')
        this.querySelector('svg').classList.toggle('stroke-0')
    }
}