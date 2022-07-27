import { Component } from '../../core/component.js'
import { closeModal } from '../../utils/modal.js'

import './paymentModal.scss'

export default class AddPaymentModal extends Component {
  constructor(props) {
    super(props)
  }

  addPayment(payment) {
    console.log('ADD PAYMENT' + payment)
  }

  handleClickBackground() {
    closeModal(this)
  }

  handleClickCancelButton() {
    closeModal(this)
  }

  handleClickSubmitButton() {
    const $paymentInput = this.querySelector('.payment-modal-input')
    if (!$paymentInput.value) {
      return
    }

    this.addPayment($paymentInput.value)
    this.setModalOpen(false)
  }

  handleInputPayment(e) {
    const { value } = e.target
    const $submitButton = this.querySelector('.payment-modal-submit-button')

    if (value) {
      $submitButton.classList.add('active')
    } else {
      $submitButton.classList.remove('active')
    }
  }

  setEvent() {
    const $modalBackground = this.querySelector('.modal-background')
    const $paymentInput = this.querySelector('.payment-modal-input')
    const $cancelButton = this.querySelector('.payment-modal-cancel-button')
    const $submitButton = this.querySelector('.payment-modal-submit-button')

    $modalBackground.addEventListener('click', this.handleClickBackground.bind(this))
    $paymentInput.addEventListener('input', this.handleInputPayment.bind(this))
    $cancelButton.addEventListener('click', this.handleClickCancelButton.bind(this))
    $submitButton.addEventListener('click', this.handleClickSubmitButton.bind(this))
  }

  template() {
    return /*html*/ `
      <div class="modal-wrapper">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="payment-modal-wrapper">
            <p class="payment-modal-title">추가하실 결제수단을 적어주세요.</p>
            <input class="payment-modal-input" type="text" placeholder="입력하세요" />

            <div class="payment-modal-button-wrapper">
              <button class="payment-modal-cancel-button">취소</button>
              <button class="payment-modal-submit-button">등록</button>
            </div>
            </div>
        </div>
      </div>
    `
  }
}

customElements.define('addpayment-modal', AddPaymentModal)
