export function changeSubmitBtnText(
  btn,
  isLoading,
  loadingText = "Saving...",
  defaultText = "Save"
) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}

export function changeDeleteBtnText(
  btn,
  isDeleting,
  deletingText = "Deleting...",
  defaultDeleteText = "Delete"
) {
  if (isDeleting) {
    btn.textContent = deletingText;
  } else {
    btn.textContent = defaultDeleteText;
  }
}
