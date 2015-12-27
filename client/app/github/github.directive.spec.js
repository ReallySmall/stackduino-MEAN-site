'use strict';

describe('Directive: github', function () {

  // load the directive's module and view
  beforeEach(module('stackduinoApp'));
  beforeEach(module('app/github/github.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<github></github>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the github directive');
  }));
});
