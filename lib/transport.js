"use strict";

var request     = require('request'),
    extend      = require('extend'),
    querystring = require('querystring');

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
   *  .request('GET', 'orgs/SpoonX')
   *
   * @param {string} method     May also be the value for path. Will then default to GET.
   * @param {string} [path]     The path to make the request to. E.g. `/orgs/SpoonX`.
   * @param {{}}     [body]     The body to send along (post and put).
   * @param {{}}     [headers]  Headers to apply to the request.
   *
   * @return {Promise}
   */
  request (method, path, body, headers) {
    if (typeof path === 'undefined') {
      path   = method;
      method = 'GET';
    }

    // Assemble default options
    var options = {
      url    : this.buildUrl(path),
      method : method,
      json   : true,
      headers: extend({
        'User-Agent': this.options.userAgent,
        'Accept'    : `application/vnd.github.v${this.options.version}+json`
      }, headers || {}, this.getAuthHeader())
    };

    // Set body
    if (body) {
      options.body = body;
    }

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
          body.statusCode = response.statusCode;

          return reject(body);
        }

        // All went well, resolve with the body.
        return resolve(body);
      });
    });
  }

  /**
   * Build the auth header if needed.
   *
   * @return {{}}
   */
  getAuthHeader () {
    var auth   = this.options.auth,
        header = {};

    if (!auth) {
      return header;
    }

    if (auth.token) {
      header.Authorization = 'token ' + auth.token;
    } else if (auth.username && auth.password) {
      header.Authorization = 'Basic ' + new Buffer(`${auth.username}:${auth.password}`).toString('base64');
    }

    return header;
  }
}

module.exports = Transport;
