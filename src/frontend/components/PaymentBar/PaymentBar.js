import { Component } from '../../core/component.js'
import { CATEGORY } from '../../utils/constants.js'
import './paymentbar.scss'
import minus from '../../assets/minus.svg'
import plus from '../../assets/plus.svg'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.js'
import PaymentDropdown from '../PaymentDropdown/PaymentDropdown.js'
import { todayDate } from '../../utils/stringUtil.js'
import { createTransactionAPI } from '../../api/transactionHistory.js'

export default class PaymentBar extends Component {
  initState() {
    this.state = {
      paymentDate: todayDate(),
      category: '',
      title: '',
      payment_id: 0,
      price: 0,
      option: false,
      disabled: true,
    }
  }

  template() {
    const { paymentDate, category, title, payment_id, price, option, disabled } = this.state

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
                    <div class="select-dropdown" id='category-select';>${
                      category ? CATEGORY[category] : '선택하세요'
                    }</div>
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
                    <div class='select-dropdown' id='payment-select'>${
                      payment_id ? payment_id : '선택하세요'
                    }</div>
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

    $paymentDate.addEventListener('input', this.PaymentDataRegExp.bind(this))
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
      new PaymentDropdown({ handleInputPaymentId: this.handleInputPaymentId.bind(this) }),
    )
  }

  submitForm(e) {
    const result = e.target.closest('.submit')
    if (!result) return

    const { paymentDate, category, title, payment_id, price, option } = this.state
    let tmpPrice = Number(price.replace(/,/g, ''))
    tmpPrice = option ? tmpPrice : -tmpPrice
    const data = {
      paymentDate,
      category,
      title,
      payment_id,
      price: tmpPrice,
    }
    createTransactionAPI(data)
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

    this.setState({
      disabled: !check,
    })

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
  PriceRegExp(e) {
    e.target.value = Number(e.target.value.replace(/[^0-9]/g, '')).toLocaleString()
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
  handleInputPaymentId(selectedItem) {
    this.setState({
      payment_id: 2,
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
