'use strict';

describe('Directive: flexSlider', function () {

  // load the directive's module and view
  beforeEach(module('stackduinoApp'));
  beforeEach(module('app/flexSlider/flexSlider.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<flex-slider></flex-slider>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the flexSlider directive');
  }));
});
