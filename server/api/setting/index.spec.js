'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var settingCtrlStub = {
  index: 'settingCtrl.index',
  show: 'settingCtrl.show',
  create: 'settingCtrl.create',
  update: 'settingCtrl.update',
  destroy: 'settingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var settingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './setting.controller': settingCtrlStub
});

describe('Setting API Router:', function() {

  it('should return an express router instance', function() {
    settingIndex.should.equal(routerStub);
  });

  describe('GET /api/settings', function() {

    it('should route to setting.controller.index', function() {
      routerStub.get
        .withArgs('/', 'settingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/settings/:id', function() {

    it('should route to setting.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'settingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/settings', function() {

    it('should route to setting.controller.create', function() {
      routerStub.post
        .withArgs('/', 'settingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/settings/:id', function() {

    it('should route to setting.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'settingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/settings/:id', function() {

    it('should route to setting.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'settingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/settings/:id', function() {

    it('should route to setting.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'settingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
