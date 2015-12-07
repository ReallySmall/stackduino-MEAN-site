'use strict';

describe('Directive: masonryImages', function () {

  // load the directive's module and view
  beforeEach(module('stackduinoApp'));
  beforeEach(module('app/masonryImages/masonryImages.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<masonry-images></masonry-images>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the masonryImages directive');
  }));
});
