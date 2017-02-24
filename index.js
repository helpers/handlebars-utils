'use strict';

var util = require('util');
var typeOf = require('kind-of');
var utils = exports = module.exports;
var type = require('typeof-article');

/**
 * This code was taken directly from handlebars.
 * https://github.com/wycats/handlebars.js/blob/b55a120e8222785db3dc00096f6afbf91b656e8a/LICENSE
 * Released under the MIT License
 * Copyright (C) 2011-2016 by Yehuda Katz
 */

utils.extend = extend;
utils.indexOf = indexOf;
utils.escapeExpression = escapeExpression;
utils.isEmpty = isEmpty;
utils.createFrame = createFrame;
utils.blockParams = blockParams;
utils.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g;
var possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

utils.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  utils.isFunction = isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
utils.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

utils.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

//
// The code below this line was not sourced from handlebars
// --------------------------------------------------------
//

utils.expectedType = function(param, expected, actual) {
  var exp = type.types[expected];
  var val = util.inspect(actual);
  return `expected ${param} to be ${exp} but received ${type(actual)}: ${val}`;
};

/**
 * Returns true if a helper is a block helper.
 *
 * @param {Object} options
 * @return {Boolean}
 * @api public
 */

utils.isBlock = function(options) {
  if (!utils.isOptions(options)) {
    throw new Error('expected a handlebars options object');
  }
  return typeof options.fn === 'function' && typeof options.inverse === 'function';
};

/**
 * Returns the given value or renders the block if it's a block helper.
 *
 * @param {any} `val`
 * @param {Object} `options`
 * @param {Object} `context`
 * @return {String} Either returns the value, or renders the block.
 * @api public
 */

utils.fn = function(val, options, context) {
  return utils.isBlock(options) ? options.fn(context) : val;
};

/**
 * Returns the given value or renders the inverse block if it's a block helper.
 *
 * @param {any} `val`
 * @param {Object} `options`
 * @param {Object} `context`
 * @return {String} Either returns the value, or renders the inverse block.
 * @api public
 */

utils.inverse = function(val, options, context) {
  return utils.isBlock(options) ? options.inverse(context) : val;
};

/**
 * Either renders the block or inverse block, if it's a block helper,
 * or if will return `"true"` or `""` if it's an inline helper.
 *
 * @param {any} `val`
 * @param {Object} `options`
 * @param {Object} `context`
 * @return {String}
 * @api public
 */

utils.getValue = function(val, options, context) {
  if (utils.isBlock(options)) {
    return val ? options.fn(context) : options.inverse(context);
  }
  return val || '';
};

/**
 * Returns true if the given value is a handlebar `options` object.
 *
 * @param {Object} `val`
 * @return {Boolean}
 * @api public
 */

utils.isOptions = function(val) {
  return utils.isObject(val) && val.hasOwnProperty('hash');
};

/**
 * Returns true if the given value is `undefined` or is a handlebars
 * options hash.
 *
 * @param {any} `value`
 * @return {Boolean}
 * @api public
 */

utils.isUndefined = function(val) {
  return typeof val === 'undefined' || utils.isOptions(val);
};

/**
 * Returns true if the context was created by the [templates][] library.
 *
 * @param {any} `value`
 * @return {Boolean}
 * @api public
 */

utils.isTemplates = function(thisArg) {
  return utils.isObject(thisArg)
    && utils.isObject(thisArg.options)
    && utils.isObject(thisArg.app);
};

/**
 * Creates an options object from the `context`, `locals` and `options.`
 * Handlebars' `options.hash` is merged onto the options, and if the context
 * is created by [templates][], `this.options` will be merged onto the
 * options as well.
 *
 * @param {Object} `context`
 * @param {Object} `locals` Options or locals
 * @param {Object} `options`
 * @return {Boolean}
 * @api public
 */

utils.options = function(thisArg, locals, options) {
  if (utils.isOptions(locals)) {
    options = locals;
    locals = {};
  }

  if (!utils.isOptions(options)) {
    throw new Error('expected a handlebars options object');
  }

  var appOpts = utils.isTemplates(thisArg) ? thisArg.options : {};
  var opts = Object.assign({}, appOpts, locals, options.hash);

  if (opts[options.name]) {
    opts = Object.assign({}, opts, opts[options.name]);
  }
  return opts;
};

/**
 * Returns true if the given value is an object.
 *
 * @param {Object} `val`
 * @return {Boolean}
 * @api public
 */

utils.isObject = function(val) {
  return typeOf(val) === 'object';
};

/**
 * Returns true if the given value is "empty".
 *
 * ```js
 * console.log(utils.isEmpty(0));
 * //=> false
 * console.log(utils.isEmpty(''));
 * //=> true
 * console.log(utils.isEmpty([]));
 * //=> true
 * console.log(utils.isEmpty({}));
 * //=> true
 * ```
 * @param {any} `value`
 * @return {Boolean}
 * @api public
 */

utils.isEmpty = function(val) {
  if (val === 0) {
    return false;
  }
  if (utils.isObject(val)) {
    val = Object.keys(val);
  }
  if (!val || (Array.isArray(val) && val.length === 0)) {
    return true;
  }
  return false;
};

/**
 * Returns the given value. If the value is a function it will be
 * called with the current context, otherwise the value is returned.
 *
 * ```js
 * console.log(utils.result('foo'));
 * //=> 'foo'
 * console.log(utils.result(function() {
 *   return 'foo';
 * }));
 * //=> 'foo'
 * ```
 * @param  {any} `val`
 * @return {any}
 * @api public
 */

utils.result = function(val) {
  if (typeof val === 'function') {
    return val.call(this);
  }
  return val;
};

/**
 * Returns the given value as-is, unchanged.
 *
 * ```js
 * console.log(utils.result('foo'));
 * //=> 'foo'
 * console.log(utils.result(function() {
 *   return 'foo';
 * }));
 * //=> [function]
 * ```
 * @param  {any} `val`
 * @return {any}
 * @api public
 */

utils.identity = function(val) {
  return val;
};

/**
 * Return true if `val` is a non-empty string.
 *
 * @param  {any} `val` The value to check
 * @return {Boolean}
 * @api public
 */

utils.isString = function(val) {
  return val && typeof val === 'string';
};

/**
 * Cast the given `val` to an array.
 *
 * ```js
 * console.log(utils.arrayify(''));
 * //=> []
 * console.log(utils.arrayify('foo'));
 * //=> ['foo']
 * console.log(utils.arrayify(['foo']));
 * //=> ['foo']
 * ```
 * @param  {any} `val`
 * @return {Array}
 * @api public
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};
