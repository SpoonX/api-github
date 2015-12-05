"use strict";

var Transport = require('./lib/transport'),
    extend    = require('extend'),
    Orgs      = require('./lib/resources/orgs'),
    Repos     = require('./lib/resources/repos'),
    Users     = require('./lib/resources/users');

class ApiGithub {
  constructor (options) {
    this.options   = options;
    this.transport = new Transport(this.options);
    this.orgs      = new Orgs(this.transport);
    this.repos     = new Repos(this.transport);
    this.users     = new Users(this.transport);
  }

  get options () {
    return this._options;
  }

  set options (options) {
    this._options = extend(true, {
      endpoint : 'https://api.github.com/',
      userAgent: 'API-Github by SpoonX.',
      version  : 3,
      auth     : null,
      raw      : false
    }, options);
  }
}

module.exports = ApiGithub;
