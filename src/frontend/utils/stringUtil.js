const priceToString = (price) => {
  if (typeof price === 'string') {
    price = Number(price)
  }
  return price.toLocaleString()
}

export { priceToString }
