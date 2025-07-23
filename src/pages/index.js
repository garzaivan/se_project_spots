import {
  enableValidation,
  settings,
  resetValidtion,
} from "../scripts/validation.js";

import "../pages/index.css";
import { changeSubmitBtnText } from "../utils/helpers.js";
import { changeDeleteBtnText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "78872a15-daa4-4f8e-aa55-24e150aa54e5",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, users]) => {
    cards.forEach(function (item) {
      console.log(item);
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    profileNameEl.textContent = users.name;
    profileDescriptionEl.textContent = users.about;
    avatarImageEl.src = users.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector("#edit-avatar-form");
const editAvatarButton = document.querySelector(".profile__avatar-btn");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");
const avatarImageEl = document.querySelector(".profile__avatar");

const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameEl = document.querySelector(".profile__name");
const profileEditNameInput = profileEditModal.querySelector(
  "#profile-name-input"
);
const profileDescriptionEl = document.querySelector(".profile__description");
const profileEditDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);

const profileNewPostModal = document.querySelector("#new-post-modal");
const profileNewPostForm = profileNewPostModal.querySelector("#new-post-form");
const profileNewPostButton = document.querySelector(".profile__add-button");
const profileNewPostLinkInput =
  profileNewPostForm.querySelector("#card-image-input");
const profileNewPostCaptionInput = profileNewPostForm.querySelector(
  "#card-caption-input"
);

const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector("#preview-close-btn");
const previewImageEl = previewModal.querySelector(".modal__preview-image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");

const modalCloseBtn = document.querySelectorAll("#modal-close-btn");
modalCloseBtn.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

const deleteBtn = document.querySelector(".modal__delete-btn");
const profileSubmitBtn = document.querySelector("#profile-submit-btn");
const avatarSubmitBtn = document.querySelector("#avatar-submit-btn");
const postSubmitBtn = document.querySelector("#post-submit-btn");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function setModalOverlayClose() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        closeModal(modal);
      }
    });
  });
}
setModalOverlayClose();

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_is-opened");
    closeModal(openedPopup);
  }
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  cardLikeBtnEl.addEventListener("click", (evt) => {
    handleLikeCard(evt, data._id);
  });

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-button_active");
  } else {
    cardLikeBtnEl.classList.remove("card__like-button_active");
  }

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  previewCloseBtn.addEventListener("click", function () {
    closeModal(previewModal);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

profileEditButton.addEventListener("click", function () {
  profileEditNameInput.value = profileNameEl.textContent;
  profileEditDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidtion(
    profileEditForm,
    [profileEditNameInput, profileEditDescriptionInput],
    settings
  );
  openModal(profileEditModal);
});

function handleEditProfileSubmit(evt) {
  changeSubmitBtnText(profileSubmitBtn, true);
  evt.preventDefault();
  api
    .editUserInfo({
      name: profileEditNameInput.value,
      about: profileEditDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      changeSubmitBtnText(profileSubmitBtn, false);
      closeModal(profileEditModal);
    });
}
profileEditForm.addEventListener("submit", handleEditProfileSubmit);

profileNewPostButton.addEventListener("click", function () {
  openModal(profileNewPostModal);
});

function handleAddCardSubmit(evt) {
  changeSubmitBtnText(postSubmitBtn, true);
  evt.preventDefault();

  api
    .addCard({
      name: profileNewPostCaptionInput.value,
      link: profileNewPostLinkInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      changeSubmitBtnText(postSubmitBtn, false);
      closeModal(profileNewPostModal);
      profileNewPostForm.reset();
    });
}
profileNewPostForm.addEventListener("submit", handleAddCardSubmit);

editAvatarButton.addEventListener("click", function () {
  openModal(editAvatarModal);
});

function handleEditAvatarSubmit(evt) {
  changeSubmitBtnText(avatarSubmitBtn, true);
  evt.preventDefault();

  api
    .editAvatarImage(editAvatarInput.value)
    .then((data) => {
      avatarImageEl.src = data.avatar;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      changeSubmitBtnText(avatarSubmitBtn, false);
      editAvatarForm.reset();
      closeModal(editAvatarModal);
    });
}
editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);

let selectedCard, selectedCardId;

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteFormSubmit(evt) {
  changeDeleteBtnText(deleteBtn, true);
  evt.preventDefault();

  api
    .deleteCard(selectedCardId)
    .then(() => {
      deleteForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      changeDeleteBtnText(deleteBtn, false);
      closeModal(deleteModal);
      selectedCard.remove();
    });
}
deleteForm.addEventListener("submit", handleDeleteFormSubmit);

function handleLikeCard(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__like-button_active");
  evt.target.classList.toggle("card__like-button_active");
  evt.preventDefault();
  selectedCardId = cardId;
  api.changeLikeStatus(selectedCardId, isLiked).catch((err) => {
    evt.target.classList.toggle("card__like-button_active");
    console.error(err);
  });
}

enableValidation(settings);
