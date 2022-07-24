import { Component } from '../../core/component.js'
import { CATEGORY } from '../../utils/constants.js'
import { priceToString } from '../../utils/stringUtil.js'
import './doughnutChart.scss'

const dummy = [
  { category: 'food', price: '780000' },
  { category: 'traffic', price: '830000' },
  { category: 'culture', price: '760000' },
  { category: 'undefined', price: '1020000' },
  { category: 'life', price: '850000' },
  { category: 'health', price: '780000' },
]

export default class DoughnutChart extends Component {
  template() {
    const totalExpense = this.getTotalExpense(dummy)

    return /*html*/ `
      <div class="doughnut-board">
      <svg width="300px" height="300px" viewBox="0 0 100 100" class="doughnut">
      </svg>
        <div class="doughnut-price-wrapper">
          <p class="doughnut-price-total">이번 달 지출 금액 ${priceToString(totalExpense)}</p>
          ${dummy
            .map(
              (categoryExpense) => `<div class="price-category-wrapper">
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
    `
  }

  setComponent() {
    this.printChart()
  }

  getTotalExpense(data) {
    const prices = data.map(({ price }) => Number(price))
    return prices.reduce((acc, cur) => acc + Number(cur), 0)
  }

  getExpenseRatio(price, totalExpense) {
    return ((Number(price) / Number(totalExpense)) * 100).toFixed(0)
  }

  printChart() {
    const radius = 40 // 차트의 반지름
    const diameter = 2 * Math.PI * radius // 차트의 둘레

    const categories = dummy.map(({ category }) => category)
    const prices = dummy.map(({ price }) => Number(price))

    // 전체 데이터셋의 총 합
    const totalSum = this.getTotalExpense(dummy)

    // 데이터셋의 누적 값
    const acc = prices.reduce(
      (arr, cur) => {
        const last = arr[arr.length - 1]
        return [...arr, last + cur]
      },
      [0],
    )

    const $svg = this.querySelector('.doughnut')

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

    $svg.innerHTML = $circles
  }
}

customElements.define('donut-chart', DoughnutChart)
