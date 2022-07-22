import { Component } from '../../core/component.js'
import { getState } from '../../core/observer.js'
import { transactionListState } from '../../stores/transactionStore.js'
import { calculateTransaction } from '../../utils/priceUtil.js'
import DateTransactionList from '../DateTransactionList/DateTransactionList.js'
import './transactionList.scss'
import IconCheckboxDefault from '../../assets/checkbox-default.svg'
import IconCheckboxActive from '../../assets/checkbox-active.svg'

export default class TransactionList extends Component {
  initState() {
    this.state = {
      incomeChecked: true,
      expenseChecked: true,
    }
  }

  template() {
    const { incomeChecked, expenseChecked } = this.state
    const transactionDataList = getState(transactionListState)
    const transactionDataLength = transactionDataList.length

    const classifiedData = this.classifyTransactionDataByDate(transactionDataList)

    const [totalIncome, totalExpense] = calculateTransaction(transactionDataList)

    return /*html*/ `
        <div class="transaction-container">
          <div class="transaction-wrapper">
            <div class="transaction-list-header">
              <span class="transaction-count-text">전체 내역 ${transactionDataLength}건</span>
              <div class="transaction-list-filter">
                <input type="checkbox" id="filter-income" ${incomeChecked ? 'checked' : ''} />
                <label for="filter-income" class="${!incomeChecked ? 'unchecked' : ''}">
                  <i>${incomeChecked ? IconCheckboxActive : IconCheckboxDefault}</i>
                  수입 ${totalIncome}
                </label>
                <input type="checkbox" id="filter-expense" ${expenseChecked ? 'checked' : ''} />
                <label for="filter-expense"  class="${!expenseChecked ? 'unchecked' : ''}">
                <i>${expenseChecked ? IconCheckboxActive : IconCheckboxDefault}</i>
                  지출 ${totalExpense}
                </label>
              </div>
              </div>
            <div class="transaction-list-wrapper">
                ${Object.keys(classifiedData)
                  .map((_) => `<div class="transaction-date-list"></div>`)
                  .join('')}
            </div>
          </div>
        </div>
      `
  }

  handleChangeIncomeCheckbox(e) {
    const { checked } = e.target
    this.setState({ incomeChecked: checked })
  }

  handleChangeExpenseCheckbox(e) {
    const { checked } = e.target
    this.setState({ expenseChecked: checked })
  }

  setEvent() {
    const $incomeCheckbox = this.querySelector('#filter-income')
    const $expenseCheckbox = this.querySelector('#filter-expense')

    $incomeCheckbox.addEventListener('change', this.handleChangeIncomeCheckbox.bind(this))
    $expenseCheckbox.addEventListener('change', this.handleChangeExpenseCheckbox.bind(this))
  }

  setComponent() {
    const transactionDataList = getState(transactionListState)
    const classifiedData = this.classifyTransactionDataByDate(transactionDataList)

    const $replaceElementList = this.querySelectorAll(`.transaction-date-list`)

    Object.values(classifiedData).forEach((transactionList, idx) => {
      $replaceElementList[idx].replaceWith(
        new DateTransactionList({
          transactionList,
        }),
      )
    })
  }

  classifyTransactionDataByDate(transactionDataList) {
    const { incomeChecked, expenseChecked } = this.state

    const filteredTransactionDataList = transactionDataList.filter((transactionData) => {
      if (incomeChecked && expenseChecked) {
        return true
      }

      if (incomeChecked && !expenseChecked) {
        return transactionData.price > 0
      }

      if (!incomeChecked && expenseChecked) {
        return transactionData.price < 0
      }

      return false
    })

    const newData = {}
    filteredTransactionDataList.forEach((transactionData) => {
      if (newData[transactionData.payment_date]) {
        newData[transactionData.payment_date].push(transactionData)
      } else {
        newData[transactionData.payment_date] = [transactionData]
      }
    })

    return newData
  }
}

customElements.define('transaction-list', TransactionList)
