(function() {

  'use strict';
  angular.module('app.pages.token')
    .controller('TokenCtrl', ['$state', '$stateParams', 'coordinatesService', 'mapService', '$q', 'hubService', '$scope', '$rootScope',
      function($state, $stateParams, coordinatesService, mapService, $q, hubService, $scope, $rootScope) {
        var _this = this;
        var vm = _this;
        vm.map = null;
        vm.mapControl = {};
        vm.markersControl = {};
        vm.isTracking = true;
        vm.coordinates = {
          latitude: null,
          longitude: null
        };
        vm.tokenValid = false;
        vm.expirationTimePromise = null;
        vm.address = '';
        var markerPopup;

        var init = function() {
          vm.token = $stateParams.token;
          vm.markers = mapService.getMarkers();
          loadCoordinates(vm.token)
            .then(setNavigationItem, initializeMap)
            .then(initializeMap);
        };

        var loadCoordinates = function(token) {
          var defer = $q.defer();
          coordinatesService.getCoordinates(token)
            .then(function(data) {
              vm.tokenValid = true;
              var res = data.Result;
              if (!res.Expired) {
                $scope.$emit('tml-init-timer', res.ExpirationTime, vm.timerCallback);
                $scope.$emit('tml-session-ok');
                hubService.subscribe(token, pushCallback, terminateSessionCallback);
              } else {
                $scope.$emit('tml-session-expired');
              }

              defer.resolve(res);
            }, function(err) {

              $scope.$emit('tml-session-invalid');
              defer.reject(err);
            });

          return defer.promise;
        };

        var setNavigationItem = function(item) {
          var center = {
            latitude: item.Latitude,
            longitude: item.Longitude,
            accuracy: item.Accuracy,
            address: item.Address
          };
          setCoordinates(center);
          vm.address = item.Address;
        };

        var setCoordinates = function(coords) {
          vm.coordinates = coords;
        };

        var navigateToError = function(message) {
          $state.go('app.error', {
            errorMessage: message
          });
        };

        var initializeMap = function() {
          vm.map = mapService.create(vm.mapControl, vm.markersControl,  {
            latitude: vm.coordinates.latitude,
            longitude: vm.coordinates.longitude,
            token: vm.token,
            accuracy: vm.coordinates.accuracy
          });
        };

        vm.timerCallback = function TestFunction() {
          vm.tokenValid = false;
          $scope.$emit('tml-terminate-timer');
        };

        var pushCallback = function(token, item) {
          if (vm.token === token) {
            var coordinates = {
              latitude: item.Latitude,
              longitude: item.Longitude,
              token: token,
              accuracy: item.Accuracy
            };
            setNavigationItem(item);
            mapService.updateMarker(coordinates);
          }
        };

        var terminateSessionCallback = function(t) {
          if (t === vm.token) {
            $scope.$emit('tml-terminate-timer');
          }
        };

        vm.changeTrackingMode = function() {
          vm.isTracking = !vm.isTracking;
          vm.trackingChanged();
        };

        vm.trackingChanged = function() {
          mapService.onTrackChange(vm.isTracking);
        };

        vm.mapEvents = {
          drag: function(map, event, args) {
            vm.isTracking = false;
            vm.trackingChanged();
          }
        };

        vm.markerEvents = {
          click: function(map, event, args) {
            var content = (args.id === 1 ? 'You are here' : vm.coordinates.address);
            if (!markerPopup) {
              markerPopup = new google.maps.InfoWindow({
                content: content
              });
            } else {
              markerPopup.setContent(content);
            }

            markerPopup.open(map.map, this.getGMarker());
          }
        };

        $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams) {
            if (fromState.name === 'app.token') {
              $scope.$emit('tml-terminate-timer');
            }
          });

        init();
      }
    ]);
})();
