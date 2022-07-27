import './styles/style.scss'
import App from './components/App.js'
import AddPaymentModal from './components/Modal/AddPaymentModal.js'
import RemovePaymentModal from './components/Modal/RemovePaymentModal.js'

document.querySelector('#app').appendChild(new App())

// document.querySelector('#modal').appendChild(new AddPaymentModal())
document.querySelector('#modal').appendChild(new RemovePaymentModal())
