import { Component } from '../../core/component.js'
import IconChevronTop from '../../assets/chevron-top.svg'
import './fabButton.scss'

const SHOW_BUTTON_Y = 200

export default class FABButton extends Component {
  template() {
    return `
      <button class="fab-wrapper">
        ${IconChevronTop}
      </button>
    `
  }

  handleScroll() {
    const $fabButton = this.querySelector('.fab-wrapper')

    if (window.scrollY > SHOW_BUTTON_Y) {
      $fabButton.classList.add('active')
    } else {
      $fabButton.classList.remove('active')
    }
  }

  handleClickFABButton() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  setEvent() {
    const $fabButton = this.querySelector('.fab-wrapper')

    window.addEventListener('scroll', this.handleScroll.bind(this))
    $fabButton.addEventListener('click', this.handleClickFABButton)
  }
}

customElements.define('fab-button', FABButton)
