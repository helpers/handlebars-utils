'use strict';

require('mocha');
var handlebars = require('handlebars').create();
var assert = require('assert');
var utils = require('..');

function render(str, locals) {
  return handlebars.compile(str)(locals);
}

handlebars.registerHelper('test', function(val, options) {
  return utils.fn(val, options);
});

describe('.fn', function() {
  it('should return value as an expression', function() {
    assert.equal(render('{{test "foo"}}'), 'foo');
    assert.equal(render('{{test foo}}'), '');
  });

  it('should return value as a block', function() {
    assert.equal(render('{{#test}}foo{{/test}}'), 'foo');
    assert.equal(render('{{#test bar}}foo{{/test}}'), 'foo');
    assert.equal(render('{{#test "bar"}}foo{{/test}}'), 'foo');

    assert.equal(render('{{#test}}foo{{else}}bar{{/test}}'), 'foo');
    assert.equal(render('{{#test bar}}foo{{else}}bar{{/test}}'), 'foo');
    assert.equal(render('{{#test "bar"}}foo{{else}}bar{{/test}}'), 'foo');
  });
});
