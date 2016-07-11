(function() {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', ['$state', 'hubService', 'baseUrl', '$timeout', '$sce', '$rootScope',
      function($state, hubService, baseUrl, $timeout, $sce, $rootScope) {
        var _this = this;
        var app = _this;
        var isSessionActive = false;
        var init = function() {
          hubService.initHub()
            .catch(function(e) {
              $timeout(function() {
                $state.go('app.error', e || 'Error initializing a connection with a server.');
              }, 0);
            });
        };

        app.refreshPage = function() {
          $state.reload();
        };

        app.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
        };

        app.signalrUrl = function() {
          return app.trustSrc(baseUrl + 'signalr/hubs');
        };

        $(document).ready(function() {
          init();
        });
      }
    ]);
})();
