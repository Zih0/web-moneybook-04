import { Component } from '../../core/component.js'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.js'
import PaymentDropdown from '../PaymentDropdown/PaymentDropdown.js'
import { closeModal } from '../../utils/modal.js'
import './updateTransactionModal.scss'
import IconPlus from '../../assets/plus.svg'
import IconMinus from '../../assets/minus.svg'
import { CATEGORY } from '../../utils/constants.js'
import { priceToString, replaceDateDash } from '../../utils/stringUtil.js'
import { updateTransactionAPI } from '../../api/transactionHistory.js'
import { transactionListState } from '../../stores/transactionStore.js'
import { sortTransaction } from '../../utils/transactionUtil.js'
import { getState, setState } from '../../core/observer.js'

export default class UpdateTransactionModal extends Component {
  constructor(props) {
    super(props)
    this.setTransactionList = setState(transactionListState)
  }

  initState() {
    const { category, paymentId, payment, price } = this.props

    this.state = {
      category,
      paymentId,
      paymentName: payment,
      option: price > 0,
    }
  }

  checkInputValidation() {
    const { category, paymentId } = this.state
    const $dateInput = this.querySelector('#transaction-date-input')
    const $priceInput = this.querySelector('#transaction-price-input')
    const $titleInput = this.querySelector('#transaction-title-input')

    const $updateButton = this.querySelector('.transaction-modal-update-button')

    if (!category || !paymentId || !$dateInput.value || !$priceInput.value || !$titleInput.value) {
      $updateButton.classList.remove('active')
      return false
    }

    $updateButton.classList.add('active')
    return true
  }

  async updateTransaction() {
    const $dateInput = this.querySelector('#transaction-date-input')
    const $priceInput = this.querySelector('#transaction-price-input')
    const $titleInput = this.querySelector('#transaction-title-input')

    const priceNumber = this.state.option
      ? Number($priceInput.value.replaceAll(',', ''))
      : -Number($priceInput.value.replaceAll(',', ''))

    const bodyData = {}
    if (this.props.category !== this.state.category) bodyData.category = this.state.category
    if (this.props.paymentId !== this.state.paymentId) bodyData.payment_id = this.state.paymentId
    if (this.props.paymentDate !== $dateInput.value) bodyData.payment_date = $dateInput.value
    if (this.props.price !== priceNumber) bodyData.price = priceNumber
    if (this.props.title !== $titleInput.value) bodyData.title = $titleInput.value

    try {
      const transactionList = getState(transactionListState)
      const newTransactionList = transactionList.map((item) => {
        if (item.id !== this.props.id) return item
        const newItem = {
          ...item,
          ...bodyData,
        }
        return newItem
      })
      const sortedTransactionList = sortTransaction(newTransactionList)
      this.setTransactionList(sortedTransactionList)
      await updateTransactionAPI(this.props.id, bodyData)
    } catch (error) {
      console.error(error)
    }
  }

  handleClickBackground() {
    closeModal(this)
  }

  handleClickCancelButton() {
    closeModal(this)
  }

  async handleClickUpdateButton() {
    if (!this.checkInputValidation()) return

    await this.updateTransaction()
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

  handleInputCategory(selectedItem, option) {
    this.setState({
      category: selectedItem,
      option: option,
    })
    this.checkInputValidation()
  }

  handleInputPaymentId(paymentId, paymentName) {
    this.setState({
      paymentId,
      paymentName,
    })
    this.checkInputValidation()
  }

  handleClickCategorySelect(e) {
    const { id } = e.target
    if (!id) return

    const $dropdown = this.querySelector(`.${id}`)
    $dropdown.classList.toggle('active')
  }

  setEvent() {
    const $modalBackground = this.querySelector('.modal-background')
    const $cancelButton = this.querySelector('.transaction-modal-cancel-button')
    const $updateButton = this.querySelector('.transaction-modal-update-button')
    const $dateInput = this.querySelector('#transaction-date-input')
    const $priceInput = this.querySelector('#transaction-price-input')
    const $titleInput = this.querySelector('#transaction-title-input')
    const $selectList = this.querySelectorAll('.select-dropdown')

    $modalBackground.addEventListener('click', this.handleClickBackground.bind(this))
    $cancelButton.addEventListener('click', this.handleClickCancelButton.bind(this))
    $updateButton.addEventListener('click', this.handleClickUpdateButton.bind(this))
    $dateInput.addEventListener('input', this.handleInputDate.bind(this))
    $priceInput.addEventListener('input', this.handleInputPrice.bind(this))
    $titleInput.addEventListener('input', this.handleInputTitle.bind(this))
    $selectList.forEach((item) =>
      item.addEventListener('click', this.handleClickCategorySelect.bind(this)),
    )
  }

  template() {
    const { paymentDate, title, price } = this.props
    const { category, paymentName, option } = this.state

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
              <div class="select-dropdown ${category ? 'selected' : ''}" id='category-select'>
              ${category ? CATEGORY[category] : '선택하세요'}
              </div>
              <div class="dropdown-category"></div>
            </div>
            <label>내용</label>
            <input id='transaction-title-input' class="transaction-form-input" placeholder="입력하세요"  value="${title}" />
            <label>결제수단</label>
            <div class="transaction-form-dropdown">
              <div class='select-dropdown ${paymentName ? 'selected' : ''}' id='payment-select'>
              ${paymentName ? paymentName : '선택하세요'}
              </div>
              <div class="dropdown-payment"></div>
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

  setComponent() {
    const $categoryDropdownElement = this.querySelector('.dropdown-category')
    $categoryDropdownElement.appendChild(
      new CategoryDropdown({
        handleInputCategory: this.handleInputCategory.bind(this),
        isUpdate: true,
      }),
    )

    const $paymentDropdownElement = this.querySelector('.dropdown-payment')
    $paymentDropdownElement.appendChild(
      new PaymentDropdown({
        handleInputPaymentId: this.handleInputPaymentId.bind(this),
        isUpdate: true,
      }),
    )
  }
}

customElements.define('updatetransaction-modal', UpdateTransactionModal)
