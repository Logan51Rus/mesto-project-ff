(()=>{"use strict";function e(e,t,n,r){var o=document.getElementById("card-template").content.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__delete-button"),p=o.querySelector(".card__like-button"),u=o.querySelector(".card__image"),a=o.querySelector(".card__title");u.src=e.link,u.alt=e.name,a.textContent=e.name;var i=e.link,l=e.name;return c.addEventListener("click",t),p.addEventListener("click",n),u.addEventListener("click",(function(){return r({name:l,link:i})})),o}function t(e){e.target.closest(".card").remove()}function n(e){e.target.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&o(t)}}function p(e){var t=e.target,n=e.currentTarget;t===n&&o(n)}var u=document.querySelector(".places__list"),a=document.querySelector(".profile__edit-button"),i=document.querySelector(".profile__add-button"),l=document.querySelector(".popup_type_edit"),d=document.querySelector(".profile__info"),s=d.querySelector(".profile__title"),_=d.querySelector(".profile__description"),y=document.querySelector(".popup_type_new-card"),m=y.querySelector(".popup__input_type_card-name"),v=y.querySelector(".popup__input_type_url"),f=y.querySelector(".popup__form"),k=Array.from(document.querySelectorAll(".popup")),q=Array.from(document.querySelectorAll(".popup__close")),S=l.querySelector(".popup__input_type_name"),g=l.querySelector(".popup__input_type_description"),E=document.querySelector(".popup_type_image"),L=E.querySelector(".popup__image"),h=E.querySelector(".popup__caption");function x(e){var t=e.target.closest(".popup");t&&o(t)}function b(e){var t=e.name,n=e.link;L.src=n,L.alt=t,h.textContent=t,r(E)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){u.append(e(r,t,n,b))})),q.forEach((function(e){e.addEventListener("click",x)})),k.forEach((function(e){e.addEventListener("click",p)})),a.addEventListener("click",(function(){r(l),S.value=s.textContent,g.value=_.textContent})),i.addEventListener("click",(function(){r(y),m.value="",v.value=""})),l.addEventListener("submit",(function(e){e.preventDefault();var t=S.value,n=g.value,r=d.querySelector(".profile__title"),c=d.querySelector(".profile__description");r.textContent=t,c.textContent=n,o(l)})),y.addEventListener("submit",(function(r){r.preventDefault();var c=e({name:m.value,link:v.value},t,n,b);u.prepend(c),c.querySelector(".card__like-button").addEventListener("click",n),o(y),f.reset()}))})();