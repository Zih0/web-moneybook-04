import { Component } from '../../core/component.js'
import { closeModal } from '../../utils/modal.js'
import './paymentModal.scss'

export default class RemovePaymentModal extends Component {
  removePayment() {
    console.log('REMOVE PAYMENT')
  }

  handleClickBackground() {
    closeModal(this)
  }

  handleClickCancelButton() {
    closeModal(this)
  }

  handleClickRemoveButton() {
    this.removePayment()
    closeModal(this)
  }

  setEvent() {
    const $modalBackground = this.querySelector('.modal-background')
    const $cancelButton = this.querySelector('.payment-modal-cancel-button')
    const $removeButton = this.querySelector('.payment-modal-remove-button')

    $modalBackground.addEventListener('click', this.handleClickBackground.bind(this))
    $cancelButton.addEventListener('click', this.handleClickCancelButton.bind(this))
    $removeButton.addEventListener('click', this.handleClickRemoveButton.bind(this))
  }

  template() {
    // const { selectedPayment } = this.props

    return /*html*/ `
      <div class="modal-wrapper">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="payment-modal-wrapper">
            <p class="payment-modal-title">해당 결제수단을 삭제하시겠습니까?</p>
            <p class="payment-modal-input-text">props 자리</p>

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
