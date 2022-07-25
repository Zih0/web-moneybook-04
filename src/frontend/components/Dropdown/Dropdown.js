import { Component } from '../../core/component.js'
import './dropdown.scss'

export default class Dropdown extends Component {
  template() {
    return /*html*/ `
      <ul class="dropdown-ul">
        <div class="dropdown-title expense">지출</div>
        <li class="dropdown-li">생활</li>
        <div class="dropdown-title income">수입</div>
        <li class="dropdown-li">용돈</li>
        <li class="dropdown-li">월급</li>
        <li class="dropdown-li">기타수입</li>
      </ul>
    `
  }
}

customElements.define('custom-dropdown', Dropdown)
