"use strict";

class Orgs {

  /**
   * Construct the Orgs resource with a Transport class.
   *
   * @param {Transport} transport
   */
  constructor (transport) {
    this.transport = transport;
  }

  /**
   * Find a single organization by name.
   *
   * @param {string} organization
   *
   * @return {{}}
   */
  find (organization) {
    return this.transport.request(`/orgs/${organization}`);
  }
}

module.exports = Orgs;
