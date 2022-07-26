const INCOME = {
  salary: '월급',
  allowance: '용돈',
  etc: '기타수입',
}

const EXPENSE = {
  life: '생활',
  food: '식비',
  traffic: '교통',
  culture: '문화/여가',
  health: '의료/건강',
  shopping: '쇼핑/뷰티',
  undefined: '미분류',
}

const CATEGORY = {
  ...INCOME,
  ...EXPENSE,
}

const ROUTE = {
  'file-text': '/',
  calendar: '/calendar',
  chart: '/chart',
}

export { CATEGORY, ROUTE, INCOME, EXPENSE }
