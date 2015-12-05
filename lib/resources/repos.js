"use strict";

class Repos {
  constructor (transport) {
    this.transport = transport;
  }

  find (repository) {
    return this.transport.request(`/repos/${repository}`);
  }
}

module.exports = Repos;
