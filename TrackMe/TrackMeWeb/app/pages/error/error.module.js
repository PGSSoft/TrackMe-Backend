(function() {
  'use strict';
  angular.module('app.pages.error', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('app.error', {
      params: {
        errorMessage: null
      },
      url: 'error',
      views: {
        'root@': {
          controller: 'errorCtrl as vm',
          templateUrl: 'pages/error/error.html'
        }
      }
    });
  }]);
})();
