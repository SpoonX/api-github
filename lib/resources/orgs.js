"use strict";

class Orgs {
  constructor (transport) {
    this.transport = transport;
  }

  find (organization) {
    return this.transport.request(`/orgs/${organization}`);
  }
}

module.exports = Orgs;
