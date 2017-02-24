'use strict';

/**
 * This is a helper used in `.verb.md` for generating the list
 * of methods displayed in the readme.
 *
 * This helper is registered with verb in package.json on
 * the `verb.helpers` array, which makes it available at render time.
 */

exports.methods = function(name) {
  var keys = Object.keys(require(name));
  keys.sort(function(a, b) {
    return a.localeCompare(b);
  });

  var str = '';
  for (var i = 0; i < keys.length; i++) {
    str += '- `.' + keys[i] + '`'
    str += '\n';
  }
  return str;
};
