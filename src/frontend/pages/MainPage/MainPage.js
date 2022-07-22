import { Component } from '../../core/component.js'
import TransactionList from '../../components/TransactionList/TransactionList.js'
import './mainPage.scss'

export default class MainPage extends Component {
  template() {
    return /*html*/ `
    <div class="main-page">
      <div class="transaction-list-wrapper"></div>
    </div>
    `
  }

  setComponent() {
    const $trnasactionList = this.dom.querySelector('.transaction-list-wrapper')

    $trnasactionList.replaceWith(
      new TransactionList({
        reRender: this.render.bind(this),
      }).dom,
    )
  }
}
