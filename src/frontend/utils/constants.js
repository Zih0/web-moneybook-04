const CATEGORY_INCOME = {
  salary: '월급',
  allowance: '용돈',
  etc: '기타수입',
}

const CATEGORY_EXPENSE = {
  life: '생활',
  food: '식비',
  traffic: '교통',
  culture: '문화/여가',
  health: '의료/건강',
  shopping: '쇼핑/뷰티',
  undefined: '미분류',
}

const CATEGORY = {
  ...CATEGORY_INCOME,
  ...CATEGORY_EXPENSE,
}

const KR_WEEK = ['일', '월', '화', '수', '목', '금', '토']

const ROUTE = {
  'file-text': '/',
  calendar: '/calendar',
  chart: '/chart',
}

export { CATEGORY, ROUTE, CATEGORY_INCOME, CATEGORY_EXPENSE, KR_WEEK }
