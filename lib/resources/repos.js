"use strict";

class Repos {

  /**
   * Construct the Repos resource with a Transport class.
   *
   * @param {Transport} transport
   */
  constructor(transport) {
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
  find(repository, options) {
    return this.transport.request(`/repos/${repository}`, options);
  }

  /**
   * Find a single pull request.
   *
   * @param {string} repository
   * @param {number} identifier
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  pullRequest(repository, identifier, options) {
    return this.transport.request(`/repos/${repository}/pulls/${identifier}`, options);
  }


  /**
   * Find all pull requests.
   *
   * @param {string} repository
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  pullRequests(repository, options) {
    return this.transport.request(`/repos/${repository}/pulls`, options);
  }

  /**
   * Fork a repository.
   *
   * @param {string} repository
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  fork(repository, options) {
    options        = options || {};
    options.method = 'post';

    return this.transport.request(`/repos/${repository}/forks`, options);
  }

  /**
   * Get the contributors for `repository`
   *
   * @param {string} repository
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  getContributors(repository, options) {
    return this.transport.request(`/repos/${repository}/contributors`, options);
  }
}

module.exports = Repos;
