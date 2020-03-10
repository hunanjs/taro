// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h, ComponentInterface, Host, Prop, Event, EventEmitter, Listen, Element } from '@stencil/core'

@Component({
  tag: 'taro-radio-group-core'
})
export class RadioGroup implements ComponentInterface {
  private uniqueName = Date.now().toString(36)
  private value: string

  @Prop() name

  @Element() el: HTMLElement

  @Event({
    eventName: 'change'
  })
  onChange: EventEmitter

  @Listen('radiochange')
  function (e: CustomEvent<{ value: string }>) {
    e.stopPropagation()
    if ((e.target as Element).tagName !== 'TARO-RADIO') return

    const target = e.target as HTMLTaroRadioCoreElement
    if (target.checked) {
      const childList = this.el.querySelectorAll('taro-radio-core')

      childList.forEach(element => {
        if (element !== target) {
          element.checked = false
        }
      })

      this.value = e.detail.value

      this.onChange.emit({
        value: this.value
      })
    }
  }

  componentDidLoad () {
    const childList = this.el.querySelectorAll('taro-radio-core')

    childList.forEach((element) => {
      element.setAttribute('name', this.name || this.uniqueName)
    })

    Object.defineProperty(this.el, 'value', {
      get: () => this.value,
      configurable: true
    })
  }

  render () {
    return (
      <Host className='weui-cells_radiogroup' />
    )
  }
}
