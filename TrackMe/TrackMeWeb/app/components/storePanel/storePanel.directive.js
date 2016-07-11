(function() {
  'use strict';

  angular.module('app').directive('storePanel', [function() {
    return {
      restrict: 'E',
      templateUrl:'components/storePanel/storePanel.html'

    };
  }]);
})();
