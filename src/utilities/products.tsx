function formatPrice( value: number | string ) {
  return Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function calculateDiscountPrice( price: number, percentĐiscount: number) : number {
  return Number(Number(price * (1 - percentĐiscount / 100  )).toFixed(2));
}

function calculatePercentĐiscount( sale_price: number | string, regular_price: number | string) : number {
  return Number((((Number(regular_price) - Number(sale_price))/Number(regular_price))*100).toFixed(2))
}

function validateQuantity(value: number, stock: number) {
  return value < 0 ? 0
    : value > stock ? stock
      : value
}

export { formatPrice, calculateDiscountPrice, calculatePercentĐiscount, validateQuantity }