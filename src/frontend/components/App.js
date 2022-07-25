import { Component } from '../core/component.js'
import Header from './Header/Header.js'
import { ROUTE } from '../utils/constants.js'
import MainPage from '../pages/MainPage/MainPage.js'
import CalendarPage from '../pages/CalendarPage/CalendarPage.js'
import ChartPage from '../pages/ChartPage/ChartPage.js'
import ErrorPage from '../pages/ErrorPage.js'

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
    const exampleObject = {
      [ROUTE['file-text']]: new MainPage(),
      [ROUTE.calendar]: new CalendarPage(),
      [ROUTE.chart]: new ChartPage(),
    }

    const pageComponent = exampleObject[pathname]
    $container.appendChild(pageComponent)
  }
}

customElements.define('app-root', App)
