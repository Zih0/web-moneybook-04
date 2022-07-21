export class Component {
  constructor($target, props) {
    this.$target = $target
    this.props = props
    this.state = {}
    this.render()
  }
  render() {
    this.$target.innerHTML = this.template()
    this.setComponent()
    this.setEvent()
  }

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
