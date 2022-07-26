import { DataTypes } from 'zihorm'
import zihorm from '../config/db.js'

const Payment = zihorm.define('payment', {
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    field: 'name',
    type: DataTypes.STRING(20),
  },
  is_deleted: {
    field: 'is_deleted',
    type: DataTypes.BOOLEAN,
  },
})

export default Payment
