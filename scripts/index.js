const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector("#preview-close-btn");
const previewImageEl = previewModal.querySelector(".modal__preview-image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");
previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An Outdoor Cafe photo",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseBtn = profileEditModal.querySelector("#edit-close-btn");
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
const profileNewPostCloseBtn = profileNewPostModal.querySelector(
  "#new-post-close-btn"
);
const profileNewPostImageLink = document.querySelector(".card__image");
const profileNewPostCaption = document.querySelector(".card__title");
const profileNewPostLinkInput =
  profileNewPostForm.querySelector("#card-image-input");
const profileNewPostCaptionInput = profileNewPostForm.querySelector(
  "#card-caption-input"
);

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardDeleteBtnEl.closest(".card").remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

profileEditButton.addEventListener("click", function () {
  profileEditNameInput.value = profileNameEl.textContent;
  profileEditDescriptionInput.value = profileDescriptionEl.textContent;

  openModal(profileEditModal);
});

profileEditCloseBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = profileEditNameInput.value;
  profileDescriptionEl.textContent = profileEditDescriptionInput.value;

  closeModal(profileEditModal);
}

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

profileNewPostButton.addEventListener("click", function () {
  openModal(profileNewPostModal);
});

profileNewPostCloseBtn.addEventListener("click", function () {
  closeModal(profileNewPostModal);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: profileNewPostCaptionInput.value,
    link: profileNewPostLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);

  cardsList.prepend(cardElement);

  closeModal(profileNewPostModal);
  profileNewPostForm.reset();
  console.log(inputValues);
}

profileNewPostForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
