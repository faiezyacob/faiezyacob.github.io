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

        setSearchInterval_(firstTextString_, name_);
    } 
    
    function addBlinkingCursor_() {
        title_.innerHTML += '<span class="blinking">|</span>';
    }

    function setSearchInterval_(string, field) {
        searchInterval_ = setInterval(() => {
            findMatchString_(string, field);
        }, searchSpeed_);
    }

    function findMatchString_(textString, field) {
        if (finalTextIndex_ === textString.length) {
            finalTextIndex_ = 0;
            curTextProgress_ = '';
            clearInterval(searchInterval_);

            if (title_.innerHTML === '') {
                setSearchInterval_(secondTextString_, title_);
            } else {
                addBlinkingCursor_();
            }

            return;
        }

        if (randomStr_.charAt(randomStrIndex_) === textString.charAt(finalTextIndex_)) {
            curTextProgress_ += textString.charAt(finalTextIndex_);
            field.innerHTML = curTextProgress_;
            finalTextIndex_++;
            randomStrIndex_ = 0;
        } else {
            field.innerHTML = curTextProgress_ + randomStr_.charAt(randomStrIndex_);
            randomStrIndex_++;
        }
    }
}