"use strict";

class Users {

  /**
   * Construct the Users resource with a Transport class.
   *
   * @param {Transport} transport
   */
  constructor (transport) {
    this.transport = transport;
  }

  /**
   * Find a single user by name.
   *
   * @param {string} username
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  find (username, options) {
    return this.transport.request(`/users/${username}`, options);
  }

  /**
   * Get the orgs a user belongs to.
   *
   * @param {string} username
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  getOrgs (username, options) {
    return this.transport.request(`/users/${username}/orgs`, options);
  }
}

module.exports = Users;
