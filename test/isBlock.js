'use strict';

require('mocha');
var handlebars = require('handlebars').create();
var assert = require('assert');
var utils = require('..');

describe('.isBlock', function() {
  it('should return false when not an object', function() {
    assert(!utils.isBlock(null));
    assert(!utils.isBlock());
  });

  it('should return false when hash property is not an object', function() {
    assert(!utils.isBlock({hash: null}));
    assert(!utils.isBlock({hash: undefined}));
    assert(!utils.isBlock({}));
  });

  it('should return false when options.fn is not a function', function() {
    assert(!utils.isBlock({hash: {}, fn: null}));
    assert(!utils.isBlock({hash: {}, fn: undefined}));
  });

  it('should return false when options.inverse is not a function', function() {
    assert(!utils.isBlock({hash: {}, fn: function() {}, inverse: null}));
    assert(!utils.isBlock({hash: {}, fn: function() {}, inverse: undefined}));
  });

  it('should return true when it looks like a handlebars block helper', function() {
    assert(utils.isBlock({hash: {}, fn: function() {}, inverse: function() {}}));
  });
});
