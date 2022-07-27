import { Component } from '../../core/component.js'
import { closeModal } from '../../utils/modal.js'

import './updateTransactionModal.scss'
import IconPlus from '../../assets/plus.svg'
import IconMinus from '../../assets/minus.svg'
import { CATEGORY } from '../../utils/constants.js'

export default class UpdateTransactionModal extends Component {
  initState() {
    this.state = {
      option: false,
    }
  }

  handleClickBackground() {
    closeModal(this)
  }

  handleClickCancelButton() {
    closeModal(this)
  }

  handleClickUpdateButton() {
    this.removePayment()
    closeModal(this)
  }

  setEvent() {
    const $modalBackground = this.querySelector('.modal-background')
    const $cancelButton = this.querySelector('.transaction-modal-cancel-button')
    const $updateButton = this.querySelector('.transaction-modal-update-button')

    $modalBackground.addEventListener('click', this.handleClickBackground.bind(this))
    $cancelButton.addEventListener('click', this.handleClickCancelButton.bind(this))
    $updateButton.addEventListener('click', this.handleClickUpdateButton.bind(this))
  }

  template() {
    const { paymentDate, title, category, payment, price } = this.props
    const { option } = this.state

    return /*html*/ `
      <div class="modal-wrapper">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="transaction-modal-wrapper">
           <div class="transaction-form">
            <label>일자</label>
            <input class="transaction-form-input" placeholder="입력하세요" value="${paymentDate}" />
            <label>분류</label>
            <div class="transaction-form-dropdown">
              <div class="select-dropdown" id='category-select'>
              ${category ? CATEGORY[category] : '선택하세요'}
              </div>
              <div class="category-dropdown-category"></div>
            </div>
            <label>내용</label>
            <input class="transaction-form-input" placeholder="입력하세요"  value="${title}" />
            <label>결제수단</label>
            <div class="transaction-form-dropdown">
              <div class='select-dropdown' id='payment-select'>
              ${payment ? payment : '선택하세요'}
              </div>
              <div class="category-dropdown-payment"></div>
            </div>
            <label>금액</label>
            <div class="transaction-form-price">
              ${option ? IconPlus : IconMinus}
              <input class='transaction-form-input' id='price' placeholder='입력하세요' value=${Math.abs(
                price,
              )}>
              <span>원</span>
            </div>
           </div>

            <div class="transaction-modal-button-wrapper">
              <button class="transaction-modal-cancel-button">취소</button>
              <button class="transaction-modal-update-button active">수정</button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('updatetransaction-modal', UpdateTransactionModal)
