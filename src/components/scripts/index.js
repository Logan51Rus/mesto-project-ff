import '../src/pages/index.css';
import { initialCards, addCard } from './scripts/cards';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const popupWindowEdit = document.querySelector('.popup_type_edit');
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const popupWindowAddPlace = document.querySelector('.popup_type_new-card');
const placeInfo = popupWindowAddPlace.querySelector('.popup__input_type_card-name');
const urlInfo = popupWindowAddPlace.querySelector('.popup__input_type_url');
const addPlaceForm = popupWindowAddPlace.querySelector('.popup__form')
const popupsArray = Array.from(document.querySelectorAll('.popup'));
const closeButtons = Array.from(document.querySelectorAll('.popup__close'));
const nameInput = popupWindowEdit.querySelector('.popup__input_type_name');
const jobInput = popupWindowEdit.querySelector('.popup__input_type_description');
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupTitle = popupImageContainer.querySelector('.popup__caption');

// @todo: Функция удаления карточки
function removeCard(evt) {
    const cardItem = evt.target;
    cardItem.closest('.card').remove()
};

// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
    cardsContainer.append(addCard(elem, removeCard, likeCard, openPopupImg));
});

// Функция открытия попапа
function openPopupWindow(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEscape);
};

function closePopupWindow(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEscape)
    clearFormFields()
};

function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        popupsArray.forEach((popup) => {
            if (popup.classList.contains('popup_is-opened')) {
                closePopupWindow(popup);
            }
        });
    };
};

closeButtons.forEach((button) => {
    button.addEventListener('click', function(evt){
        const clickTarget = evt.target;
        const popup = clickTarget.closest('.popup');
        if (popup) {
            closePopupWindow(popup);
        }
    })
})

popupsArray.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        const {target, currentTarget} = evt;
        if (target === currentTarget) {
            closePopupWindow(popup);
        } 
    })
});
    
editProfileButton.addEventListener('click', function() {
    openPopupWindow(popupWindowEdit);

    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent; 
});

addPlaceButton.addEventListener('click', function() {
    openPopupWindow(popupWindowAddPlace);
});

// Функция отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    let profileName = profileInfo.querySelector('.profile__title');
    let profileDescription = profileInfo.querySelector('.profile__description');

    profileName.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
 
    closePopupWindow(popupWindowEdit);
};

popupWindowEdit.addEventListener('submit', handleFormSubmit)

// Функция добавления карточки 
function addNewPlace(evt) {
    evt.preventDefault();

    let placeInfoValue = placeInfo.value;
    let urlInfoValue = urlInfo.value;

    const newCard = {
        name: placeInfoValue, 
        link: urlInfoValue
    };

    const addNewCard = addCard(newCard, removeCard, likeCard);

    cardsContainer.prepend(addNewCard);

    const newLikeButton = addNewCard.querySelector('.card__like-button');
    newLikeButton.addEventListener('click', likeCard);
    
    closePopupWindow(popupWindowAddPlace);

    addPlaceForm.reset();
}

popupWindowAddPlace.addEventListener('submit', addNewPlace);

//Функция лайка карточки
function likeCard(evt) {
    const cardItem = evt.target;
    cardItem.classList.toggle('card__like-button_is-active')
}

function clearFormFields() {
    placeInfo.value = "";
    urlInfo.value = "";
}

//Функция открытия попапа с изображением 
function openPopupImg({name, link}) { 
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;

    openPopupWindow(popupImageContainer)
}









