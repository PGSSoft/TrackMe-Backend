(function() {
  'use strict';

  angular.module('app.pages.token').directive('tmMap', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        center: '=',
        zoom: '=',
        markers: '=',
        events: '=',
        control: '=',
        markerEvents: '=',
        markersControl: '='
      },
      templateUrl: 'components/map/map.html',
      link: function(scope, element, attrs, controller, transcludeFn) {
        //for rendering purposes
        $timeout(function() {
          scope.flag = true;
        }, 0);
      }
    };
  }]);
})();
