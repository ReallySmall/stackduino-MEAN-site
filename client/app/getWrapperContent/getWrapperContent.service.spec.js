'use strict';

describe('Service: getWrapperContent', function () {

  // load the service's module
  beforeEach(module('stackduinoApp'));

  // instantiate service
  var getWrapperContent;
  beforeEach(inject(function (_getWrapperContent_) {
    getWrapperContent = _getWrapperContent_;
  }));

  it('should do something', function () {
    expect(!!getWrapperContent).toBe(true);
  });

});
