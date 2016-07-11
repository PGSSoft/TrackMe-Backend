(function() {
  'use strict';

  angular.module('app').directive('tmTimer', [function() {
    return {
      restrict: 'E',
      templateUrl: 'components/timer/timer.html',
      scope: {
      },
      controller: ['$scope', 'timerService', '$rootScope', timerController],
    };
  }]);

  function timerController($scope, timerService, $rootScope) {
    $scope.timer = {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
    };

    $scope.isInitialized = false;

    $rootScope.$on('tml-init-timer', function(event, expDate, cb) {
      timerService.initTimer($scope.timer, expDate, cb);
      $scope.isInitialized = true;
    });

    $rootScope.$on('tml-terminate-timer', function(event) {
      $scope.isInitialized = false;
      timerService.terminateTimer();
    });
  }
})();
