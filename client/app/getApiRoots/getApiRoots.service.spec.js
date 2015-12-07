'use strict';

describe('Service: getApiRoots', function () {

  // load the service's module
  beforeEach(module('stackduinoApp'));

  // instantiate service
  var getApiRoots;
  beforeEach(inject(function (_getApiRoots_) {
    getApiRoots = _getApiRoots_;
  }));

  it('should do something', function () {
    expect(!!getApiRoots).toBe(true);
  });

});
