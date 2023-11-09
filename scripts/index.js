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
  userNameInput.value = titleElement.textContent;
  userAboutInput.value = subtitleElement.textContent;
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
}

closeProfileButton.addEventListener("click", function () {
  closePopup(editProfilePopup);

  titleElement.value = "";
  subtitleElement.value = "";
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

  titleElement.value = "";
  subtitleElement.value = "";
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
