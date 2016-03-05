'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Moduleone Schema
 */
var ModuleoneSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Moduleone name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Moduleone', ModuleoneSchema);
