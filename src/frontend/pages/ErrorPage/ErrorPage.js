import { Component } from '../../core/component.js'
import { ROUTE } from '../../utils/constants.js'
import './errorPage.scss'

export default class ErrorPage extends Component {
  template() {
    return /*html*/ `
    <div class="error-wrapper">
       <div class="error-main">
        <h3 class="error-header">우아한 가계부</h3>
        <img class="error-image" src="https://ceo-cdn.baemin.com/cdn/ceo-square/src/images/magnifying.png?ver=593ac352e19a5c63bf509dfe61179dd2" alt="not-found" />
        <p class="error-title">요청하신 페이지를</p>
        <p class="error-title">찾을 수 없습니다</p>
        <br />
        <p class="error-desc">입력한 주소가 정확한지</p>
        <p class="error-desc">다시 한번 확인해주세요.</p>
        <button class="home-button">홈으로 이동하기</button>
       </div>
    </div>
    `
  }

  handleClickHomeButton() {
    history.pushState(null, null, ROUTE['file-text'])
    this.props.route()
  }

  setEvent() {
    const $homeButton = this.querySelector('.home-button')

    $homeButton.addEventListener('click', this.handleClickHomeButton.bind(this))
  }
}
customElements.define('error-container', ErrorPage)
