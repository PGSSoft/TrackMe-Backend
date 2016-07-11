'use strict';
angular.module('app.pages.error').controller('errorCtrl', ['$state', '$stateParams', function($state, $stateParams) {
  var vm = this;
  vm.errorMessage = null;
  var init = function() {
    vm.errorMessage = $stateParams.errorMessage || 'Error unknown';
  };

  init();
}]);
