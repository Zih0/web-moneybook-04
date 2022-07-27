const openModal = (modalElement) => {
  const $modalWrapper = document.querySelector('#modal')

  $modalWrapper.appendChild(modalElement)
}

const closeModal = (modalElement) => {
  modalElement.remove()
}

export { openModal, closeModal }
