(function() {
  'use strict';

  angular.module('app.pages.token').directive('tmCoordinatesPanel', [function() {
    return {
      restrict: 'E',
      scope: {
        latitude: '=',
        longitude: '=',
        token: '=',
        address: '='
      },
      templateUrl: 'pages/token/coordinatesPanel.html',
      transclude: true
    };
  }]);
})();
