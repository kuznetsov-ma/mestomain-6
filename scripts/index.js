// function createCard(card) {
//   const cardTemplate = document
//     .querySelector("#card-template")
//     .content.cloneNode(true);
//   const cardTitle = cardTemplate.querySelector(".card__title");
//   const cardImage = cardTemplate.querySelector(".card__image");

//   cardImage.setAttribute("src", card.link);
//   cardImage.setAttribute("alt", card.name);
//   cardTitle.textContent = card.name;
//   cardTemplate
//     .querySelector(".card__delete-button")
//     .addEventListener("click", (evt) => {
//       evt.target.closest(".places__item").remove();
//     });

//   cardTemplate.querySelector(".card__like-button").addEventListener("click", (evt) => {
//     if (evt.target.dataset.heart == "false" || evt.target.dataset.heart == null) //если при клике эта дата фолс
//     {
//       evt.target.style['background-image'] = "url('images/like-active.svg')"; //то меняем картинку
//       evt.target.dataset.heart = "true"; //и меняем дату на true
//     }
//     else //иначе
//     {
//       evt.target.style['background-image'] = "url('images/like-inactive.svg')"; //понимаем что лайк нажимался, меняем картинку тогда на обраткую
//       evt.target.dataset.heart = "false"; //и дату на false
//     }
//   });
//   return cardTemplate;
// }

import { initialCards } from '/scripts/cards.js'

import '/pages/index.css'; // добавьте импорт главного файла стилей 


function createCard(card) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.cloneNode(true);
  const cardTitle = cardTemplate.querySelector(".card__title");
  const cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardTitle.textContent = card.name;
  cardTemplate
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      evt.target.closest(".places__item").remove();
    });
  var modal = document.getElementById("myModal");
  cardTemplate.querySelector("img").addEventListener("click", (evt) => {
    var modalImg = document.querySelector("#img01"); //тут мы берем из разметки элементы модалки. Модалка тоже в разметке лежит, там div с айдишником myModal.
    var captionText = document.querySelector("#caption");
    modal.style.display = "flex"; //показываем модалку с картинкой
    modalImg.src = cardImage.src; //делаем подписи какие-то, если надо. Если не надо, можно убрать.
    captionText.innerHTML = cardImage.alt;
    var span = document.getElementsByClassName("close")[0];
    // Когда нажимаем на крестик, модалка скрывается средствами css.
    span.onclick = function () {
      modal.style.display = "none";
    };
    modal.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        modal.style.display = "none";
      }
    });
  });

  cardTemplate
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      if (
        evt.target.dataset.heart == "false" ||
        evt.target.dataset.heart == null
      ) {
        //если при клике эта дата фолс
        evt.target.style["background-image"] = "url('/images/like-active.svg')"; //то меняем картинку
        evt.target.dataset.heart = "true"; //и меняем дату на true
      } //иначе
      else {
        evt.target.style["background-image"] =
          "url('/images/like-inactive.svg')"; //понимаем что лайк нажимался, меняем картинку тогда на обраткую
        evt.target.dataset.heart = "false"; //и дату на false
      }
    });
  return cardTemplate;
}

const galleryCards = document.querySelector(".places");

initialCards.forEach((item) => {
  const madeCard = createCard(item);
  galleryCards.appendChild(madeCard);
});

const addPictureButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit");

const addPicturePopup = document.querySelector(".popup_type_new-card");

const closeProfileButton = editProfilePopup.querySelector(".popup__close");

const closePictureButton = addPicturePopup.querySelector(".popup__close");

const formElementProfile = document.querySelector(".popup_type_edit");

const formElementCard = document.querySelector(".popup_type_new-card");

const titleElement = editProfilePopup.querySelector(".popup__input_type_name");
const subtitleElement = editProfilePopup.querySelector(
  ".popup__input_type_description"
);

const userNameInput = document.querySelector(".profile__title");
const userAboutInput = document.querySelector(".profile__description");

const pictureNameInput = document.querySelector(".popup__input_type_card-name");
const pictureLinkInput = document.querySelector(".popup__input_type_url");

//профиль
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", function () {
    openProfilePopup();
  });

function openProfilePopup() {
  openPopup(editProfilePopup);
  titleElement.value = userNameInput.innerHTML;
  subtitleElement.value = userAboutInput.innerHTML;
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
}

closeProfileButton.addEventListener("click", function () {
  closePopup(editProfilePopup);

  titleElement.value = userNameInput.innerHTML;
  subtitleElement.value = userAboutInput.innerHTML;
});

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
}

formElementProfile.addEventListener("submit", submitFormProfile);

function submitFormProfile(evt) {
  evt.preventDefault();
  userNameInput.textContent = titleElement.value;
  userAboutInput.textContent = subtitleElement.value;
  closePopup(editProfilePopup);

  titleElement.value = userNameInput.innerHTML;
  subtitleElement.value = userAboutInput.innerHTML;
}

//добавление карточки
addPictureButton.addEventListener("click", function () {
  openAddPopup();
});

closePictureButton.addEventListener("click", function () {
  closePopup(addPicturePopup);

  pictureNameInput.value = "";
  pictureLinkInput.value = "";
});

function openAddPopup() {
  openPopup(addPicturePopup);
}

function submitFormCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: pictureNameInput.value,
    link: pictureLinkInput.value,
  };
  const madeCard = createCard(newCard);

  galleryCards.prepend(madeCard);

  closePopup(addPicturePopup);

  pictureNameInput.value = "";
  pictureLinkInput.value = "";
}

formElementCard.addEventListener("submit", submitFormCard);

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

formElementCard.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    //evt.currentTarget.style.cursor = "pointer";
    closePopup(formElementCard);
    pictureNameInput.value = "";
    pictureLinkInput.value = "";
  }
});

formElementProfile.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    // evt.currentTarget.style.cursor = "pointer";
    closePopup(formElementProfile);
  }
});

// const logoImage = new URL('logo.svg', import.meta.url);
// getElementById('logoPicture').setAttribute("src", logoImage);
