function createCard(cardinfo, removeCardCallback, likeCardCallback, openPopupImgCallback) {
    const cardTemplate = document.getElementById('card-template').content; // Создаём объект с содержимым шаблона 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //Клонируем шаблон
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
  
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    
    cardImage.src = cardinfo.link;
    cardImage.alt = cardinfo.name;
    cardTitle.textContent = cardinfo.name;
  
    const link = cardinfo.link;
    const name = cardinfo.name;
  
    deleteButton.addEventListener('click', removeCardCallback);
    likeButton.addEventListener('click', likeCardCallback);
    cardImage.addEventListener('click', () => openPopupImgCallback({name, link}));
  
    return cardElement;
};
  
function removeCard(evt) {
    const cardItem = evt.target;
    cardItem.closest('.card').remove()
};
  
function likeCard(evt) {
    const cardItem = evt.target;
    cardItem.classList.toggle('card__like-button_is-active')
};

export { createCard, removeCard, likeCard }