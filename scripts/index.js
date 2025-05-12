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

profileEditButton.addEventListener("click", function () {
  profileEditNameInput.value = profileNameEl.textContent;
  profileEditDescriptionInput.value = profileDescriptionEl.textContent;
  profileEditModal.classList.add("modal_is-opened");
});

profileEditCloseBtn.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = profileEditNameInput.value;
  profileDescriptionEl.textContent = profileEditDescriptionInput.value;
  console.log(profileDescriptionEl.textContent);
  console.log(profileNameEl.textContent);
  profileEditModal.classList.remove("modal_is-opened");
}

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

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

profileNewPostButton.addEventListener("click", function () {
  profileNewPostLinkInput.value = profileNewPostImageLink.src;
  profileNewPostCaptionInput.value = profileNewPostCaption.textContent;
  profileNewPostModal.classList.add("modal_is-opened");
});

profileNewPostCloseBtn.addEventListener("click", function () {
  profileNewPostModal.classList.remove("modal_is-opened");
});

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  profileNewPostImageLink.src = profileNewPostLinkInput.value;
  profileNewPostCaption.textContent = profileNewPostCaptionInput.value;
  // Log both input values to the console.
  console.log(profileNewPostLinkInput.value);
  console.log(profileNewPostCaptionInput.value);
  // Close the modal.
  profileNewPostModal.classList.remove("modal_is-opened");
}

// Create the submit listener.
profileNewPostForm.addEventListener("submit", handleAddCardSubmit);
