(function() {
  'use strict';

  angular.module('app').factory('timerService', ['$interval', function($interval) {
    var timer;
    var expirationTime;
    var task;
    var _initTimer = function(timerRef, expirationTimeString, callback) {
      timer = timerRef;
      expirationTime = new Date(expirationTimeString);
      task = $interval(function() {
        calculateTimeLeft(callback);
      }, 1000);
    };

    var calculateTimeLeft = function(callback) {
      var timeLeft = expirationTime - new Date();
      if (timeLeft <= 0) {
        _terminateTimer();
        callback.call(null);
        return;
      }

      var days = ~~(timeLeft / 86400000);
      timeLeft = timeLeft % 86400000;
      var hours = ~~(timeLeft / 3600000);
      timeLeft = timeLeft % 3600000;
      var minutes = ~~(timeLeft / 60000);
      timeLeft = timeLeft % 60000;
      var seconds = ~~(timeLeft / 1000);
      timeLeft = timeLeft % 1000;

      timer.days = days;
      timer.hours = hours;
      timer.minutes = minutes;
      timer.seconds = seconds;
    };

    var _terminateTimer = function() {
      if (!timer) {
        return;
      }

      $interval.cancel(task);
      timer.days = 0;
      timer.hours = 0;
      timer.minutes = 0;
      timer.seconds = 0;
    };

    return {
      initTimer: _initTimer,
      terminateTimer: _terminateTimer,
    };
  }]);
})();
