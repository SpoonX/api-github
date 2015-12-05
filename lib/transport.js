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
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'User-Agent'  : this.options.userAgent,
        'Accept'      : `application/vnd.github.v${this.options.version}+json`
      }
    };

    // Allow overriding or extending headers
    if (headers) {
      extend(options.headers, headers);
    }

    // Set JSON stringified body
    if (body) {
      options.body = JSON.stringify(body);
    }

    // Return promise to be resolved or rejected after the request.
    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        if (error) {
          return reject({error: error});
        }

        var responseObject;

        // Try parsing the response body.
        try {
          responseObject = JSON.parse(body);
        } catch (e) {
          return reject({
            error   : 'malformed response',
            response: response,
            body    : body
          });
        }

        // Anything higher than 400 is considered an error.
        if (response.statusCode >= 400) {
          responseObject.statusCode = response.statusCode;

          return reject(responseObject);
        }

        // All went well, resolve with the body.
        return resolve(responseObject);
      });
    });
  }
}

module.exports = Transport;
