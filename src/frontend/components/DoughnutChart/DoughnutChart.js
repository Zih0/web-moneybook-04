import { getCategorySixMonthTrend } from '../../api/transactionHistory.js'
import { Component } from '../../core/component.js'
import { getState, setState, subscribe } from '../../core/observer.js'
import {
  expenseTransactionListState,
  selectedCategoryState,
  sixMonthTrendState,
} from '../../stores/chartStore.js'
import { dateState } from '../../stores/dateStore.js'
import { CATEGORY } from '../../utils/constants.js'
import { priceToString } from '../../utils/stringUtil.js'
import './doughnutChart.scss'

export default class DoughnutChart extends Component {
  constructor() {
    super()

    this.setCategory = setState(selectedCategoryState)
    this.sixMonthTrend = setState(sixMonthTrendState)
    subscribe(expenseTransactionListState, this.render.bind(this))
  }

  initState() {
    this.state = {
      prevSelectedCategory: '',
    }
  }

  template() {
    const expenseTransactionHistoryList = getState(expenseTransactionListState)
    const totalExpense = this.getTotalExpense(expenseTransactionHistoryList)

    if (!expenseTransactionHistoryList.length) {
      return /*html*/ `
        <div class="doughnut-board">지출 내역이 존재하지 않습니다.</div>
      `
    }

    return /*html*/ `
      <div class="doughnut-board">
      ${this.printChart()}
        <div class="doughnut-price-wrapper">
          <p class="doughnut-price-total">이번 달 지출 금액 ${priceToString(totalExpense)}</p>
          <div class="doughnut-category-list">
            ${expenseTransactionHistoryList
              .map(
                (categoryExpense) => `<div class="price-category-wrapper" data-category="${
                  categoryExpense.category
                }">
            <div class="category-chip ${categoryExpense.category}">${
                  CATEGORY[categoryExpense.category]
                }</div>
            <p class="category-percentage">${this.getExpenseRatio(
              categoryExpense.price,
              totalExpense,
            )}%</p>
            <p class="category-price">${priceToString(categoryExpense.price)}</p>
          </div>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    `
  }

  setEvent() {
    const expenseTransactionHistoryList = getState(expenseTransactionListState)
    if (!expenseTransactionHistoryList.length) return

    const $doughnutCategoryList = this.querySelector('.doughnut-category-list')

    $doughnutCategoryList.addEventListener('click', this.handleClickExpenseCategory.bind(this))
  }

  async handleClickExpenseCategory(e) {
    const $categoryWrapper = e.target.closest('.price-category-wrapper')
    const { category } = $categoryWrapper.dataset
    const { prevSelectedCategory } = this.state

    if (prevSelectedCategory === category) return

    const { year, month } = getState(dateState)
    const sixMonthTrendData = await getCategorySixMonthTrend(year, month, category)

    this.sixMonthTrend(sixMonthTrendData)
    this.setCategory(category)
  }

  getTotalExpense(data) {
    const prices = data.map(({ price }) => Number(price))
    return prices.reduce((acc, cur) => acc + Number(cur), 0)
  }

  getExpenseRatio(price, totalExpense) {
    return ((Number(price) / Number(totalExpense)) * 100).toFixed(0)
  }

  printChart() {
    const expenseTransactionHistoryList = getState(expenseTransactionListState)
    const radius = 40 // 차트의 반지름
    const diameter = 2 * Math.PI * radius // 차트의 둘레

    const categories = expenseTransactionHistoryList.map(({ category }) => category)
    const prices = expenseTransactionHistoryList.map(({ price }) => Number(price))

    // 전체 데이터셋의 총 합
    const totalSum = this.getTotalExpense(expenseTransactionHistoryList)

    // 데이터셋의 누적 값
    const acc = prices.reduce(
      (arr, cur) => {
        const last = arr[arr.length - 1]
        return [...arr, last + cur]
      },
      [0],
    )

    const $circles = prices.reduce((circles, price, idx) => {
      // 비율
      const ratio = price / totalSum
      const fillSpace = diameter * ratio
      const emptySpace = diameter - fillSpace
      const offset = (acc[idx] / totalSum) * diameter

      const $circle = `<circle class="${
        categories[idx]
      }" cx="50" cy="50" r=${radius} fill="transparent" stroke-width="15" stroke-dasharray="${fillSpace} ${emptySpace}" stroke-dashoffset="${-offset}"></circle>`

      return (circles += $circle)
    }, '')

    return `
      <svg width="300px" height="300px" viewBox="0 0 100 100" class="doughnut">
        ${$circles}
      </svg>
    `
  }
}

customElements.define('donut-chart', DoughnutChart)
