import '../src/pages/index.css';
import { createCard, removeCard, toggleLike } from '../src/components/scripts/card.js';
import { openPopupWindow, closePopupWindow, closeOnOverlay, closeOnEscape } from '../src/components/scripts/modal.js';
import { enableValidation, clearValidation } from './components/scripts/validation.js';
import { getInitialCards, getUserInfo, updateUserInfo, postNewCard, deleteCard, updateUserPhoto } from '../src/components/scripts/api.js'

//  DOM узлы
const cardsContainer = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const userAvatarContainer = document.querySelector('.profile__image');

const popupWindowEdit = document.querySelector('.popup_type_edit');
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const editProfileSubmitButton = popupWindowEdit.querySelector('.popup__button')
const profileInfoForm = document.querySelector('form[name="edit-profile"]');
const nameInput = profileInfoForm.querySelector('.popup__input_type_name');
const jobInput = profileInfoForm.querySelector('.popup__input_type_description');

const popupWindowAddPlace = document.querySelector('.popup_type_new-card');
const addPlaceForm = document.querySelector('form[name="new-place"]');
const placeInfo = addPlaceForm.querySelector('.popup__input_type_card-name');
const urlInfo = addPlaceForm.querySelector('.popup__input_type_url');
const newPlaceSubmitButton = popupWindowAddPlace.querySelector('.popup__button')

const userAvatarPopup = document.querySelector('.popup_type_update-avatar');
const userAvatarForm = document.querySelector('form[name="new-avatar"]');
const userAvatarFormInput = userAvatarForm.querySelector('.popup__input_type_update-avatar');
const avatarSubmitButton = userAvatarPopup.querySelector('.popup__button');

const popupsArray = Array.from(document.querySelectorAll('.popup'));
const closeButtons = Array.from(document.querySelectorAll('.popup__close'));
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupTitle = popupImageContainer.querySelector('.popup__caption');

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
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userAvatarContainer.style.backgroundImage = `url(\\${userData.avatar})`;

    cardsData.forEach((cardData) => {
        cardsContainer.append(createCard(cardData, userId, deleteThisCard, toggleLike, openPopupImg));
    })
    }).catch(err => {
        console.error(`Ошибка при получении данных: ${err}`);
    });

// Функция редактирования профиля 
function submitNewProfileInfo(evt) {
    evt.preventDefault();
    
    const initialButtonText = editProfileSubmitButton.textContent;
    editProfileSubmitButton.textContent = 'Сохранение...';

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    
    updateUserInfo(nameInputValue, jobInputValue).then((profileData) => {
        profileName.textContent = profileData.name;
        profileDescription.textContent = profileData.about;
        closePopupWindow(popupWindowEdit)
    }).catch((err) =>
    console.error(`Ошибка при редактировании профиля: ${err}`)
  ).finally(() => (editProfileSubmitButton.textContent = initialButtonText));
}

profileInfoForm.addEventListener('submit', submitNewProfileInfo)

// Функция сохранения данных в полях формы редактирования профиля

function fillProfileFormInputs() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent
}

// Функция добавления новой карточки
function submitNewCard(evt) {
    evt.preventDefault();

    const initialButtonText = newPlaceSubmitButton.textContent;
    newPlaceSubmitButton.textContent = 'Добавление...'

    const placeInfoValue = placeInfo.value;
    const urlInfoValue = urlInfo.value;

    postNewCard(placeInfoValue, urlInfoValue).then((cardData) => {
        const newCard = createCard(cardData, userId, deleteThisCard, toggleLike, openPopupImg);

        cardsContainer.prepend(newCard);
        closePopupWindow(popupWindowAddPlace);
    }).catch((err) => {
        `Ошибка при добавлении карточки: ${err}`})
        .finally(() => (newPlaceSubmitButton.textContent = initialButtonText));    
}

addPlaceForm.addEventListener('submit', submitNewCard)

// Функция изменения аватара

function submitNewAvatar(evt) {
    evt.preventDefault();
  
    const originalButtonText = avatarSubmitButton.textContent;
    avatarSubmitButton.textContent = "Сохранение...";

    const userAvatarFormInputValue = userAvatarFormInput.value
    
    updateUserPhoto(userAvatarFormInputValue)
      .then((userData) => {
        userAvatarContainer.style.backgroundImage = `url(\\${userData.avatar})`;
        closePopupWindow(userAvatarPopup);
      })
      .catch((err) =>
        console.error(`Ошибка при добавлении нового аватара: ${err}`)
      )
      .finally(() => (avatarSubmitButton.textContent = originalButtonText));
  }

userAvatarForm.addEventListener('submit', submitNewAvatar);

//Функция удаления карточки
function deleteThisCard(cardElement, cardData) {
    deleteCard(cardData._id)
    .then(() => removeCard(cardElement))
    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
}

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

//Открытие попапов 
editProfileButton.addEventListener('click', function() {
    fillProfileFormInputs();
    clearValidation(profileInfoForm, validationParams);
    openPopupWindow(popupWindowEdit);
});

addPlaceButton.addEventListener('click', function() {
    clearValidation(addPlaceForm, validationParams);
    addPlaceForm.reset();
    openPopupWindow(popupWindowAddPlace);
});

userAvatarContainer.addEventListener('click', function(evt) {
    clearValidation(userAvatarForm, validationParams);
    userAvatarForm.reset();
    openPopupWindow(userAvatarPopup);
})

// Функция открытия попапа с картинкой
function openPopupImg({name, link}) { 
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
  
    openPopupWindow(popupImageContainer)
};

enableValidation(validationParams);
