import { DataTypes } from 'zihorm'
import zihorm from '../config/db.js'

const TransactionHistory = zihorm.define('transaction_history', {
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    field: 'category',
    type: DataTypes.STRING(10),
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(100),
  },
  payment_id: {
    field: 'payment_id',
    type: DataTypes.INTEGER,
  },
  price: {
    field: 'price',
    type: DataTypes.INTEGER,
  },
})

export default TransactionHistory
