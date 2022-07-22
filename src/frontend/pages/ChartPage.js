import { Component } from '../core/component.js'

export default class ChartPage extends Component {
  template() {
    return /*html*/ `
    <div>
       차트 페이지
    </div>
    `
  }
}
customElements.define('chart-container', ChartPage)
