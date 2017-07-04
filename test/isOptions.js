'use strict';

require('mocha');
var handlebars = require('handlebars').create();
var assert = require('assert');
var utils = require('..');

describe('.isOptions', function() {
  it('should return false when not an object', function() {
    assert(!utils.isOptions(null));
    assert(!utils.isOptions());
  });

  it('should return false when hash property is not an object', function() {
    assert(!utils.isOptions({hash: null}));
    assert(!utils.isOptions({hash: undefined}));
    assert(!utils.isOptions({}));
  });

  it('should return true when options.has is an object', function() {
    assert(utils.isOptions({hash: {}}));
  });
});
