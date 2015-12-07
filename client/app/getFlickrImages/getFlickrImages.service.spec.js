'use strict';

describe('Service: getFlickrImages', function () {

  // load the service's module
  beforeEach(module('stackduinoApp'));

  // instantiate service
  var getFlickrImages;
  beforeEach(inject(function (_getFlickrImages_) {
    getFlickrImages = _getFlickrImages_;
  }));

  it('should do something', function () {
    expect(!!getFlickrImages).toBe(true);
  });

});
