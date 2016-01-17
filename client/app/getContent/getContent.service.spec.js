'use strict';

describe('Service: getContent', function () {

  // load the service's module
  beforeEach(module('stackduinoApp'));

  // instantiate service
  var getContent;
  beforeEach(inject(function (_getContent_) {
    getContent = _getContent_;
  }));

  it('should do something', function () {
    expect(!!getContent).toBe(true);
  });

});
