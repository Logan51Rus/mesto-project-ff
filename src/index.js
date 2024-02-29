import '../src/pages/index.css';
import { initialCards } from '../src/components/scripts/cards.js';
import { createCard, removeCard, likeCard } from '../src/components/scripts/card.js';
import { openPopupWindow, closePopupWindow, closeOnOverlay, closeOnEscape } from '../src/components/scripts/modal.js';
import { enableValidation, clearValidationForm } from './components/scripts/validation.js';
import { getInitialCards, getUserInfo, getInitialInfo, renewUserProfileInfo, postNewCard, deleteCard, putLike, removeLike, updateProfilePhoto } from '../src/components/scripts/api.js'

//  DOM узлы
const cardsContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const popupWindowEdit = document.querySelector('.popup_type_edit');
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const submitProfileInfoButton = popupWindowEdit.querySelector('.popup__button');
const popupWindowAddPlace = document.querySelector('.popup_type_new-card');
const placeInfo = popupWindowAddPlace.querySelector('.popup__input_type_card-name');
const urlInfo = popupWindowAddPlace.querySelector('.popup__input_type_url');
const addPlaceForm = popupWindowAddPlace.querySelector('.popup__form')
const popupsArray = Array.from(document.querySelectorAll('.popup'));
const closeButtons = Array.from(document.querySelectorAll('.popup__close'));
const profileInfoForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = profileInfoForm.querySelector('.popup__input_type_name');
const jobInput = profileInfoForm.querySelector('.popup__input_type_description');
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupTitle = popupImageContainer.querySelector('.popup__caption');
const userAvatarEditButton = document.querySelector('.profile__image');
const userAvatarPopup = document.querySelector('.popup_type_update-avatar');
const userAvatarForm = document.querySelector('.popup__form[name="new-avatar"]');
const userAvatarFormInput = userAvatarForm.querySelector('.popup__input_type_update-avatar');
const submitNewAvatarButton = userAvatarPopup.querySelector('.popup__button');
const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let userId;

//Вывод карточек на страницу
Promise.all([getUserInfo(), getInitialCards()])
.then(([userData, cardsData]) => {
    userId = userData._id;
    
    userAvatarEditButton.style.backgroundImage = `url(\\${userData.avatar})`;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cardsData.forEach((cardData) => {
        cardsContainer.append(createCard(cardData, userId, removeCard, likeCard, openPopupImg));
    })
    }).catch(error => {
        console.error(`Ошибка при получении данных: ${error}`);
    });
    
// Изменение аватара

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
  
    const originalButtonText = submitNewAvatarButton.textContent;
    submitNewAvatarButton.textContent = "Сохранение...";
  
    updateProfilePhoto(userAvatarFormInput.value)
      .then((userData) => {
        userAvatarEditButton.style.backgroundImage = `url(\\${userData.avatar})`;
        closePopupWindow(userAvatarPopup);
      })
      .catch((err) =>
        console.error("Ошибка при получении данных:", err)
      )
      .finally(() => (submitNewAvatarButton.textContent = originalButtonText));
  
    clearValidationForm(userAvatarForm, validationParams);
  }

userAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Изменение имени и деятельности в профиле

function handleProfileInfoFormSubmit(evt) {
    evt.preventDefault();
    
    const originalButtonText = submitProfileInfoButton.textContent;
    submitProfileInfoButton.textContent = 'Сохранение...';

    renewUserProfileInfo(nameInput.value, jobInput.value).then((profileData) => {
        profileName.textContent = profileData.name;
        profileDescription.textContent = profileData.about;
        closePopupWindow(popupWindowEdit)
    }).catch((err) =>
    console.error("Ошибка получения данных:", err)
  ).finally(() => (submitProfileInfoButton.textContent = originalButtonText));

    clearValidationForm(profileInfoForm, validationParams);
}

profileInfoForm.addEventListener('submit', handleProfileInfoFormSubmit)

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


//Слушатели + обработчики открытия форм
editProfileButton.addEventListener('click', function() {
    openPopupWindow(popupWindowEdit);

    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent; 
});

addPlaceButton.addEventListener('click', function() {
    openPopupWindow(popupWindowAddPlace);
    clearFormFields();
});

userAvatarEditButton.addEventListener('click', function(evt) {
    clearValidationForm(userAvatarForm, validationParams);
    userAvatarForm.reset();
    openPopupWindow(userAvatarPopup);
})

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

enableValidation(validationParams);






