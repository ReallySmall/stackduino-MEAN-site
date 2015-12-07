'use strict';

describe('Controller: BoardsCtrl', function () {

  // load the controller's module
  beforeEach(module('stackduinoApp'));

  var BoardsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BoardsCtrl = $controller('BoardsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
