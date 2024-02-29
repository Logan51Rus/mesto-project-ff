import { putLike, removeLike } from "./api";

function createCard(cardData, userId, removeCardCallback, likeCardCallback, openPopupImgCallback) {
    const cardTemplate = document.getElementById('card-template').content; // Создаём объект с содержимым шаблона 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //Клонируем шаблон
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeAmount = cardElement.querySelector('.card__like-amount')
    const isLiked = cardData.likes.some((like) => like._id === userId);
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeAmount.textContent = cardData.likes.length;
  
    const link = cardData.link;
    const name = cardData.name;

    if (cardData.owner._id === userId) {
        deleteButton.style.display = "block"
    } else {
        deleteButton.style.display = "none"
    }

    if (isLiked) {
        cardLikeAmount.classList.add('card__like-button_is-active')
    } else {
        cardLikeAmount.classList.remove('card__like-button_is-active')
    }
  
    deleteButton.addEventListener('click', removeCardCallback);
    likeButton.addEventListener('click', likeCardCallback);
    cardImage.addEventListener('click', () => openPopupImgCallback({name, link}));
  
    return cardElement;
};

function changeLike(card, cardData) {
    const cardLikeButton = card.querySelector(".card__like-button"),
      cardLikeCounter = card.querySelector(".card__like-counter");
  
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      removeLike(cardData._id)
        .then((data) => {
          cardLikeCounter.textContent = data.likes.length;
          cardLikeButton.classList.remove("card__like-button_is-active");
        })
        .catch((error) =>
          console.error("Ошибка при добавлении карточки:", error)
        );
    } else {
      putLike(cardData._id)
        .then((data) => {
          cardLikeCounter.textContent = data.likes.length;
          cardLikeButton.classList.add("card__like-button_is-active");
        })
        .catch((error) =>
          console.error("Ошибка при добавлении карточки:", error)
        );
    }
  }
  
function removeCard(evt) {
    const cardItem = evt.target;
    cardItem.closest('.card').remove()
};
  
function likeCard(evt) {
    const cardItem = evt.target;
    cardItem.classList.toggle('card__like-button_is-active')
};

export { createCard, removeCard, likeCard }