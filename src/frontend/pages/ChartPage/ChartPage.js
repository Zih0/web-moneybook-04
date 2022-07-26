import DoughnutChart from '../../components/DoughnutChart/DoughnutChart.js'
import { Component } from '../../core/component.js'
import { getState, subscribe } from '../../core/observer.js'
import {
  selectedCategoryState,
  selectedCategoryTransactionListState,
} from '../../stores/chartStore.js'
import './chartPage.scss'

export default class ChartPage extends Component {
  constructor() {
    super()

    subscribe(selectedCategoryState, this.render.bind(this))
    subscribe(selectedCategoryTransactionListState, this.render.bind(this))
  }
  template() {
    return /*html*/ `
    <div class="chart-page-container">
       <div class="chart-page-wrapper">
        <div id="doughnut-chart-replace"></div>


        <div class="category-transaction-list">
        </div>
       </div>
    </div>
    `
  }

  setComponent() {
    const $doughnutChartReplace = this.querySelector('#doughnut-chart-replace')
    $doughnutChartReplace.replaceWith(new DoughnutChart())
  }
}
customElements.define('chart-container', ChartPage)
