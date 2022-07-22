import { Component } from '../core/component.js'
import Header from './Header/Header.js'
import ErrorPage from '../pages/ErrorPage.js'
import { ROUTE } from '../utils/constants.js'
import TransactionList from './TransactionList/TransactionList.js'
import MainPage from '../pages/MainPage/MainPage.js'

export default class App extends Component {
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
      pathname === ROUTE.fileText || pathname === ROUTE.calendar || pathname === ROUTE.chart

    // 정상적인 URL 경우에만 header컴포넌트 생성
    const $container = this.querySelector('.container')
    if (isRoute) {
      $container.appendChild(
        new Header({
          route: this.route.bind(this),
        }),
      )
    }

    // URL에 따른 페이지 라우팅 처리
    if (pathname === ROUTE.fileText) {
      // 가계부 페이지
      $container.appendChild(new MainPage())
    } else if (pathname === ROUTE.calendar) {
      // 달력 페이지
    } else if (pathname === ROUTE.chart) {
      // 차트
    } else {
      // 404 페이지
      $container.appendChild(new ErrorPage())
    }
  }
}

customElements.define('app-root', App)
