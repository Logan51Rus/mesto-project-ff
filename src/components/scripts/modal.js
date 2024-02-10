//Функция открытия попапа
function openPopupWindow(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEscape);
};

//Функция закрытия попапа
function closePopupWindow(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEscape);
    clearFormFields()
};

//Функция закрытия по клику на Escape
function closeOnEscape(evt) {
    const popupsArray = Array.from(document.querySelectorAll('.popup'));
    if (evt.key === 'Escape') {
        popupsArray.forEach((popup) => {
            if (popup.classList.contains('popup_is-opened')) {
                closePopupWindow(popup);
            }
        });
    };
};

//Функция закрытия по клику на оверлей
function closeOnOverlay(popup) {
    return function(evt) {
        const {target, currentTarget} = evt;
        if (target === currentTarget) {
        closePopupWindow(popup);
        }
    }
}

//Функция очистки полей попапа с созданием новой карточки при её закрытии без сохранения
function clearFormFields() {
    document.querySelector('.popup_type_new-card').querySelector('.popup__input_type_card-name').value = "";
    document.querySelector('.popup_type_new-card').querySelector('.popup__input_type_url').value = "";
};

export { openPopupWindow, closePopupWindow, closeOnEscape, closeOnOverlay, clearFormFields }