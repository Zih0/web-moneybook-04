import { Component } from '../../core/component.js'
import { getState, setState, subscribe } from '../../core/observer.js'
import { removePaymentModalOpenState, selectedPaymentState } from '../../stores/modalStore.js'
import './paymentModal.scss'

export default class RemovePaymentModal extends Component {
  constructor(props) {
    super(props)

    this.setModalOpen = setState(removePaymentModalOpenState)
    subscribe(removePaymentModalOpenState, this.render.bind(this))
    subscribe(selectedPaymentState, this.render.bind(this))
  }

  removePayment(payment) {
    console.log('REMOVE PAYMENT' + payment)
  }

  handleClickCancelButton() {
    this.setModalOpen(false)
  }

  handleClickRemoveButton() {
    const $paymentInput = this.querySelector('.payment-modal-input')
    if (!$paymentInput.value) {
      return
    }

    this.addPayment($paymentInput.value)
    this.setModalOpen(false)
  }

  setEvent() {
    const $cancelButton = this.querySelector('.payment-modal-cancel-button')
    const $removeButton = this.querySelector('.payment-modal-remove-button')

    $cancelButton.addEventListener('click', this.handleClickCancelButton.bind(this))
    $removeButton.addEventListener('click', this.handleClickRemoveButton.bind(this))
  }

  template() {
    const modalOpen = getState(removePaymentModalOpenState)
    const selectedPayment = getState(selectedPaymentState)

    return /*html*/ `
      <div class="modal-wrapper ${modalOpen ? 'open' : ''}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="payment-modal-wrapper">
            <p class="payment-modal-title">해당 결제수단을 삭제하시겠습니까?</p>
            <p class="payment-modal-input-text">${selectedPayment}</p>

            <div class="payment-modal-button-wrapper">
              <button class="payment-modal-cancel-button">취소</button>
              <button class="payment-modal-remove-button">삭제</button>
            </div>
            </div>
        </div>
      </div>
    `
  }
}

customElements.define('remove-payment-modal', RemovePaymentModal)
