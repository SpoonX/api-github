"use strict";

class Repos {

  /**
   * Construct the Repos resource with a Transport class.
   *
   * @param {Transport} transport
   */
  constructor (transport) {
    this.transport = transport;
  }

  /**
   * Find a single repository by name.
   *
   * @param {string} repository
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  find (repository, options) {
    return this.transport.request(`/repos/${repository}`, options);
  }
}

module.exports = Repos;
