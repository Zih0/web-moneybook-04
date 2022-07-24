import DoughnutChart from '../../components/DoughnutChart/DoughnutChart.js'
import { Component } from '../../core/component.js'
import './chartPage.scss'

export default class ChartPage extends Component {
  template() {
    return /*html*/ `
    <div class="chart-page-container">
       <div class="chart-page-wrapper">
        <div id="donut-chart-replace"></div>
       </div>
    </div>
    `
  }

  setComponent() {
    const $donutChartReplace = this.querySelector('#donut-chart-replace')

    $donutChartReplace.replaceWith(new DoughnutChart())
  }
}
customElements.define('chart-container', ChartPage)
