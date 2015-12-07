'use strict';

var app = require('../..');
var request = require('supertest');

var newSetting;

describe('Setting API:', function() {

  describe('GET /api/settings', function() {
    var settings;

    beforeEach(function(done) {
      request(app)
        .get('/api/settings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          settings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      settings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/settings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/settings')
        .send({
          name: 'New Setting',
          info: 'This is the brand new setting!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSetting = res.body;
          done();
        });
    });

    it('should respond with the newly created setting', function() {
      newSetting.name.should.equal('New Setting');
      newSetting.info.should.equal('This is the brand new setting!!!');
    });

  });

  describe('GET /api/settings/:id', function() {
    var setting;

    beforeEach(function(done) {
      request(app)
        .get('/api/settings/' + newSetting._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          setting = res.body;
          done();
        });
    });

    afterEach(function() {
      setting = {};
    });

    it('should respond with the requested setting', function() {
      setting.name.should.equal('New Setting');
      setting.info.should.equal('This is the brand new setting!!!');
    });

  });

  describe('PUT /api/settings/:id', function() {
    var updatedSetting

    beforeEach(function(done) {
      request(app)
        .put('/api/settings/' + newSetting._id)
        .send({
          name: 'Updated Setting',
          info: 'This is the updated setting!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSetting = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSetting = {};
    });

    it('should respond with the updated setting', function() {
      updatedSetting.name.should.equal('Updated Setting');
      updatedSetting.info.should.equal('This is the updated setting!!!');
    });

  });

  describe('DELETE /api/settings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/settings/' + newSetting._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when setting does not exist', function(done) {
      request(app)
        .delete('/api/settings/' + newSetting._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
