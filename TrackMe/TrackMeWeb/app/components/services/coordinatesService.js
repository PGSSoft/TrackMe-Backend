(function() {
  'use strict';

  angular.module('app').factory('coordinatesService', ['$http', 'baseUrl', '$q', function($http, baseUrl, $q) {
    var url = baseUrl + 'api/coordinates/';

    var _getCoordinates = function(token) {
    return $q(function(resolve, reject) {
      $http.get(url + token).then(function(response) {
        if (response.data.IsError === false) {
          resolve(response.data);
        } else {
          reject(response.data.ErrorMessage);
        }
      }, function(response) {

        reject(response.statusText);
      });
    });
  };

    return {
      getCoordinates: _getCoordinates
    };
  }]);
})();
