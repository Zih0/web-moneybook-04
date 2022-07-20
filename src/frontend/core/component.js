export class Component {
  constructor($target) {
    this.$target = $target
    this.state = {}
    this.render()
  }
  render() {
    this.$target.innerHTML = this.template()
    this.setComponent()
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

  setComponent() {}
}
