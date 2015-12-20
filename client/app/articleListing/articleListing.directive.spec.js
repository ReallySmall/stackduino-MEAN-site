'use strict';

describe('Directive: articleListing', function () {

  // load the directive's module and view
  beforeEach(module('stackduinoApp'));
  beforeEach(module('app/articleListing/articleListing.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<article-listing></article-listing>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the articleListing directive');
  }));
});
