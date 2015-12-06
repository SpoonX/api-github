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
   *
   * @return {Promise}
   */
  find (username) {
    return this.transport.request(`/users/${username}`);
  }

  /**
   * Get the orgs a user belongs to.
   *
   * @param username
   *
   * @return {Promise}
   */
  getOrgs (username) {
    return this.transport.request(`/users/${username}/orgs`);
  }
}

module.exports = Users;
