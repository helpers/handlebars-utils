'use strict';

require('mocha');
var handlebars = require('handlebars').create();
var assert = require('assert');
var utils = require('..');

describe('handlebars built-in utils', function() {
  describe('.SafeString', function() {
    it('should construct a safestring from a string and checking its type', function() {
      var safe = new handlebars.SafeString('testing 1, 2, 3');
      if (!(safe instanceof handlebars.SafeString)) {
        throw new Error('Must be instance of SafeString');
      }
      assert.strictEqual(safe.toString(), 'testing 1, 2, 3', 'SafeString is equivalent to its underlying string');
    });

    it('it should not escape SafeString properties', function() {
      var name = new handlebars.SafeString('<em>Sean O&#x27;Malley</em>');
      var fn = handlebars.compile('{{name}}');
      assert.strictEqual(fn({name: name}), '<em>Sean O&#x27;Malley</em>');
    });
  });

  describe('.escapeExpression', function() {
    it('should escape html', function() {
      assert.strictEqual(utils.escapeExpression('foo<&"\'>'), 'foo&lt;&amp;&quot;&#x27;&gt;');
      assert.strictEqual(utils.escapeExpression('foo='), 'foo&#x3D;');
    });

    it('should not escape SafeString', function() {
      var string = new handlebars.SafeString('foo<&"\'>');
      assert.strictEqual(utils.escapeExpression(string), 'foo<&"\'>');

      var obj = {
        toHTML: function() {
          return 'foo<&"\'>';
        }
      };

      assert.strictEqual(utils.escapeExpression(obj), 'foo<&"\'>');
    });

    it('should handle falsy values', function() {
      assert.strictEqual(utils.escapeExpression(''), '');
      assert.strictEqual(utils.escapeExpression(undefined), '');
      assert.strictEqual(utils.escapeExpression(null), '');

      assert.strictEqual(utils.escapeExpression(false), 'false');
      assert.strictEqual(utils.escapeExpression(0), '0');
    });

    it('should handle empty objects', function() {
      assert.strictEqual(utils.escapeExpression({}), {}.toString());
      assert.strictEqual(utils.escapeExpression([]), [].toString());
    });
  });

  describe('.isEmpty', function() {
    it('should not be empty', function() {
      assert(utils.isEmpty(undefined));
      assert(utils.isEmpty(null));
      assert(utils.isEmpty(''));
      assert(utils.isEmpty([]));
      assert(utils.isEmpty({}));
    });

    it('should be empty', function() {
      assert(!utils.isEmpty(false));
      assert(!utils.isEmpty(0));
      assert(!utils.isEmpty([1]));
      assert(!utils.isEmpty('foo'));
      assert(!utils.isEmpty({bar: 1}));
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

      assert.strictEqual(b.a, 1);
      assert.strictEqual(b.b, 2);
    });
  });
});
