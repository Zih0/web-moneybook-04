import { Component } from '../../core/component.js'
import { getState, subscribe } from '../../core/observer.js'
import { selectedCategoryState, sixMonthTrendState } from '../../stores/chartStore.js'
import { dateState } from '../../stores/dateStore.js'
import { CATEGORY_EXPENSE } from '../../utils/constants.js'
import { priceToString } from '../../utils/stringUtil.js'
import './lineChart.scss'

export const COORDINATE_WIDTH = 750
export const COORDINATE_HEIGHT = 300
export const COLUMNS = 22
export const ROWS = 10

export default class LineChart extends Component {
  constructor() {
    super()

    subscribe(selectedCategoryState, this.render.bind(this))
    subscribe(sixMonthTrendState, this.render.bind(this))
  }

  template() {
    const selectedCategory = getState(selectedCategoryState)
    const category = CATEGORY_EXPENSE[selectedCategory]

    return `
      <div class="line-board">
        <p class="line-chart-title">${category} 카테고리 소비 추이</p>
        <canvas id="grid-canvas" width="750" height="300"></canvas>
        <div id="months"></div>
      </div>
    `
  }

  componentDidMount() {
    const { month } = getState(dateState)
    const sixMonthTrend = getState(sixMonthTrendState)
    const months = this.getTrendMonthList(sixMonthTrend)
    const prices = this.getTrendPriceList(sixMonthTrend)
    this.drawCoordinate(months, month)
    this.drawLineChart(prices)
  }

  getTrendMonthList(data) {
    return Object.keys(data).map((yearMonth) => {
      return yearMonth.split('-')[1]
    })
  }

  getTrendPriceList(data) {
    return Object.values(data).slice(0, 7)
  }

  drawCoordinate(months, selectedMonth) {
    const $canvas = this.querySelector('#grid-canvas')
    const ctx = $canvas.getContext('2d')

    const gridHeight = COORDINATE_HEIGHT / ROWS
    const gridWidth = COORDINATE_WIDTH / COLUMNS

    ctx.strokeStyle = '#f5f5f5'

    // 가로 배경선 그리기
    for (let i = 0; i <= ROWS; i++) {
      ctx.beginPath()
      ctx.moveTo(0, gridHeight * i)
      ctx.lineTo(COORDINATE_WIDTH, gridHeight * i)
      ctx.stroke()
    }

    // 세로 배경선 그리기
    for (let i = 0; i <= COLUMNS; i++) {
      ctx.beginPath()
      ctx.moveTo(gridWidth * i, 0)
      ctx.lineTo(gridWidth * i, COORDINATE_HEIGHT)
      ctx.stroke()
    }

    ctx.textAlign = 'center'
    ctx.font = '700 12px Noto Sans KR'

    for (let i = 0; i <= COLUMNS; i += 2) {
      const xPoint = gridWidth * i
      const monthIndex = Math.floor(i / 2)
      const monthText = months[monthIndex]

      if (selectedMonth === Number(monthText)) {
        ctx.fillStyle = '#2ac1bc'
      } else {
        ctx.fillStyle = '#8d9393'
      }
      ctx.fillText(monthText, xPoint, COORDINATE_HEIGHT)
    }
  }

  drawLineChart(data) {
    const $canvas = this.querySelector('#grid-canvas')
    const ctx = $canvas.getContext('2d')

    const gridWidth = COORDINATE_WIDTH / COLUMNS
    const maxDataValue = Math.max(...data) * 1.2

    ctx.strokeStyle = '#2ac1bc'
    ctx.lineWidth = 2
    ctx.font = '700 12px Noto Sans KR'

    // 선 그리기
    ctx.beginPath()
    data.forEach((datum, idx) => {
      const xPoint = gridWidth * idx * 2
      const yPoint = COORDINATE_HEIGHT - (datum / maxDataValue) * COORDINATE_HEIGHT

      if (!idx) {
        ctx.moveTo(xPoint, yPoint)
      } else {
        ctx.lineTo(xPoint, yPoint)
      }
      ctx.stroke()
    })

    // 가격, 점 그리기
    data.forEach((datum, idx) => {
      ctx.beginPath()
      const xPoint = gridWidth * idx * 2
      const yPoint = COORDINATE_HEIGHT - (datum / maxDataValue) * COORDINATE_HEIGHT

      if (idx === data.length - 1) {
        ctx.fillStyle = '#2ac1bc'
      } else {
        ctx.fillStyle = '#8d9393'
      }

      ctx.fillText(priceToString(datum), xPoint, yPoint - 12)

      ctx.fillStyle = '#2ac1bc'
      ctx.arc(xPoint, yPoint, 4, 0, 2 * Math.PI)
      ctx.fill()
    })
  }
}

customElements.define('line-chart', LineChart)
