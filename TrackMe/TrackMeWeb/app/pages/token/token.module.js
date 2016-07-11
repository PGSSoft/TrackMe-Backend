(function() {
  'use strict';
  angular.module('app.pages.token', ['uiGmapgoogle-maps'])
    .config(['$stateProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, uiGmapGoogleMapApiProvider) {

      $stateProvider.state('app.token', {
        url: 'token/{token}',
        views: {
          'root@': {
            controller: 'TokenCtrl as vm',
            templateUrl: '/pages/token/token.html'

          }
        }
      });

      uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'geometry'
      });

    }]);
})();
