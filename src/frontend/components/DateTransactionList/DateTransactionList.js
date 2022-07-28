import { Component } from '../../core/component.js'
import { KR_WEEK } from '../../utils/constants.js'
import { calculateTransaction } from '../../utils/transactionUtil.js'
import { priceToString } from '../../utils/stringUtil.js'
import TransactionItem from '../TransactionItem/TransactionItem.js'

import './dateTransactionList.scss'

export default class DateTransactionList extends Component {
  template() {
    const { transactionList, showTotal } = this.props

    const [mm, dd, day] = this.convertDate(transactionList[0].payment_date)
    const [income, expense] = calculateTransaction(transactionList)

    return /*html*/ `
        <div class="date-transaction-list-wrapper">
            <div class="date-transaction-header">
                <div class="date-transaction-header-left">
                    <span class="date-transaction-header-date">${mm}월 ${dd}일<span>
                    <span class="date-transaction-header-day">${day}<span>
                </div>
                ${
                  showTotal
                    ? `<p class="date-transaction-header-summary">
                ${income ? `수입 ${priceToString(income)}` : ''}
                ${expense ? `지출 ${priceToString(expense)}` : ''}
                </p>`
                    : ''
                }
            </div>
            <div class="date-transaction-list">
            </div>
        </div>
      `
  }

  setComponent() {
    const { transactionList } = this.props
    const $transactionList = this.querySelector(`.date-transaction-list`)

    transactionList.forEach((transactionItem) => {
      $transactionList.appendChild(
        new TransactionItem({
          paymentDate: transactionItem.payment_date,
          id: transactionItem.id,
          category: transactionItem.category,
          title: transactionItem.title,
          paymentId: transactionItem.payment_id,
          payment: transactionItem.payment,
          price: transactionItem.price,
          isEditable: this.props.isEditable ?? false,
        }),
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

customElements.define('datetransaction-list', DateTransactionList)
