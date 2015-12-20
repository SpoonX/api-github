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
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  find (organization, options) {
    return this.transport.request(`/orgs/${organization}`, options);
  }

  /**
   * List organization's members
   *
   * @param {string} organization
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  getMembers (organization, options) {
    return this.transport.request(`/orgs/${organization}/members`, options);
  }

}

module.exports = Orgs;
