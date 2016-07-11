(function() {
  'use strict';

  angular.module('app').factory('mapService', ['mobileDetector', '$rootScope', 'uiGmapIsReady',
    function(mobileDetector, $rootScope, uiGmapIsReady) {
      var isMobile;
      var map = {};
      var markers = [];
      var mapControl;
      var markersControl;
      var navigationId = null;
      var lastCenter = {
        latitude: 0,
        longitude: 0
      };
      var circles = [];
      var isTracking = true;
      var _createMap = function(control, markersCtrl, point) {
        mapControl = control;
        markersControl = markersCtrl;

        //clean the markers up
        markers.length = 0;

        //load last center
        var center = lastCenter;

        //if not on desktop, create a user marker and start tracking him
        if (mobileDetector.isMobileOrTablet())
        {
          _createUserMarker();
          _initUserTracking();
        }

        //add target marker
        _addMarker(point);

        var zoom = 18;

        //change center and update last center
        center = _getCenter();
        lastCenter = center;

        //if you didn't get coordinates, set zoom to 1
        if (!(center.latitude || center.longitude)) {
          zoom = 1;
        }

        //create map object
        map = {
          center: center,
          zoom: zoom
        };
        _setNavigationClearing();
        return map;
      };

      var _addMarker = function(point) {
        if (!point || point.latitude === null || point.longitude === null) {
          return;
        }

        markers[0] = {
          latitude: point.latitude,
          longitude: point.longitude,
          title: point.token,
          id: point.token,
          icon: {
            url: 'components/map/destinationMarker.png',
            anchor: {
              x: 30,
              y: 30
            }
          }
        };
        _addCircle(markers[0], point.accuracy, '#00f');
      };

      var _addCircle = function(marker, radius, color) {
        uiGmapIsReady.promise(1).then(

          (function(marker, radius, color) {
            return function() {
              var m = _.where(markersControl.getGMarkers(), { key:marker.id })[0];
              var index = _.findIndex(markers, function(x) { return x.id === m.key;});

              var circle = new google.maps.Circle({
                map:m.map,
                clickable: false,
                radius: radius || 0,
                fillColor: color,
                fillOpacity: 0.2,
                strokeColor: '#313131',
                strokeOpacity: 0.4,
                strokeWeight: 0.8
              });
              circles[index] = circle;
              circle.bindTo('center', m, 'position');
            };
          })(marker, radius, color)
        );
      };

      var _updateMarker = function(point) {
        var marker = markers.filter(function(m) {
          return m.id === point.token;
        })[0];

        if (marker) {
          marker.latitude = point.latitude;
          marker.longitude = point.longitude;
        }

        var circle = circles[0];
        circle.setRadius(point.accuracy || 0);

        lastCenter = {
          latitude: point.latitude,
          longitude: point.longitude
        };
        if (map.zoom <= 1) {
          map.zoom = 10;
        }

        if (isTracking) {
          _updateCenter();
        }
      };

      var _getMarkers = function() {
        return markers;
      };

      var _updateCenter = function() {
        map.center = _getCenter();
        lastCenter = map.center;
        _fitZoom();
      };

      var _fitZoom = function() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
          bounds.extend(new google.maps.LatLng(markers[i].latitude, markers[i].longitude));
        }

        if (mapControl.getGMap) {
          var map = mapControl.getGMap();
          map.fitBounds(bounds);
          if (map.zoom > 18) {
            map.setZoom(18);
          }
        }
      };

      var _createUserMarker = function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(_setUserMarker, function(e) {
            console.log("Error checking user's position!");

          }, {

            enableHighAccuracy: true,
            timeout: 10000
          });
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
      };

      var _setUserMarker = function(data) {
        var coords = data.coords;
        markers[1] = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          title: "User's position",
          id: 1

          //icon: 'http://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png'
        };
        _addCircle(markers[1], coords.accuracy, '#f00');
        _updateCenter();
      };

      var _initUserTracking = function() {
        if (navigationId) {
          return;
        }

        if (navigator.geolocation) {
          navigationId = navigator.geolocation.watchPosition(_updateUsersPosition, function(e) {
            console.log("Error updating user's position!");
          }, {

            enableHighAccuracy: true,
            timeout: 10000
          });
        }
      };

      var _updateUsersPosition = function(pos) {
        var crd = pos.coords;
        var marker = markers.filter(function(m) {
          return m.id === 1;
        })[0];

        if (marker) {
          marker.longitude = crd.longitude;
          marker.latitude = crd.latitude;
        } else {
          _createUserMarker();
        }

        var circle = circles[1];
        if (circle) {
          circle.setRadius(crd.accuracy || 0);
        }

        if (isTracking) {
          _updateCenter();
        }
      };

      var _getCenter = function() {
        if (markers.length === 0) {
          return {
            latitude: 0,
            longitude: 0
          };
        }

        if (markers.length === 1) {
          return {
            latitude: markers[0].latitude,
            longitude: markers[0].longitude
          };
        }

        if (markers.length === 2) {
          var xa = markers[0].latitude,
            ya = markers[0].longitude,
            xb = markers[1].latitude,
            yb = markers[1].longitude;

          return {
            latitude: xa + 0.5 * (xb - xa),
            longitude: ya + 0.5 * (yb - ya)
          };
        }
      };

      var _onTrackChange = function(x) {
        isTracking = x;
        if (x === true) {
          _updateCenter();
        }
      };

      var _setNavigationClearing = function() {
        $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams) {
            if (fromState.name === 'app.token') {
              if (navigationId) {
                navigator.geolocation.clearWatch(navigationId);
                navigationId = null;
              }
            }
          });
      };

      return {
        create: _createMap,
        addMarker: _addMarker,
        getMarkers: _getMarkers,
        updateMarker: _updateMarker,
        onTrackChange: _onTrackChange
      };

    }
  ]);
})();
