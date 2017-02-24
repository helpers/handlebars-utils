# handlebars-utils [![NPM version](https://img.shields.io/npm/v/handlebars-utils.svg?style=flat)](https://www.npmjs.com/package/handlebars-utils) [![NPM monthly downloads](https://img.shields.io/npm/dm/handlebars-utils.svg?style=flat)](https://npmjs.org/package/handlebars-utils)  [![NPM total downloads](https://img.shields.io/npm/dt/handlebars-utils.svg?style=flat)](https://npmjs.org/package/handlebars-utils) [![Linux Build Status](https://img.shields.io/travis/helpers/handlebars-utils.svg?style=flat&label=Travis)](https://travis-ci.org/helpers/handlebars-utils)

> Utils for handlebars helpers. Externalized from handlebars, to allow helpers to use the utils without having to depend on handlebars itself.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save handlebars-utils
```

## Usage

```js
var utils = require('handlebars-utils');
```

Includes the following utility methods:

* `.appendContextPath`
* `.arrayify`
* `.blockParams`
* `.createFrame`
* `.escapeExpression`
* `.expectedType`
* `.extend`
* `.fn`
* `.getValue`
* `.identity`
* `.indexOf`
* `.inverse`
* `.isArray`
* `.isBlock`
* `.isEmpty`
* `.isFunction`
* `.isObject`
* `.isOptions`
* `.isString`
* `.isTemplates`
* `.isUndefined`
* `.options`
* `.result`
* `.toString`

## API

### [.isBlock](index.js#L155)

Returns true if a helper is a block helper.

**Params**

* **{Object}**: options
* `returns` **{Boolean}**

### [.fn](index.js#L172)

Returns the given value or renders the block if it's a block helper.

**Params**

* `val` **{any}**
* `options` **{Object}**
* `context` **{Object}**
* `returns` **{String}**: Either returns the value, or renders the block.

### [.inverse](index.js#L186)

Returns the given value or renders the inverse block if it's a block helper.

**Params**

* `val` **{any}**
* `options` **{Object}**
* `context` **{Object}**
* `returns` **{String}**: Either returns the value, or renders the inverse block.

### [.getValue](index.js#L201)

Either renders the block or inverse block, if it's a block helper,
or if will return `"true"` or `""` if it's an inline helper.

**Params**

* `val` **{any}**
* `options` **{Object}**
* `context` **{Object}**
* `returns` **{String}**

### [.isOptions](index.js#L216)

Returns true if the given value is a handlebar `options` object.

**Params**

* `val` **{Object}**
* `returns` **{Boolean}**

### [.isUndefined](index.js#L229)

Returns true if the given value is `undefined` or is a handlebars
options hash.

**Params**

* `value` **{any}**
* `returns` **{Boolean}**

### [.isTemplates](index.js#L241)

Returns true if the context was created by the [templates](https://github.com/jonschlinkert/templates) library.

**Params**

* `value` **{any}**
* `returns` **{Boolean}**

### [.options](index.js#L260)

Creates an options object from the `context`, `locals` and `options.`
Handlebars' `options.hash` is merged onto the options, and if the context
is created by [templates](https://github.com/jonschlinkert/templates), `this.options` will be merged onto the
options as well.

**Params**

* `context` **{Object}**
* `locals` **{Object}**: Options or locals
* `options` **{Object}**
* `returns` **{Boolean}**

### [.isObject](index.js#L292)

Returns true if the given value is an object.

**Params**

* `val` **{Object}**
* `returns` **{Boolean}**

### [.isEmpty](index.js#L314)

Returns true if the given value is "empty".

**Params**

* `value` **{any}**
* `returns` **{Boolean}**

**Example**

```js
console.log(utils.isEmpty(0));
//=> false
console.log(utils.isEmpty(''));
//=> true
console.log(utils.isEmpty([]));
//=> true
console.log(utils.isEmpty({}));
//=> true
```

### [.result](index.js#L344)

Returns the given value. If the value is a function it will be called with the current context, otherwise the value is returned.

**Params**

* `val` **{any}**
* `returns` **{any}**

**Example**

```js
console.log(utils.result('foo'));
//=> 'foo'
console.log(utils.result(function() {
  return 'foo';
}));
//=> 'foo'
```

### [.identity](index.js#L367)

Returns the given value as-is, unchanged.

**Params**

* `val` **{any}**
* `returns` **{any}**

**Example**

```js
console.log(utils.result('foo'));
//=> 'foo'
console.log(utils.result(function() {
  return 'foo';
}));
//=> [function]
```

### [.isString](index.js#L379)

Return true if `val` is a non-empty string.

**Params**

* `val` **{any}**: The value to check
* `returns` **{Boolean}**

### [.arrayify](index.js#L399)

Cast the given `val` to an array.

**Params**

* `val` **{any}**
* `returns` **{Array}**

**Example**

```js
console.log(utils.arrayify(''));
//=> []
console.log(utils.arrayify('foo'));
//=> ['foo']
console.log(utils.arrayify(['foo']));
//=> ['foo']
```

## About

### Related projects

* [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers): More than 130 Handlebars helpers in ~20 categories. Helpers can be used with Assemble, Generate… [more](https://github.com/assemble/handlebars-helpers) | [homepage](https://github.com/assemble/handlebars-helpers "More than 130 Handlebars helpers in ~20 categories. Helpers can be used with Assemble, Generate, Verb, Ghost, gulp-handlebars, grunt-handlebars, consolidate, or any node.js/Handlebars project.")
* [template-helpers](https://www.npmjs.com/package/template-helpers): Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or… [more](https://github.com/jonschlinkert/template-helpers) | [homepage](https://github.com/jonschlinkert/template-helpers "Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or any engine that supports helper functions.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.2, on February 23, 2017._