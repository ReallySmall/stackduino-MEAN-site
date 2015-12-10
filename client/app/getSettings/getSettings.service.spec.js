'use strict';

describe('Service: getSetSettings', function () {

  // load the service's module
  beforeEach(module('stackduinoApp'));

  // instantiate service
  var getSetSettings;
  beforeEach(inject(function (_getSetSettings_) {
    getSetSettings = _getSetSettings_;
  }));

  it('should do something', function () {
    expect(!!getSetSettings).toBe(true);
  });

});
