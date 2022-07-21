import { Component } from '../../core/component.js'
import fileText from '../../assets/file-text.svg'
import calendar from '../../assets/calendar.svg'
import chart from '../../assets/chart.svg'

export default class Header extends Component {
  hadnleRoute(e) {
    const target = e.target.closest('button')
    if (!target) return

    const { className } = target

    switch (className) {
      case 'fileText':
        history.pushState(null, null, '/')
        break
      case 'calendar':
        history.pushState(null, null, '/calendar')
        break
      case 'chart':
        history.pushState(null, null, '/chart')
        break
      default:
        break
    }
    this.props.route()
  }

  setEvent() {
    this.$target.querySelector('.route').addEventListener('click', this.hadnleRoute.bind(this))
  }

  template() {
    return /*html*/ `
    <div class='route'>
        <div>
            <button class='fileText' style = "width:100px;">
                ${fileText}
            </button>
        </div>
        <div>
            <button class='calendar' style = "width:100px;">
                ${calendar}
            </button>
        </div>
        <div>
            <button class='chart' style = "width:100px;">
                ${chart}
            </button>
        </div>
    </div>
    `
  }
}
