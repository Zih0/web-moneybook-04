import { Component } from '../../core/component.js'
import { CATEGORY } from '../../utils/constants.js'
import './paymentbar.scss'
import minus from '../../assets/minus.svg'
import plus from '../../assets/plus.svg'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.js'
import PaymentDropdown from '../PaymentDropdown/PaymentDropdown.js'

export default class PaymentBar extends Component {
  initState() {
    this.state = {
      paymentDate: '',
      category: '',
      title: '',
      payment: '',
      price: '',
      option: false,
    }
  }

  template() {
    const { paymentDate, category, title, payment, price, option } = this.state

    return /*html*/ `
    <div class='paymentbar-container'>
        <form class='form-wrapper'>
            <div class='form-element'>
                <span class='form-element-title'>일자</span>
                <input class='form-element-input' id='paymentDate' placeholder='yyyymmdd' value=${paymentDate}>
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
                      payment ? payment : '선택하세요'
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
        </form>
    </div>
    `
  }

  setEvent() {
    const $categorySelectList = this.querySelectorAll('.select-dropdown')
    $categorySelectList.forEach((item) =>
      item.addEventListener('click', this.handleClickCategorySelect.bind(this)),
    )

    const $formInput = this.querySelectorAll('.form-element-input')
    $formInput.forEach(($input) => $input.addEventListener('change', this.handleInput.bind(this)))
  }

  setComponent() {
    const $categoryDropdownElement = this.querySelector('.category-dropdown-category')
    $categoryDropdownElement.appendChild(
      new CategoryDropdown({ setCategoryItem: this.setCategoryItem.bind(this) }),
    )

    const $paymentDropdownElement = this.querySelector('.category-dropdown-payment')
    $paymentDropdownElement.appendChild(
      new PaymentDropdown({ setPaymentItem: this.setPaymentItem.bind(this) }),
    )
  }

  handleClickCategorySelect(e) {
    const { id } = e.target
    if (id) {
      const $dropdown = this.querySelector(`.${id}`)
      $dropdown.classList.toggle('active')
    }
  }

  setCategoryItem(selectedItem, option) {
    this.setState({
      category: selectedItem,
      option: option,
    })
  }

  setPaymentItem(selectedItem) {
    this.setState({
      payment: selectedItem,
    })
  }

  handleInput(e) {
    const { id } = e.target
    this.setState({
      [id]: e.target.value,
    })
  }
}

customElements.define('paymentbar-container', PaymentBar)
