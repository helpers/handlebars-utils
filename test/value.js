'use strict';

require('mocha');
var handlebars = require('handlebars').create();
var assert = require('assert');
var utils = require('..');

function render(str, locals) {
  return handlebars.compile(str)(locals);
}

handlebars.registerHelper('test', function(val, options) {
  return utils.value(val, options);
});

describe('.value', function() {
  it('should return value as an expression', function() {
    assert.equal(render('{{test "foo"}}'), 'foo');
    assert.equal(render('{{test foo}}', {foo: 'bar'}), 'bar');
  });

  it('should return empty string as when falsey as an expression', function() {
    assert.equal(render('{{test "foo"}}'), 'foo');
    assert.equal(render('{{test foo}}', {foo: 'bar'}), 'bar');
  });

  it('should return empty string instead of block when falsey', function() {
    assert.equal(render('{{#test bar}}foo{{/test}}'), '');
    assert.equal(render('{{#test}}foo{{/test}}'), '');
  });

  it('should return block value when truthy', function() {
    assert.equal(render('{{#test "bar"}}foo{{/test}}'), 'foo');
    assert.equal(render('{{#test "bar"}}foo{{else}}bar{{/test}}'), 'foo');
    assert.equal(render('{{#test bar}}foo{{/test}}', {bar: 'bar'}), 'foo');
    assert.equal(render('{{#test bar}}foo{{else}}bar{{/test}}', {bar: 'bar'}), 'foo');
  });

  it('should return inverse block value when falsey', function() {
    assert.equal(render('{{#test}}foo{{else}}bar{{/test}}'), 'bar');
    assert.equal(render('{{#test undef}}foo{{else}}bar{{/test}}'), 'bar');
    assert.equal(render('{{#test bar}}foo{{else}}bar{{/test}}'), 'bar');
  });
});
