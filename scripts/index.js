// @todo: Темплейт карточки

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardinfo, removeCardCallback) {
    const cardTemplate = document.getElementById('card-template').content; // Создаём объект с содержимым шаблона 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //Клонируем шаблон
    const deleteButton = cardElement.querySelector('.card__delete-button');

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = cardinfo.link;
    cardImage.alt.textContent = 'Живописное место в России';
    cardTitle.textContent = cardinfo.name;
    
    deleteButton.addEventListener('click', removeCardCallback);

    return cardElement;
};

// @todo: Функция удаления карточки
function removeCard(evt) {
    const cardItem = evt.target;
    cardItem.closest('.card').remove()
};

// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
    cardsContainer.append(addCard(elem,removeCard));
})


