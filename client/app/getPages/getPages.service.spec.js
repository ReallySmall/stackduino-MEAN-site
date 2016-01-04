'use strict';

describe('Service: getPages', function () {

  // load the service's module
  beforeEach(module('stackduinoApp'));

  // instantiate service
  var getPages;
  beforeEach(inject(function (_getPages_) {
    getPages = _getPages_;
  }));

  it('should do something', function () {
    expect(!!getPages).toBe(true);
  });

});
