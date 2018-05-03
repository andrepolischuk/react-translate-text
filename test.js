import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'
import {TranslateProvider, withTranslate, createTranslate} from './src'

const echo = v => v

const translation = {
  hello: 'Hello (echo $1)!'
}

const App = withTranslate(({name, translate}) => (
  <div>
    {translate('hello', name)}
  </div>
))

test('should pass translation object', t => {
  const wrapper = mount(
    <TranslateProvider translation={translation} helpers={{echo}}>
      <App name='World' />
    </TranslateProvider>
  )

  t.is(wrapper.text(), 'Hello World!')
})

test('should pass traslate function', t => {
  const translate = createTranslate(translation, {echo})

  const wrapper = mount(
    <TranslateProvider translate={translate}>
      <App name='World' />
    </TranslateProvider>
  )

  t.is(wrapper.text(), 'Hello World!')
})
