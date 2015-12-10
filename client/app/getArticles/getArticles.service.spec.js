'use strict';

describe('Service: getArticles', function () {

  // load the service's module
  beforeEach(module('stackduinoApp'));

  // instantiate service
  var getArticles;
  beforeEach(inject(function (_getArticles_) {
    getArticles = _getArticles_;
  }));

  it('should do something', function () {
    expect(!!getArticles).toBe(true);
  });

});
