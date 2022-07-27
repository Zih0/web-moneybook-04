import { Component } from '../../core/component.js'
import { getMonthData } from '../../utils/calendar.js'
import { getState, subscribe } from '../../core/observer.js'
import { dateState } from '../../stores/dateStore.js'
import { KR_WEEK } from '../../utils/constants.js'
import { calculateTransaction, classifyTransactionDataByDate } from '../../utils/transactionUtil.js'
import { isToday } from '../../utils/calendar.js'
import { priceToString, fillZero } from '../../utils/stringUtil.js'
import { transactionListState } from '../../stores/transactionStore.js'
import './calendarPage.scss'

export default class CalendarPage extends Component {
  constructor() {
    super()
    subscribe(transactionListState, this.render.bind(this))
  }
  template() {
    const dateData = getState(dateState)
    const transactionList = getState(transactionListState)

    return /*html*/ `
      <div class="chart-page-container">
        <div class="chart-page-wrapper">
          <div class="calendar-week-day">
          ${KR_WEEK.map((day) => `<div>${day}</div>`).join('')}
          </div>
          <div class="calendar-month">
          ${this.printCalendar(dateData, transactionList)}
          </div>
          <div class="calendar-summary">
          ${this.printSummary(transactionList)}
          </div>
        </div>
      </div>
    `
  }

  printSummary(transactionList) {
    const [income, expense] = calculateTransaction(transactionList)

    return /*html*/ `
      <p class="summary-income-expense">총 수입 ${priceToString(income)} 총 지출 ${priceToString(
      expense,
    )}</p>
      <p>총계 ${priceToString(income - expense)}</p>
    `
  }

  printCalendar(dateData, transactionList) {
    const monthData = getMonthData(dateData)
    const classifiedData = classifyTransactionDataByDate(transactionList)

    const { year, month } = dateData

    const monthHTML = monthData
      .map((weekData) => {
        return `
        <div class="calendar-week">
          ${weekData
            .map((date) => {
              if (!date) {
                return `<div class="calendar-box ${
                  isToday({ year, month, date }) ? 'today' : ''
                }"></div>`
              }

              const hasPriceData = Object.keys(classifiedData).includes(
                `${year}-${fillZero(month)}-${date}`,
              )

              let income, expense
              if (hasPriceData) {
                const [inc, exp] = calculateTransaction(
                  classifiedData[`${year}-${fillZero(month)}-${date}`],
                )
                income = inc
                expense = -exp
              }

              return `
              <div class="calendar-box ${isToday({ year, month, date }) ? 'today' : ''}">
                ${this.printPrice(
                  hasPriceData && {
                    income,
                    expense,
                  },
                )}
                <p class="calendar-date">${date}</p>
              </div>
          `
            })
            .join('')}
        </div>`
      })
      .join('')

    return monthHTML
  }

  printPrice(priceInfo) {
    if (!priceInfo) return `<div class='calendar-price-info'></div>`

    const { income, expense } = priceInfo

    return `
      <div class='calendar-price-info'>
        ${income ? `<div class='calendar-price-income'>${priceToString(income)}</div>` : ''}
        ${expense ? `<div class='calendar-price-expense'>${priceToString(expense)}</div>` : ''}
        <div class='calendar-price-total'>${priceToString(income + expense)}</div>
      </div>
    `
  }
}
customElements.define('calendar-container', CalendarPage)
