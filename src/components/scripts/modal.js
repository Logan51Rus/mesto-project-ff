//Функция открытия попапа
function openPopupWindow(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEscape);
};

//Функция закрытия попапа
function closePopupWindow(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEscape);
};

//Функция закрытия по клику на Escape
function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopupWindow(openedPopup);
        };
    };
};

//Функция закрытия по клику на оверлей
function closeOnOverlay(evt) { 
    const {target, currentTarget} = evt; 
    if (target === currentTarget) { 
       closePopupWindow(currentTarget); 
    };
};

export { openPopupWindow, closePopupWindow, closeOnEscape, closeOnOverlay }