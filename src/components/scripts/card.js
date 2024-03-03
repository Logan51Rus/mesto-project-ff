import { dislikeCard, likeCard } from "./api";

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

    if (isLiked) {
      likeButton.classList.add('card__like-button_is-active')
    } else {
      likeButton.classList.remove('card__like-button_is-active')
    }

    if (cardData.owner._id === userId) {
      deleteButton.style.display = "block"
    } else {
      deleteButton.style.display = "none"
    }
  
    deleteButton.addEventListener('click', () => removeCardCallback(cardElement, cardData));
    likeButton.addEventListener('click', () => likeCardCallback(cardElement, cardData));
    cardImage.addEventListener('click', () => openPopupImgCallback({name, link}));
  
    return cardElement;
};

function toggleLike(card, cardData) {
    const likeButton = card.querySelector('.card__like-button');
    const cardLikesAmount = card.querySelector('.card__like-amount');
  
    if (likeButton.classList.contains("card__like-button_is-active")) {
      dislikeCard(cardData._id)
        .then((data) => {
          cardLikesAmount.textContent = data.likes.length;
          likeButton.classList.remove("card__like-button_is-active");
        })
        .catch((err) =>
          console.error(`Ошибка : ${err}`)
        );
    } else {
      likeCard(cardData._id)
        .then((data) => {
          cardLikesAmount.textContent = data.likes.length;
          likeButton.classList.add("card__like-button_is-active");
        })
        .catch((err) =>
          console.error(`Ошибка : ${err}`)
        );
    }
  }
  
function removeCard(card) {
    card.remove()
};
  
export { createCard, removeCard, toggleLike }