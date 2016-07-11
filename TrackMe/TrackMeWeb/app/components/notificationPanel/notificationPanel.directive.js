(function() {
  'use strict';

  angular.module('app').directive('tmNotificationPanel', [function() {
    return {
      restrict: 'E',
      templateUrl: 'components/notificationPanel/notificationPanel.html',
      scope: {
        message: '@'
      }
    };
  }]);
})();
