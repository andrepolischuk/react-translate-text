import {Component, Children} from 'react'
import {object, element, func} from 'prop-types'
import createTranslate from 'translate-text'
import channelKey from './channelKey'

export default class TranslateProvider extends Component {
  static propTypes = {
    translate: func,
    translation: object,
    helpers: object,
    children: element.isRequired
  }

  static childContextTypes = {
    [channelKey]: func
  }

  translate = this.getTranslate(this.props)

  getChildContext () {
    return {
      [channelKey]: this.translate
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.translate !== this.props.translate ||
      nextProps.translation !== this.props.translation) {
      this.translate = this.getTranslate(nextProps)
    }
  }

  getTranslate ({translate, translation, helpers}) {
    return translate || createTranslate(translation, helpers)
  }

  render () {
    return Children.only(this.props.children)
  }
}
