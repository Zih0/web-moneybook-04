import { Component } from '../../core/component.js'
import { priceToString } from '../../utils/stringUtil.js'
import './transactionItem.scss'

const CATEGORY_MAP = {
  health: '의료/건강',
  shopping: '쇼핑/뷰티',
  traffic: '교통',
  food: '식비',
  culture: '문화/여가',
  undefined: '미분류',
  life: '생활',
  salary: '월급',
  allowance: '용돈',
  etc: '기타수업',
}

export default class TransactionItem extends Component {
  template() {
    const { category, title, payment, price } = this.props

    return /*html*/ `
    <div class="transaction-item">
      <div class="transaction-item-category ${category}">${CATEGORY_MAP[category]}</div>
      <p class="transaction-item-title">${title}</p>
      <p class="transaction-item-payment">${payment}</p>
      <p class="transaction-item-price">${priceToString(price)}원</p>
      
    </div>
    `
  }
}
