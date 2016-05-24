"use strict";

const extend = require('extend');

class Authorizations {

  /**
   * Construct the Authorizations resource with a Transport class.
   *
   * @param {Transport} transport
   */
  constructor(transport) {
    this.transport = transport;
  }

  /**
   * Create a new authorization for authenticated user.
   *
   * @param {Array} [scopes]
   * @param {{}}    [options]
   *
   * @return {Promise}
   *
   * @see https://developer.github.com/v3/oauth/#scopes
   * @see https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization
   */
  create(scopes, options) {
    options        = options || {};
    options.method = 'post';

    if (Array.isArray(scopes)) {
      options.body        = options.body || {};
      options.body.scopes = scopes;
    }

    return this.transport.request(`/authorizations`, options);
  }
}

module.exports = Authorizations;
