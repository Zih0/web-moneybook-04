export class Component {
  constructor($target) {
    this.$target = $target
    this.state = {}
    this.render()
  }
  render() {
    this.$target.innerHTML = this.template()
    this.setEvent()
  }

  componentDidMount() {}

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.render()
  }

  template() {
    return ``
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)]
    const isTarget = (target) => children.includes(target) || target.closest(selector)
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false
      callback(event)
    })
  }
}
