window.addEventListener('load', () => {
    const pastelColors = [
        '#DFCEF0',
        '#FAEDDA',
        '#C8E0FD',
        '#FFD1F4',
        '#FFD2B8',
        '#CBF9D9'
    ];
    const root = document.documentElement;

    let inputEl;
    let inputBtn;
    let inputWrapper;
    let listWrapper;

    initClass();

    function initClass() {
        inputEl = document.getElementById('input__field');
        inputBtn = document.getElementById('input__button');
        inputWrapper = document.querySelector('.input__wrapper');
        listWrapper = document.querySelector('.list__wrapper');

        appendData();
        setRandomBgColor();
        appendColor();
        bindEvents();
    }

    function appendColor() {
        const bgChangerEl = document.querySelector('.background__changer');
        for (let i = 0; i < pastelColors.length; i++) {
            const colorEl = document.createElement('div');
            colorEl.classList.add('color__list');
            colorEl.style.background = pastelColors[i];
            colorEl.setAttribute('data-color', pastelColors[i]);
            colorEl.addEventListener('click', onColorElClick);
            bgChangerEl.appendChild(colorEl);
        }
    }

    function appendData() {
        const savedData = localStorage.getItem('data');
        const taskWrapper = document.querySelector('.task__wrapper');
        if (savedData) {
            listWrapper.innerHTML = savedData;
            taskWrapper.innerHTML = '<h4>Current task</h4>';
        } else {
            taskWrapper.innerHTML = '<h4>You have no task</h4>';
        }
    }

    function bindEvents() {
        inputEl.addEventListener('input', onInputElInput);
        inputBtn.addEventListener('click', onInputBtnClick);
        listWrapper.addEventListener('click', onListWrapperClick);
    }

    function onColorElClick() {
        root.style.setProperty('--bg-color', this.getAttribute('data-color'));
    }

    function onInputElInput() {
        inputWrapper.classList.remove('error');
    }

    function onInputBtnClick() {
        if (inputEl.value === '') {
            inputWrapper.classList.add('error');
            return;
        }
        
        const listWrapper = document.querySelector('.list__wrapper');
        const listContainer = document.createElement('div');
        const listEl = document.createElement('div');
        const deleteEl = document.createElement('span');

        listContainer.classList.add('list__container');
        listEl.innerHTML = inputEl.value;
        deleteEl.innerHTML = 'remove';
        listContainer.appendChild(listEl);
        listContainer.appendChild(deleteEl);
        listWrapper.appendChild(listContainer);

        saveData();

        inputEl.value = '';
    }

    function onListWrapperClick(e) {
        if (e.target.nodeName === 'DIV') {
            e.target.classList.toggle('checked');
        } else if (e.target.nodeName === 'SPAN') {
            e.target.parentElement.remove();
        }

        saveData();
    }

    function saveData() {
        localStorage.setItem('data', listWrapper.innerHTML);
        appendData();
    }

    function setRandomBgColor() {
        shuffleArray(pastelColors);
        const randomNum = Math.floor(Math.random() * pastelColors.length - 1) + 1;
        const bgColor = pastelColors[randomNum];
        root.style.setProperty('--bg-color', bgColor);
    }

    function shuffleArray(array) {
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
})