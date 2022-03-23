# require-regex [![Build Status](https://travis-ci.org/herber/require-regex.svg?branch=master)](https://travis-ci.org/herber/require-regex) [![codecov](https://codecov.io/gh/herber/require-regex/badge.svg?branch=master)](https://codecov.io/gh/herber/require-regex?branch=master)

A regex for require statements - based on [requires-regex](https://github.com/jonschlinkert/requires-regex) with some enhancements.

## Install

```
$ npm install require-regex
```

## Usage

```js
const requireRegex = require('require-regex');

requireRegex().exec('const foo = require(\'bar\');');
//=> ['var foo = require(\'bar\')',
//    'foo',
//    'bar',
//    index: 0,
//    input: 'var foo = require(\'bar\');']

const code = `
const insertCss = require('insert-css');
const stylis = require('stylis');

const insert = styles => {
  const assembleTemplate = require('assemble-template');

  if (typeof window == 'object') {
    const styleElement = insertCss(styles);
    styleElement.setAttribute('class', 'vxv_style');
  }
};
`;

const regex = new RegExp(requireRegex().source, 'gm');

code.match(regex);
// => ['const insertCss = require(\'insert-css\');',
//     'const stylis = require(\'stylis\');',
//     'const assembleTemplate = require(\'assemble-template\');']

re().test('require(\'foo\');');
// => true
```

## License

MIT © [Tobias Herber](http://tobihrbr.com)
