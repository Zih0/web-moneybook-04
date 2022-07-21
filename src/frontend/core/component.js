export class Component {
  dom
  constructor(props) {
    this.$template = document.createElement('template')
    this.props = props
    this.state = {}
    this.render()
  }

  render() {
    this.$template.innerHTML = this.template()
    this.dom = this.$template.content.cloneNode(true)
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
