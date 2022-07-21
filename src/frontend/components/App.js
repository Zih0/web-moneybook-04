import { Component } from '../core/component.js'
import Header from './Header/Header.js'
import ErrorPage from '../pages/ErrorPage.js'
import { ROUTE } from '../utils/constants.js'

export default class App extends Component {
  constructor($target, props) {
    super($target, props)
  }
  route() {
    this.render()
  }

  template() {
    const { pathname } = location
    const isRoute =
      pathname === ROUTE.fileText || pathname === ROUTE.calendar || pathname === ROUTE.chart

    if (isRoute) {
      return /*html*/ `
            <header>
            </header>
            <div class='main'>
            </div>
        `
    } else {
      return /*html*/ `
        <div class='main'>
        </div>
      `
    }
  }

  setEvent() {
    window.addEventListener('popstate', this.route.bind(this))
  }

  setComponent() {
    // 정상적인 URL 경우에만 header컴포넌트 생성
    const $header = this.dom.querySelector('header')
    if ($header) {
      $header.replaceWith(
        new Header({
          route: this.route.bind(this),
        }).dom,
      )
    }

    // URL에 따른 페이지 라우팅 처리
    const $main = this.dom.querySelector('.main')
    const { pathname } = location
    if (pathname === ROUTE.fileText) {
      // 가계부 페이지
    } else if (pathname === ROUTE.calendar) {
      // 달력 페이지
    } else if (pathname === ROUTE.chart) {
      // 차트
    } else {
      // 404 페이지
      $main.replaceWith(new ErrorPage().dom)
    }
  }
}
