# react-translate-text [![Build Status][travis-image]][travis-url]

> React higher-order component for text translation

## Install

```sh
npm install --save react-translate-text
```

## Usage

In component:

```js
import React from 'react'
import {withTranslate} from 'react-translate-text'

function App ({age, message, translate}) {
  return (
    <div>
      <p>{translate('hello')}</p>
      <p>{translate('echo', message)}</p>
      <p>{translate('more.age', age)}</p>
    </div>
  )
}

export default withTranslate(App)
```

In root:

```js
import React from 'react'
import {render} from 'react-dom'
import pluralize from 'numd'
import {TranslateProvider} from 'react-translate-text'
import App from './App'

const translation = {
  hello: 'Hello',
  echo: 'You say: $1',
  more: {
    age: 'I\'m a (pluralize $1|year|years) old'
  }
}

render(
  <TranslateProvider translation={translation} helpers={{pluralize}}>
    <App message='Foo' age={25} />
  </TranslateProvider>,
  document.querySelector('#root')
)
```

## API

Under the hood `react-translate-text` uses `translate-text`.
It's a simple translate function with templates precompiling and helpers.
You can find API docs [in its repository][translate-text].

### TranslateProvider

A higher-order component passes translate function by the context.

#### props

##### props.translation

Type: `object`

Translation templates.

##### props.helpers

Type: `object`

Helper functions that are used in templates.

##### props.translate

Type: `func`

Translate function.

##### props.children

*Required*  
Type: `element`

### withTranslate(component)

Create a higher-order component to connect your component to translate.

#### component

Type: `element`

### createTranslate(translation[, helpers])

You can create translate function earlier and pass it into the `<TranslateProvider />`.
[Read more about `createTranslate` in `translate-text`'s docs][create-translate]

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/react-translate-text
[travis-image]: https://travis-ci.org/andrepolischuk/react-translate-text.svg?branch=master

[translate-text]: https://github.com/andrepolischuk/translate-text
[create-translate]: https://github.com/andrepolischuk/translate-text#createtranslatetranslation-fns
