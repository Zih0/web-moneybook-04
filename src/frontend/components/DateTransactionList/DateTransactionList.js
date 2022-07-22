import { Component } from '../../core/component.js'
import { calculateTransaction } from '../../utils/priceUtil.js'
import { priceToString } from '../../utils/stringUtil.js'
import TransactionItem from '../TransactionItem/TransactionItem.js'

import './dateTransactionList.scss'

const KR_WEEK = ['일', '월', '화', '수', '목', '금', '토']

export default class DateTransactionList extends Component {
  template() {
    const { transactionList } = this.props

    const [mm, dd, day] = this.convertDate(transactionList[0].payment_date)
    const [income, expense] = calculateTransaction(transactionList)

    return /*html*/ `
        <div class="date-transaction-list-wrapper">
            <div class="date-transaction-header">
                <div class="date-transaction-header-left">
                    <span class="date-transaction-header-date">${mm}월 ${dd}일<span>
                    <span class="date-transaction-header-day">${day}<span>
                </div>
                <p class="date-transaction-header-summary">
                ${income ? `수입 ${priceToString(income)}` : ''}
                ${expense ? `지출 ${priceToString(expense)}` : ''}</p>
            </div>
            <div class="date-transaction-list">
            </div>
        </div>
      `
  }

  setComponent() {
    const { transactionList } = this.props
    const $trnasactionList = this.dom.querySelector(`.date-transaction-list`)

    transactionList.forEach((transactionItem) => {
      $trnasactionList.appendChild(
        new TransactionItem({
          category: transactionItem.category,
          title: transactionItem.title,
          payment: transactionItem.payment,
          price: transactionItem.price,
        }).dom,
      )
    })
  }

  convertDate(dateString) {
    const dateObject = new Date(dateString)

    const month = dateObject.getMonth() + 1
    const date = dateObject.getDate()
    const day = KR_WEEK[dateObject.getDay()]

    return [month, date, day]
  }
}
