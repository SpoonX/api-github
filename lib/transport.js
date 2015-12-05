"use strict";

var request     = require('request'),
    extend      = require('extend'),
    querystring = require('querystring');

class Transport {
  constructor (options) {
    this.options = options;
  }

  buildUrl (path) {
    return this.options.endpoint.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  }

  request (method, path, body, headers) {
    if (typeof path === 'undefined') {
      path   = method;
      method = 'GET';
    }

    var options = {
      url    : this.buildUrl(path),
      method : method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'User-Agent'  : this.options.userAgent,
        'Accept'      : `application/vnd.github.v${this.options.version}+json`
      }
    };

    if (headers) {
      extend(options.headers, headers);
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        if (error) {
          return reject({error: error});
        }

        var responseObject;

        try {
          responseObject = JSON.parse(body);
        } catch (e) {
          return reject({
            error   : 'malformed response',
            response: response,
            body    : body
          });
        }

        if (response.statusCode >= 400) {
          responseObject.statusCode = response.statusCode;

          return reject(responseObject);
        }

        return resolve(responseObject);
      });
    });
  }
}

module.exports = Transport;
