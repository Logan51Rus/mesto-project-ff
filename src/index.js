import '../src/pages/index.css';
import { initialCards } from '../src/components/scripts/cards.js';
import { createCard, removeCard, likeCard } from '../src/components/scripts/card.js';
import { openPopupWindow, closePopupWindow, closeOnOverlay, closeOnEscape } from '../src/components/scripts/modal.js';

//  DOM узлы
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

//Вывод карточек на страницу
initialCards.forEach((elem) => {
    cardsContainer.append(createCard(elem, removeCard, likeCard, openPopupImg));
});

//Функция-обработчик закрытия по клику на кнопку закрытия
function closeOnClick(evt) {
    const clickTarget = evt.target;
    const popup = clickTarget.closest('.popup');
    if (popup) {
        closePopupWindow(popup);
    } 
}

closeButtons.forEach((button) => {
    button.addEventListener('click', closeOnClick);
})

popupsArray.forEach((popup) => {
    popup.addEventListener('click', closeOnOverlay);
});
    
editProfileButton.addEventListener('click', function() {
    openPopupWindow(popupWindowEdit);

    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent; 
});

addPlaceButton.addEventListener('click', function() {
    openPopupWindow(popupWindowAddPlace);
    clearFormFields();
});

// Функция отправки формы
function handleAddPlaceForm(evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    let profileName = profileInfo.querySelector('.profile__title');
    let profileDescription = profileInfo.querySelector('.profile__description');

    profileName.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;
 
    closePopupWindow(popupWindowEdit);
};

popupWindowEdit.addEventListener('submit', handleAddPlaceForm);

//Функция очистки полей попапа с созданием новой карточки при её закрытии без сохранения
function clearFormFields() {
    placeInfo.value = "";
    urlInfo.value = "";
};

// Функция добавления карточки 
function addNewPlace(evt) {
    evt.preventDefault();

    const placeInfoValue = placeInfo.value;
    const urlInfoValue = urlInfo.value;

    const newCard = {
        name: placeInfoValue, 
        link: urlInfoValue
    };

    const addNewCard = createCard(newCard, removeCard, likeCard, openPopupImg);

    cardsContainer.prepend(addNewCard);

    const newLikeButton = addNewCard.querySelector('.card__like-button');
    newLikeButton.addEventListener('click', likeCard);
    
    closePopupWindow(popupWindowAddPlace);

    addPlaceForm.reset();
}

popupWindowAddPlace.addEventListener('submit', addNewPlace);

// Функция открытия попапа с картинкой
function openPopupImg({name, link}) { 
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
  
    openPopupWindow(popupImageContainer)
};
