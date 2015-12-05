"use strict";

class Users {
  constructor (transport) {
    this.transport = transport;
  }

  find (username) {
    return this.transport.request(`/users/${username}`);
  }
}

module.exports = Users;
