import LoadingModal from '../components/Modal/LoadingModal.js'

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}
const enableBodyScroll = () => {
  document.body.style.overflow = 'auto'
}

const openModal = (modalElement) => {
  const $modalWrapper = document.querySelector('#modal')
  $modalWrapper.appendChild(modalElement)
  disableBodyScroll()
}

const closeModal = (modalElement) => {
  modalElement.remove()
  enableBodyScroll()
}

const openLoading = () => {
  const $modalWrapper = document.querySelector('#modal')
  $modalWrapper.appendChild(new LoadingModal())
  disableBodyScroll()
}

const closeLoading = () => {
  const $modalWrapper = document.querySelector('#modal')
  const $loadingModal = $modalWrapper.querySelector('loading-modal')
  $modalWrapper.removeChild($loadingModal)
  enableBodyScroll()
}

export { disableBodyScroll, enableBodyScroll, openModal, closeModal, openLoading, closeLoading }
