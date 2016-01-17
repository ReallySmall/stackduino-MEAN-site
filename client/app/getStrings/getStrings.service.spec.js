'use strict';

describe('Service: getStrings', function () {

  // load the service's module
  beforeEach(module('stackduinoApp'));

  // instantiate service
  var getStrings;
  beforeEach(inject(function (_getStrings_) {
    getStrings = _getStrings_;
  }));

  it('should do something', function () {
    expect(!!getStrings).toBe(true);
  });

});
