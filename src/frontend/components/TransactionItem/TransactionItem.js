import { Component } from '../../core/component.js'
import { CATEGORY } from '../../utils/constants.js'
import { priceToString } from '../../utils/stringUtil.js'
import { openModal } from '../../utils/modal.js'
import UpdateTransactionModal from '../Modal/UpdateTransactionModal.js'
import './transactionItem.scss'

export default class TransactionItem extends Component {
  handleClickItem() {
    const { id, category, title, payment, price, paymentDate } = this.props

    openModal(
      new UpdateTransactionModal({
        id,
        title,
        category,
        payment,
        price,
        paymentDate,
      }),
    )
  }

  setEvent() {
    const { isEditable } = this.props
    if (!isEditable) return

    const $transactionItem = this.querySelector('.transaction-item')

    $transactionItem.addEventListener('click', this.handleClickItem.bind(this))
  }

  template() {
    const { category, title, payment, price } = this.props

    return /*html*/ `
    <div class="transaction-item">
      <div class="transaction-item-category ${category}">${CATEGORY[category]}</div>
      <p class="transaction-item-title">${title}</p>
      <p class="transaction-item-payment">${payment}</p>
      <p class="transaction-item-price">${priceToString(price)}원</p>
    </div>
    `
  }
}

customElements.define('transaction-item', TransactionItem)
