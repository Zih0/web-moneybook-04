import { Component } from '../../core/component.js'
import { CATEGORY } from '../../utils/constants.js'
import { priceToString } from '../../utils/stringUtil.js'
import './transactionItem.scss'

export default class TransactionItem extends Component {
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
