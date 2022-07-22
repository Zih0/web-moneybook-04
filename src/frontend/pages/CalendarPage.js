import { Component } from '../core/component.js'

export default class CalendarPage extends Component {
  template() {
    return /*html*/ `
    <div>
       달력 페이지
    </div>
    `
  }
}
customElements.define('calendar-container', CalendarPage)
