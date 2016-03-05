'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Moduleone = mongoose.model('Moduleone'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, moduleone;

/**
 * Moduleone routes tests
 */
describe('Moduleone CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Moduleone
    user.save(function () {
      moduleone = {
        name: 'Moduleone name'
      };

      done();
    });
  });

  it('should be able to save a Moduleone if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Moduleone
        agent.post('/api/moduleones')
          .send(moduleone)
          .expect(200)
          .end(function (moduleoneSaveErr, moduleoneSaveRes) {
            // Handle Moduleone save error
            if (moduleoneSaveErr) {
              return done(moduleoneSaveErr);
            }

            // Get a list of Moduleones
            agent.get('/api/moduleones')
              .end(function (moduleonesGetErr, moduleonesGetRes) {
                // Handle Moduleone save error
                if (moduleonesGetErr) {
                  return done(moduleonesGetErr);
                }

                // Get Moduleones list
                var moduleones = moduleonesGetRes.body;

                // Set assertions
                (moduleones[0].user._id).should.equal(userId);
                (moduleones[0].name).should.match('Moduleone name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Moduleone if not logged in', function (done) {
    agent.post('/api/moduleones')
      .send(moduleone)
      .expect(403)
      .end(function (moduleoneSaveErr, moduleoneSaveRes) {
        // Call the assertion callback
        done(moduleoneSaveErr);
      });
  });

  it('should not be able to save an Moduleone if no name is provided', function (done) {
    // Invalidate name field
    moduleone.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Moduleone
        agent.post('/api/moduleones')
          .send(moduleone)
          .expect(400)
          .end(function (moduleoneSaveErr, moduleoneSaveRes) {
            // Set message assertion
            (moduleoneSaveRes.body.message).should.match('Please fill Moduleone name');

            // Handle Moduleone save error
            done(moduleoneSaveErr);
          });
      });
  });

  it('should be able to update an Moduleone if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Moduleone
        agent.post('/api/moduleones')
          .send(moduleone)
          .expect(200)
          .end(function (moduleoneSaveErr, moduleoneSaveRes) {
            // Handle Moduleone save error
            if (moduleoneSaveErr) {
              return done(moduleoneSaveErr);
            }

            // Update Moduleone name
            moduleone.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Moduleone
            agent.put('/api/moduleones/' + moduleoneSaveRes.body._id)
              .send(moduleone)
              .expect(200)
              .end(function (moduleoneUpdateErr, moduleoneUpdateRes) {
                // Handle Moduleone update error
                if (moduleoneUpdateErr) {
                  return done(moduleoneUpdateErr);
                }

                // Set assertions
                (moduleoneUpdateRes.body._id).should.equal(moduleoneSaveRes.body._id);
                (moduleoneUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Moduleones if not signed in', function (done) {
    // Create new Moduleone model instance
    var moduleoneObj = new Moduleone(moduleone);

    // Save the moduleone
    moduleoneObj.save(function () {
      // Request Moduleones
      request(app).get('/api/moduleones')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Moduleone if not signed in', function (done) {
    // Create new Moduleone model instance
    var moduleoneObj = new Moduleone(moduleone);

    // Save the Moduleone
    moduleoneObj.save(function () {
      request(app).get('/api/moduleones/' + moduleoneObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', moduleone.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Moduleone with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/moduleones/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Moduleone is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Moduleone which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Moduleone
    request(app).get('/api/moduleones/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Moduleone with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Moduleone if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Moduleone
        agent.post('/api/moduleones')
          .send(moduleone)
          .expect(200)
          .end(function (moduleoneSaveErr, moduleoneSaveRes) {
            // Handle Moduleone save error
            if (moduleoneSaveErr) {
              return done(moduleoneSaveErr);
            }

            // Delete an existing Moduleone
            agent.delete('/api/moduleones/' + moduleoneSaveRes.body._id)
              .send(moduleone)
              .expect(200)
              .end(function (moduleoneDeleteErr, moduleoneDeleteRes) {
                // Handle moduleone error error
                if (moduleoneDeleteErr) {
                  return done(moduleoneDeleteErr);
                }

                // Set assertions
                (moduleoneDeleteRes.body._id).should.equal(moduleoneSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Moduleone if not signed in', function (done) {
    // Set Moduleone user
    moduleone.user = user;

    // Create new Moduleone model instance
    var moduleoneObj = new Moduleone(moduleone);

    // Save the Moduleone
    moduleoneObj.save(function () {
      // Try deleting Moduleone
      request(app).delete('/api/moduleones/' + moduleoneObj._id)
        .expect(403)
        .end(function (moduleoneDeleteErr, moduleoneDeleteRes) {
          // Set message assertion
          (moduleoneDeleteRes.body.message).should.match('User is not authorized');

          // Handle Moduleone error error
          done(moduleoneDeleteErr);
        });

    });
  });

  it('should be able to get a single Moduleone that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Moduleone
          agent.post('/api/moduleones')
            .send(moduleone)
            .expect(200)
            .end(function (moduleoneSaveErr, moduleoneSaveRes) {
              // Handle Moduleone save error
              if (moduleoneSaveErr) {
                return done(moduleoneSaveErr);
              }

              // Set assertions on new Moduleone
              (moduleoneSaveRes.body.name).should.equal(moduleone.name);
              should.exist(moduleoneSaveRes.body.user);
              should.equal(moduleoneSaveRes.body.user._id, orphanId);

              // force the Moduleone to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Moduleone
                    agent.get('/api/moduleones/' + moduleoneSaveRes.body._id)
                      .expect(200)
                      .end(function (moduleoneInfoErr, moduleoneInfoRes) {
                        // Handle Moduleone error
                        if (moduleoneInfoErr) {
                          return done(moduleoneInfoErr);
                        }

                        // Set assertions
                        (moduleoneInfoRes.body._id).should.equal(moduleoneSaveRes.body._id);
                        (moduleoneInfoRes.body.name).should.equal(moduleone.name);
                        should.equal(moduleoneInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Moduleone.remove().exec(done);
    });
  });
});
