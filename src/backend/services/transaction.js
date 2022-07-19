import dbPool from '../config/db.js'

const getTransactionService = () => {
  const selectQuery = 'select * from transaction_history;'

  return dbPool
    .getConnection()
    .then((connection) => {
      const response = connection.query(selectQuery)
      connection.release()

      return response
    })
    .catch((err) => console.error(err))
}

export { getTransactionService }
