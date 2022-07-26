import { Component } from '../../core/component.js'
import { getState, subscribe } from '../../core/observer.js'
import { transactionListState } from '../../stores/transactionStore.js'
import { calculateTransaction, classifyTransactionDataByDate } from '../../utils/transactionUtil.js'
import DateTransactionList from '../DateTransactionList/DateTransactionList.js'
import './transactionList.scss'
import IconCheckboxDefault from '../../assets/checkbox-default.svg'
import IconCheckboxActive from '../../assets/checkbox-active.svg'
import { dateState } from '../../stores/dateStore.js'

export default class TransactionList extends Component {
  constructor(props) {
    super(props)

    subscribe(transactionListState, this.render.bind(this))
  }

  initState() {
    this.state = {
      incomeChecked: true,
      expenseChecked: true,
    }
  }

  template() {
    const { incomeChecked, expenseChecked } = this.state
    const transactionDataList = getState(transactionListState)
    const filteredTransactionList = this.filterIncomeExpense(transactionDataList)
    const transactionDataLength = filteredTransactionList.length

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
            </div>
          </div>
        </div>
      `
  }

  setEvent() {
    const $incomeCheckbox = this.querySelector('#filter-income')
    const $expenseCheckbox = this.querySelector('#filter-expense')

    $incomeCheckbox.addEventListener('change', this.handleChangeCheckbox.bind(this))
    $expenseCheckbox.addEventListener('change', this.handleChangeCheckbox.bind(this))
  }

  setComponent() {
    const transactionDataList = getState(transactionListState)

    const filteredTransactionList = this.filterIncomeExpense(transactionDataList)
    const classifiedData = classifyTransactionDataByDate(filteredTransactionList)

    const $transactionList = this.querySelector(`.transaction-list-wrapper`)

    Object.values(classifiedData).forEach((transactionList, idx) => {
      $transactionList.appendChild(
        new DateTransactionList({
          transactionList,
        }),
      )
    })
  }

  handleChangeCheckbox(e) {
    const { checked, id } = e.target

    if (id === 'filter-income') {
      this.setState({ incomeChecked: checked })
    } else if (id === 'filter-expense') {
      this.setState({ expenseChecked: checked })
    }
  }

  filterIncomeExpense(transactionDataList) {
    const { incomeChecked, expenseChecked } = this.state

    return transactionDataList.filter((transactionData) => {
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
  }
}

customElements.define('transaction-list', TransactionList)
