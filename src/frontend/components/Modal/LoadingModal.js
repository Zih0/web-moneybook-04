import { Component } from '../../core/component.js'
import './loadingModal.scss'

export default class LoadingModal extends Component {
  template() {
    return /*html*/ `
    <div class="modal-wrapper">
      <div class="loading-modal-background"></div>
        <div class="modal-content">
          <div class="loading-spinner"></div>
        </div>
      </div>
    </div>
    `
  }
}

customElements.define('loading-modal', LoadingModal)
