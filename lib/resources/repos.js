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
   *
   * @return {Promise}
   */
  find (repository) {
    return this.transport.request(`/repos/${repository}`);
  }
}

module.exports = Repos;
