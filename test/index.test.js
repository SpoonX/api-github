"use strict";

let assert         = require('assert');
let ApiGithub      = require('../index');
let Users          = require('../lib/resources/users');
let Repos          = require('../lib/resources/repos');
let Orgs           = require('../lib/resources/orgs');
let Authorizations = require('../lib/resources/authorizations');

describe('ApiGithub', function() {
  it('should merge the options', function() {
    var api = new ApiGithub({bacon: 'bueno', testing: 'properties'});

    assert.deepEqual(api.options, {
      endpoint : 'https://api.github.com/',
      userAgent: 'API-Github by SpoonX.',
      version  : 3,
      auth     : null,
      raw      : false,
      bacon    : 'bueno',
      testing  : 'properties'
    });
  });

  it('should instantiate all resources', function() {
    var api = new ApiGithub();

    assert(api.users instanceof Users);
    assert(api.orgs instanceof Orgs);
    assert(api.repos instanceof Repos);
    assert(api.authorizations instanceof Authorizations);
  });
});
