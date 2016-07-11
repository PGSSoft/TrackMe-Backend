(function() {
  'use strict';
  angular.module('app').directive('tmToolbar', [function() {
    return {
      restrict: 'E',
      templateUrl: 'components/toolbar/toolbar.html',
      scope: {
      },
      transclude: true,
      controller: 'toolbarController'
    };
  }
  ]);
})();
