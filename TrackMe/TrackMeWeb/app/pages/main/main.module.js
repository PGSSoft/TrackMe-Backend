(function() {
  'use strict';
  angular.module('app.pages.main', ['ngMessages'])
    .config(function($stateProvider) {
      $stateProvider.state('app.main', {
        url: 'start',
        views: {
          'root@': {
            controller: 'MainCtrl as vm',
            templateUrl: '/pages/main/main.html'
          }
        }
      });
    });
})();
