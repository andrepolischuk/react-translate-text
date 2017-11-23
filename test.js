import test from 'ava'
import React from 'react'
import pluralize from 'numd'
import {mount} from 'enzyme'
import {TranslateProvider, withTranslate, createTranslate} from './src'

const translation = {
  foo: 'foofoo',
  bar: {
    foo: 'barbar',
    baz: 'bazbaz $1',
    foobar: 'foobar foo $1 (pluralize $2|foo|foos)'
  }
}

const App = withTranslate(({translate}) => (
  <div>
    <p>{translate('foo')}</p>
    <p>{translate('bar.foo')}</p>
    <p>{translate('bar.baz', 'foo')}</p>
    <p>{translate('bar.foobar', 'bar', 2)}</p>
  </div>
))

test('should pass translation object', t => {
  const wrapper = mount(
    <TranslateProvider translation={translation} helpers={{pluralize}}>
      <App />
    </TranslateProvider>
  )

  t.is(wrapper.find('p').at(0).text(), 'foofoo')
  t.is(wrapper.find('p').at(1).text(), 'barbar')
  t.is(wrapper.find('p').at(2).text(), 'bazbaz foo')
  t.is(wrapper.find('p').at(3).text(), 'foobar foo bar 2 foos')
})

test('should pass traslate function', t => {
  const translate = createTranslate(translation, {pluralize})

  const wrapper = mount(
    <TranslateProvider translate={translate}>
      <App />
    </TranslateProvider>
  )

  t.is(wrapper.find('p').at(0).text(), 'foofoo')
  t.is(wrapper.find('p').at(1).text(), 'barbar')
  t.is(wrapper.find('p').at(2).text(), 'bazbaz foo')
  t.is(wrapper.find('p').at(3).text(), 'foobar foo bar 2 foos')
})
