import { Component } from '../../core/component.js'
import TransactionList from '../../components/TransactionList/TransactionList.js'
import PaymentBar from '../../components/PaymentBar/PaymentBar.js'
import './mainPage.scss'
import FABButton from '../../components/FABButton/FABButton.js'

export default class MainPage extends Component {
  template() {
    return /*html*/ `
    <div class="main-page">
      <div class="transaction-list-wrapper"></div>
      <div id="fab-replace"></div>
    </div>
    `
  }

  setComponent() {
    const $trnasactionList = this.querySelector('.transaction-list-wrapper')
    const $fabButtonReplace = this.querySelector('#fab-replace')
    $trnasactionList.appendChild(new PaymentBar())
    $trnasactionList.appendChild(new TransactionList())
    $fabButtonReplace.replaceWith(new FABButton())
  }
}

customElements.define('main-page', MainPage)
