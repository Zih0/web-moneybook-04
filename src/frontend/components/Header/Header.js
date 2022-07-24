import { Component } from '../../core/component.js'
import { ROUTE } from '../../utils/constants.js'
import IconFileText from '../../assets/file-text.svg'
import IconCalendar from '../../assets/calendar.svg'
import IconChart from '../../assets/chart.svg'
import IconLeftArrow from '../../assets/left-arrow.svg'
import IconRightArrow from '../../assets/right-arrow.svg'
import { getState, subscribe, setState } from '../../core/observer.js'
import { dateState } from '../../stores/dateStore.js'
import './header.scss'

export default class Header extends Component {
  constructor(props) {
    super(props)
    subscribe(dateState, this.render.bind(this))
    this.setDate = setState(dateState)
  }

  template() {
    const { year, month } = getState(dateState)

    return /*html*/ `
    <header>
      <div class='header-container'>
        <div class='logo route'>
          <button class='file-text'>우아한 가계부</button>
        </div>

        <div class='date-wrap'>
          <button class="left-arrow">
              ${IconLeftArrow}
          </button>

          <div class='text-wrap'>
            <span class='month-text'>${month}월</span>
            <span class='year-text'>${year}</span>
          </div>

          <button class="right-arrow">
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

  setEvent() {
    const routes = this.querySelectorAll('.route')
    routes.forEach((route) => route.addEventListener('click', this.hadnleRoute.bind(this)))
    this.querySelector('.date-wrap').addEventListener('click', this.handleDate.bind(this))
  }

  hadnleRoute(e) {
    const target = e.target.closest('button')
    if (!target) return

    const { className } = target
    history.pushState(null, null, ROUTE[className])
    this.props.route()
  }

  handleDate(e) {
    const $button = e.target.closest('button')
    if (!$button) return

    const { className } = $button
    const { year, month } = getState(dateState)
    const { nextYear, nextMonth } = this.makeCalendar(year, month, className)

    this.setDate({ year: nextYear, month: nextMonth })
  }

  makeCalendar(year, month, className) {
    let nextYear = year
    let nextMonth = className === 'left-arrow' ? month - 1 : month + 1

    if (nextMonth > 12) {
      nextMonth = 1
      nextYear += 1
    } else if (nextMonth < 1) {
      nextMonth = 12
      nextYear -= 1
    }

    return { nextYear, nextMonth }
  }
}

customElements.define('header-container', Header)
