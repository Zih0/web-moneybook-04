export class Component extends HTMLElement {
  constructor(props) {
    super()
    this.props = props
    this.initState()
    this.render()
  }

  // state 초기화
  initState() {}

  render() {
    this.innerHTML = this.template()
    this.setComponent()
    this.setEvent()
    this.componentDidMount()
  }

  setEvent() {}

  componentDidMount() {}

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.render()
  }

  template() {
    return ``
  }

  setComponent() {}
}
