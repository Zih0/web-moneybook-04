import { Component } from '../core/component.js'
import Header from './Header/Header.js'
import { ROUTE } from '../utils/constants.js'
import MainPage from '../pages/MainPage/MainPage.js'
import CalendarPage from '../pages/CalendarPage/CalendarPage.js'
import ChartPage from '../pages/ChartPage/ChartPage.js'
import ErrorPage from '../pages/ErrorPage.js'
import { transactionListState } from '../stores/transactionStore.js'
import { dateState } from '../stores/dateStore.js'
import {
  getTransactionHistoryList,
  getExpenseTransactionHistoryList,
} from '../api/transactionHistory.js'
import { getState, setState, subscribe } from '../core/observer.js'
import { expenseTransactionListState } from '../stores/chartStore.js'

export default class App extends Component {
  constructor() {
    super()

    subscribe(dateState, this.render.bind(this))
  }

  route() {
    this.render()
  }

  template() {
    return `
      <div class='container'>
      </div>
    `
  }

  setEvent() {
    window.addEventListener('popstate', this.route.bind(this))
  }

  setComponent() {
    const { pathname } = location
    const isRoute =
      pathname === ROUTE['file-text'] || pathname === ROUTE.calendar || pathname === ROUTE.chart

    const $container = this.querySelector('.container')
    if (!isRoute) {
      $container.appendChild(
        new ErrorPage({
          route: this.route.bind(this),
        }),
      )
      return
    }

    // 정상적인 URL 경우에만 header컴포넌트 생성
    $container.appendChild(
      new Header({
        route: this.route.bind(this),
      }),
    )

    // URL에 따른 페이지 라우팅 처리
    switch (pathname) {
      case '/':
        $container.appendChild(new MainPage())
        break
      case '/calendar':
        $container.appendChild(new CalendarPage())
        break
      case '/chart':
        $container.appendChild(new ChartPage())
        break
      default:
        break
    }
  }

  async componentDidMount() {
    const { pathname } = location
    const { year, month } = getState(dateState)

    const setTransactionListState = setState(transactionListState)
    const transactionListData = await getTransactionHistoryList(year, month)
    setTransactionListState(transactionListData)

    if (pathname === ROUTE.chart) {
      const setExpenseTransactionListState = setState(expenseTransactionListState)
      const expenseTransactionListData = await getExpenseTransactionHistoryList(year, month)
      setExpenseTransactionListState(expenseTransactionListData)
    }
  }
}

customElements.define('app-root', App)
