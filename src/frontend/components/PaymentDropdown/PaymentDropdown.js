import { Component } from '../../core/component.js'
import IconRemove from '../../assets/removeIcon.svg'
import AddPaymentModal from '../Modal/AddPaymentModal.js'
import RemovePaymentModal from '../Modal/RemovePaymentModal.js'
import { openModal } from '../../utils/modal.js'
import { createPayment, deletePaymentAPI } from '../../api/payment.js'
import { getState, setState, subscribe } from '../../core/observer.js'
import { paymentListState } from '../../stores/transactionStore.js'
import './paymentdropdown.scss'

export default class PaymentDropdown extends Component {
  constructor(props) {
    super(props)
    subscribe(paymentListState, this.render.bind(this))
    this.setPaymentList = setState(paymentListState)
  }

  template() {
    const { isUpdate } = this.props
    const payment = getState(paymentListState)
    return /*html*/ `
      <ul class="dropdown-ul payment-select  ${isUpdate ? 'update' : ''}">
        ${payment
          .map(
            ({ id, name }) => ` <li class="dropdown-li" id=${id} name="${name}">${name} 
          <button class='payment-remove-button'>${IconRemove}</button>
          </li>`,
          )
          .join('')}
          <li class='dropdown-li create-li'>추가하기</li>
      </ul>
    `
  }

  setEvent() {
    const $paymentItem = this.querySelector('.dropdown-ul')
    $paymentItem.addEventListener('click', this.handleClickCategoryItem.bind(this))
  }

  handleClickCategoryItem(e) {
    const $item = e.target.closest('.dropdown-li')

    // 삭제 버튼 클릭한 경우
    const $remove = e.target.closest('.payment-remove-button')
    if ($remove) {
      openModal(
        new RemovePaymentModal({
          id: $item.id,
          name: $item.getAttribute('name'),
          deletePayment: this.deletePayment.bind(this),
        }),
      )
      return
    }

    //추가하기 버튼 클릭한 경우
    if ($item.classList.contains('create-li')) {
      openModal(new AddPaymentModal({ addPayment: this.addPayment.bind(this) }))
    }

    // li를 클릭한 경우
    else {
      const paymentId = $item.id
      const paymentName = $item.innerText
      this.props.handleInputPaymentId(paymentId, paymentName)
    }
  }

  async addPayment(paymentName) {
    try {
      const data = await createPayment({ name: paymentName })

      const payment = getState(paymentListState)
      this.setPaymentList([...payment, { id: data.id, name: paymentName }])
    } catch (e) {
      console.error(e)
    }
  }

  async deletePayment(id) {
    try {
      await deletePaymentAPI(id)
      const paymentList = getState(paymentListState)
      const filterPayment = paymentList.filter((payment) => payment.id !== Number(id))
      this.setPaymentList([...filterPayment])
    } catch (e) {
      console.error(e)
    }
  }
}

customElements.define('payment-dropdown', PaymentDropdown)
