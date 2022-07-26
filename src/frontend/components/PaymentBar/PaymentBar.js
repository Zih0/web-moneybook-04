import { Component } from '../../core/component.js'
import './paymentbar.scss'
import minus from '../../assets/minus.svg'
import plus from '../../assets/plus.svg'
import Dropdown from '../Dropdown/Dropdown.js'

export default class PaymentBar extends Component {
  initState() {
    this.state = {
      date: '',
      category: '',
      title: '',
      payment: '',
      price: '',
    }
  }

  template() {
    const { date, category, title, payment, price } = this.state

    return /*html*/ `
    <div class='paymentbar-container'>
        <form class='form-wrapper'>
            <div class='form-element'>
                <span class='form-element-title'>일자</span>
                <input class='form-element-input' id='date' placeholder='yyyymmdd' value=${date}>
            </div>
            <div class='form-element category-form'>
                <span class='form-element-title'>분류</span>
            
                <div class="form-element-dropdown category">
                    <div class="category-select">${category || '선택하세요'}</div>
                    <div class="category-dropdown-replace"></div>
                </div>

            </div>
            <div class='form-element'>
                <span class='form-element-title'>내용</span>
                <input class='form-element-input' id='title' placeholder='입력하세요' value=${title}>
            </div>
            <div class='form-element'>
                <span class='form-element-title'>결제수단</span>
                    <select class="form-element-dropdown category">
                    <option selected disabled>선택하세요</option>
                </select>
            </div>
            <div class='form-element'>
                <span class='form-element-title'>금액</span> 
                <div class='price-input-wrapper'>
                        ${minus}
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
    const $categorySelect = this.querySelector('.category-select')
    $categorySelect.addEventListener('click', this.handleClickCategorySelect.bind(this))

    const $formInput = this.querySelectorAll('.form-element-input')
    $formInput.forEach(($input) => $input.addEventListener('change', this.handleInput.bind(this)))
  }

  setComponent() {
    const $categoryDropdownReplaceElement = this.querySelector('.category-dropdown-replace')
    $categoryDropdownReplaceElement.appendChild(
      new Dropdown({ setCategoryItem: this.setCategoryItem.bind(this) }),
    )
  }

  handleClickCategorySelect() {
    const $dropdown = this.querySelector('.category .dropdown-ul')
    $dropdown.classList.toggle('active')
  }

  setCategoryItem(selectedItem) {
    this.setState({
      category: selectedItem,
    })
    this.handleClickCategorySelect.bind(this)
  }

  handleInput(e) {
    const { id } = e.target
    this.setState({
      [id]: e.target.value,
    })
  }
}

customElements.define('paymentbar-container', PaymentBar)
