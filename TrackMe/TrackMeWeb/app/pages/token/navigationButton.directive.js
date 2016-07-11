(function() {
  'use strict';

  angular.module('app.pages.token').directive('tmlNavigationButton', [function() {
    return {
      scope: {
        isTracking:'=',
        changeTrackingMode: '&'
      },
      restrict: 'E',
      templateUrl: 'pages/token/navigationButton.html'
    };
  }]);
})();
