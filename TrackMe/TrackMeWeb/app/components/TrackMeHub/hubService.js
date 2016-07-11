(function() {
  'use strict';
  angular.module('app').factory('hubService', ['baseUrl', '$q','$state', function(baseUrl, $q, $state) {

    var trackMeHubProxy;
    var currentToken;
    var initPromise;
    var onCoordinatesPushed;
    var onSessionTerminated;
    var hookUpEvents = function(proxy) {
      if (!proxy) {
        $state.go("app.error", {
          errorMessage: "Server is not responding"
        });
        return;
      }
      proxy.client.pushCoordinates = function(token, navigationItem) {
        onCoordinatesPushed.call(null, token, navigationItem);
      };
      proxy.client.terminateSession = function(token) {
        onSessionTerminated.call(null, token);
      };
    };

    var _subscribe = function(token, pushCallback, sessionEndCallback) {
      onCoordinatesPushed = pushCallback;
      onSessionTerminated = sessionEndCallback;
      initPromise.then(function() {
        currentToken = token;
        trackMeHubProxy.server.joinGroup(currentToken);
      });
    };

    var _unsubscribe = function() {
      initPromise.then(function() {
        trackMeHubProxy.server.leaveGroup(currentToken);
      });
    };

    var _initHub = function() {
      var wait = $q.defer();
      trackMeHubProxy = $.connection.trackMeHub;
      hookUpEvents(trackMeHubProxy);

      $.connection.hub.url = baseUrl + 'signalr';
      try {
      $.connection.hub.start()
        .done(function() {
          wait.resolve();
        })
        .fail(function() {
          wait.reject();
        });
      }
      catch(e){
        wait.reject(e);
      }
      initPromise = wait.promise;
      return wait.promise;
    };

    return {
      initHub: _initHub,
      subscribe: _subscribe,
      unsubscribe: _unsubscribe
    }
  }]);
})();
