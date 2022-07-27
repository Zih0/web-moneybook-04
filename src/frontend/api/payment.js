import fetcher from '../utils/fetcher.js'

const getPaymentList = async () => {
  const { data } = await fetcher.get('/payment')
  return data
}

export { getPaymentList }
