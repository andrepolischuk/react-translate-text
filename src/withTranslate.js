import React, {Component} from 'react'
import {func} from 'prop-types'
import channelKey from './channelKey'

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withTranslate (WrappedComponent) {
  return class Translate extends Component {
    static displayName = `Translate(${getDisplayName(WrappedComponent)})`

    static contextTypes = {
      [channelKey]: func
    }

    translate = this.context[channelKey]

    render () {
      return (
        <WrappedComponent {...this.props} translate={this.translate} />
      )
    }
  }
}
