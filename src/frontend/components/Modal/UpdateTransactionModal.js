import { Component } from '../../core/component.js'
import { closeModal } from '../../utils/modal.js'

import './updateTransactionModal.scss'
import IconPlus from '../../assets/plus.svg'
import IconMinus from '../../assets/minus.svg'
import { CATEGORY } from '../../utils/constants.js'
import { priceToString, replaceDateDash, replacePriceComma } from '../../utils/stringUtil.js'

export default class UpdateTransactionModal extends Component {
  initState() {
    const { category, payment, price } = this.props

    this.state = {
      category,
      payment,
      option: price > 0,
    }
  }

  checkInputValidation() {
    const { category, payment } = this.state
    const $dateInput = this.querySelector('#transaction-date-input')
    const $priceInput = this.querySelector('#transaction-price-input')
    const $titleInput = this.querySelector('#transaction-title-input')

    const $updateButton = this.querySelector('.transaction-modal-update-button')

    if (!category || !payment || !$dateInput.value || !$priceInput.value || !$titleInput.value) {
      $updateButton.classList.remove('active')
      return false
    }

    $updateButton.classList.add('active')
    return true
  }

  handleClickBackground() {
    closeModal(this)
  }

  handleClickCancelButton() {
    closeModal(this)
  }

  handleClickUpdateButton() {
    if (!this.checkInputValidation()) return

    closeModal(this)
  }

  handleInputDate(e) {
    const { value } = e.target

    e.target.value = replaceDateDash(value)
    this.checkInputValidation()
  }

  handleInputPrice(e) {
    const { value } = e.target

    const pureNumber = value.replace(/[^0-9]/g, '')

    e.target.value = priceToString(pureNumber)

    this.checkInputValidation()
  }

  handleInputTitle(e) {
    const { value } = e.target

    this.checkInputValidation()
  }

  setEvent() {
    const $modalBackground = this.querySelector('.modal-background')
    const $cancelButton = this.querySelector('.transaction-modal-cancel-button')
    const $updateButton = this.querySelector('.transaction-modal-update-button')
    const $dateInput = this.querySelector('#transaction-date-input')
    const $priceInput = this.querySelector('#transaction-price-input')
    const $titleInput = this.querySelector('#transaction-title-input')

    $modalBackground.addEventListener('click', this.handleClickBackground.bind(this))
    $cancelButton.addEventListener('click', this.handleClickCancelButton.bind(this))
    $updateButton.addEventListener('click', this.handleClickUpdateButton.bind(this))
    $dateInput.addEventListener('input', this.handleInputDate.bind(this))
    $priceInput.addEventListener('input', this.handleInputPrice.bind(this))
    $titleInput.addEventListener('input', this.handleInputTitle.bind(this))
  }

  template() {
    const { paymentDate, title, price } = this.props
    const { category, payment, option } = this.state

    const priceString = priceToString(Math.abs(price))
    return /*html*/ `
      <div class="modal-wrapper">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="transaction-modal-wrapper">
           <div class="transaction-form">
            <label>일자</label>
            <input id="transaction-date-input" class="transaction-form-input" placeholder="입력하세요" maxLength="10" value="${paymentDate}" />
            <label>분류</label>
            <div class="transaction-form-dropdown">
              <div class="select-dropdown" id='category-select'>
              ${category ? CATEGORY[category] : '선택하세요'}
              </div>
              <div class="category-dropdown-category"></div>
            </div>
            <label>내용</label>
            <input id='transaction-title-input' class="transaction-form-input" placeholder="입력하세요"  value="${title}" />
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
              <input  id='transaction-price-input' class='transaction-form-input' placeholder='입력하세요' value=${priceString}>
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
