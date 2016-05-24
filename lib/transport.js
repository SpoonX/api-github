"use strict";

let request     = require('request');
let extend      = require('extend');
let querystring = require('querystring');

class Transport {

  /**
   * Construct the transport class with options.
   *
   * @param {{}} options
   */
  constructor (options) {
    this.options = options;
  }

  /**
   * Build a url, taking care of slashes and human errors.
   *
   * @param {string} path
   *
   * @return {string}
   */
  buildUrl (path) {
    return this.options.endpoint.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  }

  /**
   * Perform a request to the api.
   *
   * Examples:
   *  .request('/users/RWOverdijk')
   *  .request('orgs/SpoonX', {method: 'get', page: 2}
   *
   * @param {string} path     The path to make the request to. E.g. `/orgs/SpoonX`.
   * @param {{}}     [overrideOptions] Options to add or override.
   *
   * @return {Promise}
   */
  request (path, overrideOptions) {
    if (typeof overrideOptions !== 'object') {
      overrideOptions = {};
    }

    //@todo implement ?page=2&per_page=100' in a nice way, and allow for other parameters to be passed along
    // Use the `qs` option, somehow.
    var options    = {
          url           : this.buildUrl(path),
          method        : 'get',
          json          : true,
          useQuerystring: true,
          qs            : {page: 1, per_page: 50},
          headers       : {
            'User-Agent': this.options.userAgent,
            'Accept'    : `application/vnd.github.v${this.options.version}+json`
          }
        },
        authHeader = this.getAuthHeader();

    if (authHeader) {
      options.headers.Authorization = authHeader;
    }

    if (overrideOptions.perPage) {
      options.qs.per_page = overrideOptions.perPage;

      delete overrideOptions.perPage;
    }

    if (overrideOptions.page) {
      options.qs.page = overrideOptions.page;

      delete overrideOptions.page;
    }

    extend(true, options, overrideOptions);

    // Return promise to be resolved or rejected after the request.
    return this.doRequest(options);
  }

  /**
   * Perform the actual request.
   *
   * @param {{}} options
   *
   * @return {Promise}
   */
  doRequest (options) {
    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        if (error) {
          return reject({error: error});
        }

        // Anything higher than 400 is considered an error.
        if (response.statusCode >= 400) {
          return reject({
            body      : body,
            statusCode: response.statusCode,
            response  : response
          });
        }

        // All went well, resolve with the body.
        return resolve(body);
      });
    });
  }

  /**
   * Build the auth header if needed.
   *
   * @param {{}} auth Override value
   *
   * @return {string|null}
   */
  getAuthHeader (auth) {
    auth = auth || this.options.auth;

    if (!auth) {
      return null;
    }

    if (auth.token) {
      return 'token ' + auth.token;
    }

    if (auth.username && auth.password) {
      return 'Basic ' + new Buffer(`${auth.username}:${auth.password}`).toString('base64');
    }

    return null;
  }
}

module.exports = Transport;
