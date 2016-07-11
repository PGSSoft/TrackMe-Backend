var app = app || {};
(function(_app) {
  'use strict';

  _app.baseUrl = 'http://localhost:64240/';

  // _app.baseUrl = 'http://10.10.33.187:64240/';

  angular.module('app', [
      'ngMaterial',
      'ui.router',
      'app.pages.main',
      'app.pages.token',
      'app.pages.error'
    ])
    .config(['$stateProvider', '$mdThemingProvider', '$locationProvider', '$urlRouterProvider',
    function($stateProvider, $mdThemingProvider, $locationProvider, $urlRouterProvider) {

      //$locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/token/');

      $stateProvider
        .state('app', {
          url: '/',
          abstract: true
        });

      $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('blue-grey')
        .warnPalette('red');

    }]);

  angular.module('app').value('baseUrl',
    _app.baseUrl
  );

})(app);
