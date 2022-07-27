import { Component } from '../../core/component.js'
import { CATEGORY_INCOME, CATEGORY_EXPENSE } from '../../utils/constants.js'
import './categorydropdown.scss'

export default class CategoryDropdown extends Component {
  constructor(props) {
    super(props)
  }

  template() {
    return /*html*/ `
      <ul class="dropdown-ul category-select">
        <div class="dropdown-title expense">지출</div>
        ${Object.keys(CATEGORY_EXPENSE)
          .map((key) => ` <li class="dropdown-li false" id=${key}>${CATEGORY_EXPENSE[key]}</li>`)
          .join('')}
        <div class="dropdown-title income">수입</div>
        ${Object.keys(CATEGORY_INCOME)
          .map((key) => ` <li class="dropdown-li true" id=${key}>${CATEGORY_INCOME[key]}</li>`)
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
    const selectedItem = $item.id
    const option = e.target.classList.contains('true')
    this.props.handleInputCategory(selectedItem, option)
  }
}

customElements.define('category-dropdown', CategoryDropdown)
