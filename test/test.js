'use strict';

require('mocha');
var Handlebars = require('handlebars');
var assert = require('assert');
var utils = require('..');

describe('handlebars-utils', function() {
  describe('.SafeString', function() {
    it('should construct a safestring from a string and checking its type', function() {
      var safe = new Handlebars.SafeString('testing 1, 2, 3');
      if (!(safe instanceof Handlebars.SafeString)) {
        throw new Error('Must be instance of SafeString');
      }
      assert.deepEqual(safe.toString(), 'testing 1, 2, 3', 'SafeString is equivalent to its underlying string');
    });

    it('it should not escape SafeString properties', function() {
      var name = new Handlebars.SafeString('<em>Sean O&#x27;Malley</em>');
      var fn = Handlebars.compile('{{name}}');
      assert.equal(fn({name: name}), '<em>Sean O&#x27;Malley</em>');
    });
  });

  describe('.escapeExpression', function() {
    it('should escape html', function() {
      assert.deepEqual(utils.escapeExpression('foo<&"\'>'), 'foo&lt;&amp;&quot;&#x27;&gt;');
      assert.deepEqual(utils.escapeExpression('foo='), 'foo&#x3D;');
    });

    it('should not escape SafeString', function() {
      var string = new Handlebars.SafeString('foo<&"\'>');
      assert.deepEqual(utils.escapeExpression(string), 'foo<&"\'>');

      var obj = {
        toHTML: function() {
          return 'foo<&"\'>';
        }
      };

      assert.deepEqual(utils.escapeExpression(obj), 'foo<&"\'>');
    });

    it('should handle falsy values', function() {
      assert.deepEqual(utils.escapeExpression(''), '');
      assert.deepEqual(utils.escapeExpression(undefined), '');
      assert.deepEqual(utils.escapeExpression(null), '');

      assert.deepEqual(utils.escapeExpression(false), 'false');
      assert.deepEqual(utils.escapeExpression(0), '0');
    });

    it('should handle empty objects', function() {
      assert.deepEqual(utils.escapeExpression({}), {}.toString());
      assert.deepEqual(utils.escapeExpression([]), [].toString());
    });
  });

  describe('.isEmpty', function() {
    it('should not be empty', function() {
      assert.deepEqual(utils.isEmpty(undefined), true);
      assert.deepEqual(utils.isEmpty(null), true);
      assert.deepEqual(utils.isEmpty(false), true);
      assert.deepEqual(utils.isEmpty(''), true);
      assert.deepEqual(utils.isEmpty([]), true);
    });

    it('should be empty', function() {
      assert.deepEqual(utils.isEmpty(0), false);
      assert.deepEqual(utils.isEmpty([1]), false);
      assert.deepEqual(utils.isEmpty('foo'), false);
      assert.deepEqual(utils.isEmpty({bar: 1}), false);
    });
  });

  describe('.extend', function() {
    it('should ignore prototype values', function() {
      function A() {
        this.a = 1;
      }
      A.prototype.b = 4;

      var b = {b: 2};

      utils.extend(b, new A());

      assert.deepEqual(b.a, 1);
      assert.deepEqual(b.b, 2);
    });
  });
});
