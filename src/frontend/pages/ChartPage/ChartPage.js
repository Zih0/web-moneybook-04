import DateTransactionList from '../../components/DateTransactionList/DateTransactionList.js'
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart.js'
import LineChart from '../../components/LineChart/LineChart.js'
import { Component } from '../../core/component.js'
import { getState, subscribe, unsubscribeAll } from '../../core/observer.js'
import { selectedCategoryState } from '../../stores/chartStore.js'
import { transactionListState } from '../../stores/transactionStore.js'
import { classifyTransactionDataByDate } from '../../utils/transactionUtil.js'
import './chartPage.scss'

export default class ChartPage extends Component {
  constructor() {
    super()

    unsubscribeAll(transactionListState)
    subscribe(transactionListState, this.render.bind(this))
    subscribe(selectedCategoryState, this.render.bind(this))
  }
  template() {
    return /*html*/ `
    <div class="chart-page-container">
       <div class="chart-page-wrapper">
        <div id="doughnut-chart-replace"></div>
        <div id="line-chart-replace"></div>

        <div class="category-transaction-list">

        </div>
       </div>
    </div>
    `
  }

  setComponent() {
    const $doughnutChartReplace = this.querySelector('#doughnut-chart-replace')
    $doughnutChartReplace.replaceWith(new DoughnutChart())

    const selectedCategory = getState(selectedCategoryState)
    if (!selectedCategory) return

    const $lineChartReplace = this.querySelector('#line-chart-replace')
    $lineChartReplace.replaceWith(new LineChart())

    const transactionList = getState(transactionListState)
    if (!transactionList) return

    const $categoryTransactionList = this.querySelector('.category-transaction-list')

    const filteredList = this.filterTransactionListByCategory(transactionList, selectedCategory)
    const classifiedData = classifyTransactionDataByDate(filteredList)
    Object.values(classifiedData).forEach((transactionList, idx) => {
      $categoryTransactionList.appendChild(
        new DateTransactionList({
          transactionList,
          showTotal: false,
        }),
      )
    })
  }

  filterTransactionListByCategory(transactionList, category) {
    return transactionList.filter((transactionData) => transactionData.category === category)
  }
}

customElements.define('chart-container', ChartPage)
