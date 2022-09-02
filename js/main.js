window.addEventListener('load', onLoad);

function onLoad() {
    let curTextProgress_ = '';
    let finalTextIndex_ = 0;
    let name_ = null;
    let randomStrIndex_ = 0;
    let searchInterval_ = null;
    let searchSpeed_ = 10;
    let title_ = null;

    const firstTextString_ = 'Faiez Yacob';
    const secondTextString_ = 'A hobbyist programmer.';
    const randomStr_ = ' !@#$%^&*(),./=-<>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    initClass_();

    function initClass_() {
        name_ = document.getElementById('name');
        title_ = document.getElementById('title');

        setFirstSearchInterval_();
    } 
    
    function addBlinkingCursor_() {
        title_.innerHTML += '<span class="blinking">|</span>';
    }

    function setFirstSearchInterval_() {
        searchInterval_ = setInterval(findFirstMatchString_, searchSpeed_);
    }

    function setSecondSearchInterval_() {
        searchInterval_ = setInterval(findSecondMatchString_, searchSpeed_);
    }

    function findFirstMatchString_() {
        if (finalTextIndex_ === firstTextString_.length) {
            finalTextIndex_ = 0;
            curTextProgress_ = '';
            clearInterval(searchInterval_);
            setSecondSearchInterval_();
            return;
        }

        if (randomStr_.charAt(randomStrIndex_) === firstTextString_.charAt(finalTextIndex_)) {
            curTextProgress_ += firstTextString_.charAt(finalTextIndex_);
            name_.innerHTML = curTextProgress_;
            finalTextIndex_++;
            randomStrIndex_ = 0;
        } else {
            name_.innerHTML = curTextProgress_ + randomStr_.charAt(randomStrIndex_);
            randomStrIndex_++;
        }
    }

    function findSecondMatchString_() {
        if (finalTextIndex_ === secondTextString_.length) {
            finalTextIndex_ = 0;
            curTextProgress_ = '';
            clearInterval(searchInterval_);
            addBlinkingCursor_();
            return;
        }

        if (randomStr_.charAt(randomStrIndex_) === secondTextString_.charAt(finalTextIndex_)) {
            curTextProgress_ += secondTextString_.charAt(finalTextIndex_);
            title_.innerHTML = curTextProgress_;
            finalTextIndex_++;
            randomStrIndex_ = 0;
        } else {
            title_.innerHTML = curTextProgress_ + randomStr_.charAt(randomStrIndex_);
            randomStrIndex_++;
        }
    }
}