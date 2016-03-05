'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Moduleone = mongoose.model('Moduleone'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Moduleone
 */
exports.create = function(req, res) {
  var moduleone = new Moduleone(req.body);
  moduleone.user = req.user;

  moduleone.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(moduleone);
    }
  });
};

/**
 * Show the current Moduleone
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var moduleone = req.moduleone ? req.moduleone.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  moduleone.isCurrentUserOwner = req.user && moduleone.user && moduleone.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(moduleone);
};

/**
 * Update a Moduleone
 */
exports.update = function(req, res) {
  var moduleone = req.moduleone ;

  moduleone = _.extend(moduleone , req.body);

  moduleone.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(moduleone);
    }
  });
};

/**
 * Delete an Moduleone
 */
exports.delete = function(req, res) {
  var moduleone = req.moduleone ;

  moduleone.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(moduleone);
    }
  });
};

/**
 * List of Moduleones
 */
exports.list = function(req, res) { 
  Moduleone.find().sort('-created').populate('user', 'displayName').exec(function(err, moduleones) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(moduleones);
    }
  });
};

/**
 * Moduleone middleware
 */
exports.moduleoneByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Moduleone is invalid'
    });
  }

  Moduleone.findById(id).populate('user', 'displayName').exec(function (err, moduleone) {
    if (err) {
      return next(err);
    } else if (!moduleone) {
      return res.status(404).send({
        message: 'No Moduleone with that identifier has been found'
      });
    }
    req.moduleone = moduleone;
    next();
  });
};
