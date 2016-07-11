(function() {
  'use strict';
  angular.module('app').controller('toolbarController', ['$scope', '$rootScope', function($scope, $rootScope) {
    var timerDisplayed = false;
    $scope.isTimerHidden = function() {
      return !timerDisplayed;
    };

    $scope.sessionOkShown = false;
    $scope.sessionInvalidShown = false;
    $scope.sessionExpiredShown = false;

    $rootScope.$on('tml-session-ok', function() {
      $scope.sessionOkShown = true;
      timerDisplayed = true;
    });

    $rootScope.$on('tml-session-invalid', function() {
      $scope.sessionInvalidShown = true;
      timerDisplayed = true;
    });

    $rootScope.$on('tml-session-expired', function() {
      $scope.sessionInvalidShown = false;
      $scope.sessionExpiredShown = true;
      timerDisplayed = true;
    });

    $rootScope.$on('tml-terminate-timer', function() {
      $scope.sessionOkShown = false;
      $scope.sessionExpiredShown = true;
    });
  }]);
})();
