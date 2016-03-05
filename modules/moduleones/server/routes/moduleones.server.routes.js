'use strict';

/**
 * Module dependencies
 */
var moduleonesPolicy = require('../policies/moduleones.server.policy'),
  moduleones = require('../controllers/moduleones.server.controller');

module.exports = function(app) {
  // Moduleones Routes
  app.route('/api/moduleones').all(moduleonesPolicy.isAllowed)
    .get(moduleones.list)
    .post(moduleones.create);

  app.route('/api/moduleones/:moduleoneId').all(moduleonesPolicy.isAllowed)
    .get(moduleones.read)
    .put(moduleones.update)
    .delete(moduleones.delete);

  // Finish by binding the Moduleone middleware
  app.param('moduleoneId', moduleones.moduleoneByID);
};
