import { Component } from '../../core/component.js'
import { getPaymentList } from '../../api/payment.js'
import './paymentdropdown.scss'
import removeIcon from '../../assets/removeIcon.svg'

export default class PaymentDropdown extends Component {
  constructor(props) {
    super(props)
  }
  async initState() {
    this.state = {
      payment: [],
    }

    const data = await getPaymentList()

    this.setState({
      payment: data,
    })
  }

  template() {
    const { payment } = this.state
    return /*html*/ `
      <ul class="dropdown-ul payment-select">
        ${payment
          .map(
            ({ id, name }) => ` <li class="dropdown-li" id=${id}>${name} 
          <button>${removeIcon}</button>
          </li>`,
          )
          .join('')}
          <li class='dropdown-li create-li'>추가하기</li>
      </ul>
    `
  }

  setEvent() {
    const $paymentItem = this.querySelector('.dropdown-ul')
    $paymentItem.addEventListener('click', this.handleClickCategoryItem.bind(this))
  }

  handleClickCategoryItem(e) {
    const $item = e.target.closest('.dropdown-li')

    if ($item.classList.contains('create-li')) {
      // 모달 호출
    } else {
      const payment_id = $item.id
      const paymentName = $item.innerText
      this.props.handleInputPaymentId(payment_id, paymentName)
    }
  }
}

customElements.define('payment-dropdown', PaymentDropdown)
