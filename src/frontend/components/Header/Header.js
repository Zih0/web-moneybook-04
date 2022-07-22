import { Component } from '../../core/component.js'
import { ROUTE } from '../../utils/constants.js'
import './header.scss'
import IconFileText from '../../assets/file-text.svg'
import IconCalendar from '../../assets/calendar.svg'
import IconChart from '../../assets/chart.svg'
import IconLeftArrow from '../../assets/left-arrow.svg'
import IconRightArrow from '../../assets/right-arrow.svg'

export default class Header extends Component {
  hadnleRoute(e) {
    const target = e.target.closest('button')
    if (!target) return

    const { className } = target
    history.pushState(null, null, ROUTE[className])
    this.props.route()
  }

  setEvent() {
    this.dom.querySelector('.route').addEventListener('click', this.hadnleRoute.bind(this))
    this.dom.querySelector('.logo').addEventListener('click', this.hadnleRoute.bind(this))
  }

  template() {
    return /*html*/ `
    <header>
      <div class='header-container'>
        <div class='logo'>
          <button class='file-text'>우아한 가계부</button>
        </div>

        <div class='date-wrap'>
          <button class="arrow">
              ${IconLeftArrow}
          </button>

          <div class='text-wrap'>
            <span class='month-text'>7월</span>
            <span class='year-text'>2021</span>
          </div>

          <button class="arrow">
              ${IconRightArrow}
          </button>
        </div>

        <div class='menu-wrap route'>
          <button class="file-text">
            ${IconFileText}
          </button>

          <button class="calendar">
            ${IconCalendar}
          </button>

          <button class="chart">
            ${IconChart}
          </button>
        </div>
      </div>
    </header>
    `
  }
}
