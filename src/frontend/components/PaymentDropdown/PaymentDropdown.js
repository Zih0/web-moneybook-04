import { Component } from '../../core/component.js'
import { getPaymentList } from '../../api/payment.js'
import './paymentdropdown.scss'
import removeIcon from '../../assets/removeIcon.svg'
import AddPaymentModal from '../Modal/AddPaymentModal.js'
import { openModal } from '../../utils/modal.js'
import { createPayment } from '../../api/payment.js'

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
      openModal(new AddPaymentModal({ addPayment: this.addPayment.bind(this) }))
    } else {
      const paymentId = $item.id
      const paymentName = $item.innerText
      this.props.handleInputPaymentId(paymentId, paymentName)
    }
  }

  async addPayment(paymentName) {
    try {
      const data = await createPayment({ name: paymentName })

      this.setState({
        payment: [...this.state.payment, { id: data, name: paymentName }],
      })
    } catch (e) {
      console.error(e)
    }
  }
}

customElements.define('payment-dropdown', PaymentDropdown)
