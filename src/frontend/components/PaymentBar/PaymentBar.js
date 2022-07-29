import { Component } from '../../core/component.js'
import { CATEGORY } from '../../utils/constants.js'
import './paymentbar.scss'
import minus from '../../assets/minus.svg'
import plus from '../../assets/plus.svg'
import rowArrow from '../../assets/row-arrow.svg'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.js'
import PaymentDropdown from '../PaymentDropdown/PaymentDropdown.js'
import { priceToString, todayDate } from '../../utils/stringUtil.js'
import { createTransactionAPI } from '../../api/transactionHistory.js'
import { getState, setState } from '../../core/observer.js'
import { transactionListState, paymentListState } from '../../stores/transactionStore.js'

export default class PaymentBar extends Component {
  constructor() {
    super()
    this.setTransaction = setState(transactionListState)
  }

  initState() {
    this.state = {
      paymentDate: todayDate(),
      category: '',
      title: '',
      paymentName: '',
      payment_id: 0,
      price: 0,
      option: false,
    }
  }

  template() {
    const { paymentDate, category, title, payment_id, paymentName, price, option } = this.state

    return /*html*/ `
    <div class='paymentbar-container'>
        <div class='form-wrapper'>
            <div class='form-element'>
                <span class='form-element-title'>일자</span>
                <input class='form-element-input' id='paymentDate' placeholder='yyyymmdd' maxlength='10' value=${paymentDate}>
            </div>
            <div class='form-element category-form'>
                <span class='form-element-title'>분류</span>
            
                <div class="form-element-dropdown">
                    <div class="select-dropdown ${category ? 'selected' : ''}" id='category-select'>
                      ${category ? CATEGORY[category] : '선택하세요'}
                      ${rowArrow}
                    </div>
                    <div class="category-dropdown-category"></div>
                </div>

            </div>
            <div class='form-element'>
                <span class='form-element-title'>내용</span>
                <input class='form-element-input' id='title' placeholder='입력하세요' value=${title}>
            </div>
            <div class='form-element'>
                <span class='form-element-title'>결제수단</span>
    
                 <div class="form-element-dropdown">
                    <div class='select-dropdown  ${
                      paymentName ? 'selected' : ''
                    }' id='payment-select'>
                      ${paymentName ? paymentName : '선택하세요'}
                      ${rowArrow}
                    </div>
                    <div class="category-dropdown-payment"></div>
                </div>
            </div>
            <div class='form-element'>
                <span class='folement-title'>금액</span> 
                <div class='price-input-wrapper'>
                        ${option ? plus : minus}
                        <input class='form-element-input' id='price' placeholder='입력하세요' value=${price}>
                        <span>원</span>
                    </div>
                </div>
            <button class='form-button'>
              ${plus}
            </button>
        </div>
    </div>
    `
  }

  setEvent() {
    // 각 입력 필드별로 다른 예외 처리를 해야하므로 각각의 이벤트 할당
    const $paymentDate = this.querySelector('#paymentDate')
    const $title = this.querySelector('#title')
    const $price = this.querySelector('#price')
    const $formButton = this.querySelector('.form-button')
    const $categorySelectList = this.querySelectorAll('.select-dropdown')

    $paymentDate.addEventListener('input', this.paymentDataRegExp.bind(this))
    $paymentDate.addEventListener('change', this.handleInputPaymentDate.bind(this))
    $title.addEventListener('change', this.handleInputTitle.bind(this))
    $price.addEventListener('input', this.priceRegExp.bind(this))
    $price.addEventListener('change', this.handleInputPrice.bind(this))
    $formButton.addEventListener('click', this.submitForm.bind(this))
    $categorySelectList.forEach((item) =>
      item.addEventListener('click', this.handleClickCategorySelect.bind(this)),
    )
  }

  setComponent() {
    const $categoryDropdownElement = this.querySelector('.category-dropdown-category')
    $categoryDropdownElement.appendChild(
      new CategoryDropdown({ handleInputCategory: this.handleInputCategory.bind(this) }),
    )

    const $paymentDropdownElement = this.querySelector('.category-dropdown-payment')
    $paymentDropdownElement.appendChild(
      new PaymentDropdown({
        handleInputPaymentId: this.handleInputPaymentId.bind(this),
      }),
    )
  }

  async submitForm(e) {
    const result = e.target.closest('.submit')
    if (!result) return

    const { paymentDate, category, title, payment_id, paymentName, price, option } = this.state
    let tmpPrice = Number(price.replace(/,/g, ''))
    tmpPrice = option ? tmpPrice : -tmpPrice

    const submitData = {
      paymentDate,
      category,
      title,
      payment_id,
      price: tmpPrice,
    }

    try {
      const { insertId } = await createTransactionAPI(submitData)
      const transactionList = getState(transactionListState)
      const setData = {
        category,
        id: insertId,
        is_deleted: 0,
        payment: paymentName,
        payment_date: paymentDate,
        payment_id: payment_id,
        price: tmpPrice,
        title: title,
      }

      this.setTransaction([...transactionList, setData])
    } catch (e) {
      console.error(e)
    }

    this.setState({
      paymentDate: todayDate(),
      category: '',
      title: '',
      paymentName: '',
      payment_id: 0,
      price: 0,
      option: false,
    })
  }

  handleClickCategorySelect(e) {
    const { id } = e.target
    if (id) {
      const $dropdown = this.querySelector(`.${id}`)
      $dropdown.classList.toggle('active')
    }
  }

  checkFormButton() {
    const check = Object.values(this.state).every((state) => state !== '' && state !== 0)

    if (check) {
      this.querySelector('.form-button').classList.add('submit')
    } else {
      this.querySelector('.form-button').classList.remove('submit')
    }
  }

  // 날짜 입력 값 정규 표현식
  paymentDataRegExp(e) {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
      .replace(/\-{1,2}$/g, '')
      .replace()
  }

  // 가격 입력 정규 표현식
  priceRegExp(e) {
    e.target.value = priceToString(e.target.value.replace(/[^0-9]/g, ''))
  }

  /* 필드 입력 관련 함수 */

  // 날짜 입력 폼
  handleInputPaymentDate(e) {
    this.setState({
      paymentDate: e.target.value,
    })
    this.checkFormButton()
  }

  // 카테고리 입력 폼
  handleInputCategory(selectedItem, option) {
    this.setState({
      category: selectedItem,
      option: option,
    })
    this.checkFormButton()
  }

  // 내용 입력 폼
  handleInputTitle(e) {
    this.setState({
      title: e.target.value,
    })
    this.checkFormButton()
  }

  // 결제수단 입력 폼
  handleInputPaymentId(paymentId, paymentName) {
    this.setState({
      payment_id: paymentId,
      paymentName,
    })
    this.checkFormButton()
  }

  // 가격 입력 폼
  handleInputPrice(e) {
    this.setState({
      price: e.target.value,
    })
    this.checkFormButton()
  }
}

customElements.define('paymentbar-container', PaymentBar)
