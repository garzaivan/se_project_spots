const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditCloseBtn = profileEditModal.querySelector("#edit-close-btn");
const profileNewPostButton = document.querySelector(".profile__add-button");
const profileNewPostModal = document.querySelector("#new-post-modal");
const profileNewPostCloseBtn = profileNewPostModal.querySelector(
  "#new-post-close-btn"
);

profileEditButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_is-opened");
});

profileEditCloseBtn.addEventListener("click", function () {
  profileEditModal.classList.toggle("modal_is-opened");
});

profileNewPostButton.addEventListener("click", function () {
  profileNewPostModal.classList.add("modal_is-opened");
});

profileNewPostCloseBtn.addEventListener("click", function () {
  profileNewPostModal.classList.toggle("modal_is-opened");
});
