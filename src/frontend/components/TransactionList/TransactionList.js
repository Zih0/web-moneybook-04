import { Component } from '../../core/component.js'
import { getState } from '../../core/observer.js'
import { transactionListState } from '../../stores/transactionStore.js'
import { calculateTransaction } from '../../utils/priceUtil.js'
import DateTransactionList from '../DateTransactionList/DateTransactionList.js'
import './transactionList.scss'
import IconCheckboxDefault from '../../assets/checkbox-default.svg'
import IconCheckboxActive from '../../assets/checkbox-active.svg'

export default class TransactionList extends Component {
  constructor(props) {
    super(props)

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
                <input type="checkbox" id="filter-income" />
                <label for="filter-income">
                  <i>${incomeChecked ? IconCheckboxActive : IconCheckboxDefault}</i>
                  수입 ${totalIncome}
                </label>
                <input type="checkbox" id="filter-expense" />
                <label for="filter-expense">
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
    const { checked, id } = e.target

    if (checked === 'undefined') return

    if (id === 'filter-income') {
      this.setState({ incomeChecked: checked })
    } else if (id === 'filter-expense') {
      this.setState({ expenseChecked: checked })
    }

    this.props.reRender()
  }

  setEvent() {
    const $incomeCheckbox = this.dom.querySelector('#filter-income')
    const $expenseCheckbox = this.dom.querySelector('#filter-expense')

    $incomeCheckbox.addEventListener('change', this.handleChangeIncomeCheckbox.bind(this))
    $expenseCheckbox.addEventListener('change', this.handleChangeIncomeCheckbox.bind(this))
  }

  setComponent() {
    const transactionDataList = getState(transactionListState)
    const classifiedData = this.classifyTransactionDataByDate(transactionDataList)

    const $replaceElementList = this.dom.querySelectorAll(`.transaction-date-list`)

    Object.values(classifiedData).forEach((transactionList, idx) => {
      $replaceElementList[idx].replaceWith(
        new DateTransactionList({
          transactionList,
        }).dom,
      )
    })
  }

  classifyTransactionDataByDate(transactionDataList) {
    const newData = {}
    transactionDataList.forEach((transactionData) => {
      if (newData[transactionData.payment_date]) {
        newData[transactionData.payment_date].push(transactionData)
      } else {
        newData[transactionData.payment_date] = [transactionData]
      }
    })

    return newData
  }
}
