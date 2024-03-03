//api
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
      authorization: '1d5d1c5c-5aa8-425b-8edb-12e7d13bc57b',
      'Content-Type': 'application/json'
    }
  }

function checkResponseStatus(res) {
    if (res.ok) {
        return res.json();
    } else {
       return Promise.reject(`Ошибка: ${res.status}`);
    }
}

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then((res) => checkResponseStatus(res))
}

function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then((res) => checkResponseStatus(res))
}

function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => checkResponseStatus(res));
  }
  
  function postNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => checkResponseStatus(res));
  }

function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
    .then(res => {
        checkResponseStatus(res)
      })
}

function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    }).then((res) => checkResponseStatus(res));
  }
  
  function dislikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => checkResponseStatus(res));
  }

function updateUserPhoto(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        }),
    }).then((res) => checkResponseStatus(res))
}

export { getInitialCards, getUserInfo, updateUserInfo, postNewCard, deleteCard, likeCard, dislikeCard, updateUserPhoto }