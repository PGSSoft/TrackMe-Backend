'use strict';
angular.module('app.pages.main')
  .controller('MainCtrl', ['$state', '$scope', function($state, $scope) {
    var vm = this;

    vm.token = null;

    var init = function() {
      $scope.tokenForm.$setPristine();
    };

    vm.submitToken = function() {
      $scope.tokenForm.clicked = true;
      if ($scope.tokenForm.$invalid) {
        return;
      }

      $state.go('app.token', { token: vm.token });

      init();
    };
  }]);
