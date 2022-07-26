import { Component } from '../../core/component.js'
import './paymentdropdown.scss'
import removeIcon from '../../assets/removeIcon.svg'

export default class PaymentDropdown extends Component {
  constructor(props) {
    super(props)
  }
  initState() {
    // 기능 개발 시, 결제수단 API에서 받아온 데이터로 대체하기
    this.state = {
      payment: ['신한은행', '국민은행', '현금', '비씨카드'],
    }
  }

  template() {
    const { payment } = this.state
    return /*html*/ `
      <ul class="dropdown-ul payment-select">
        ${payment
          .map(
            (item) => ` <li class="dropdown-li" id=${item}>${item} 
          <button>${removeIcon}</button>
          </li>`,
          )
          .join('')}
      </ul>
    `
  }

  setEvent() {
    const $paymentItem = this.querySelector('.dropdown-ul')
    $paymentItem.addEventListener('click', this.handleClickCategoryItem.bind(this))
  }

  handleClickCategoryItem(e) {
    const $item = e.target.closest('.dropdown-li')
    const paymentItem = $item.id
    this.props.setPaymentItem(paymentItem)
  }
}

customElements.define('payment-dropdown', PaymentDropdown)
