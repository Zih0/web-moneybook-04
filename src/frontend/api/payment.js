import fetcher from '../utils/fetcher.js'

const getPaymentList = async () => {
  const { data } = await fetcher.get('/payment')
  return data
}

const createPayment = async (body) => {
  const { data } = await fetcher.post('/payment', body)
  return data
}

export { getPaymentList, createPayment }
