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
   * @return {{}}
   */
  find (username) {
    return this.transport.request(`/users/${username}`);
  }
}

module.exports = Users;
