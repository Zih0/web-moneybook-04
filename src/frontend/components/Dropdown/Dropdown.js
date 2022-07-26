import { Component } from '../../core/component.js'
import { INCOME, EXPENSE } from '../../utils/constants.js'
import './dropdown.scss'

export default class Dropdown extends Component {
  constructor(props) {
    super(props)
  }

  template() {
    return /*html*/ `
      <ul class="dropdown-ul">
        <div class="dropdown-title expense">지출</div>
        ${Object.keys(EXPENSE)
          .map((key) => ` <li class="dropdown-li" id=${key}>${EXPENSE[key]}</li>`)
          .join('')}
        <div class="dropdown-title income">수입</div>
        ${Object.keys(INCOME)
          .map((key) => ` <li class="dropdown-li" id=${key}>${INCOME[key]}</li>`)
          .join('')}
      </ul>
    `
  }

  setEvent() {
    const $categoryItem = this.querySelector('.dropdown-ul')
    $categoryItem.addEventListener('click', this.handleClickCategoryItem.bind(this))
  }

  handleClickCategoryItem(e) {
    const $item = e.target.closest('.dropdown-li')
    const selectedItem = $item.innerText
    this.props.setCategoryItem(selectedItem)
  }
}

customElements.define('custom-dropdown', Dropdown)
