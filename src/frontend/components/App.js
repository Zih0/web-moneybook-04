import { Component } from '../core/component.js'
import Header from './Header/Header.js'
import ErrorPage from '../pages/ErrorPage.js'

export default class App extends Component {
  constructor($target, props) {
    super($target, props)
  }
  route() {
    this.render()
  }

  template() {
    const { pathname } = location
    let route = false
    if (pathname === '/' || pathname === '/calendar' || pathname === '/chart') {
      route = true
    }

    if (route) {
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
    const $header = this.$target.querySelector('header')
    if ($header) {
      new Header($header, {
        route: this.route.bind(this),
      })
    }

    // URL에 따른 페이지 라우팅 처리
    const $main = this.$target.querySelector('.main')
    const { pathname } = location
    if (pathname === '/') {
      // 가계부 페이지
    } else if (pathname === '/calendar') {
      // 달력 페이지
    } else if (pathname === '/chart') {
      // 차트
    } else {
      // 404 페이지
      new ErrorPage($main)
    }
  }
}
