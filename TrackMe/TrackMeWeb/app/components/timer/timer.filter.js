angular.module('app').filter('timerFilter', function() {
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function isInteger(num) {
    return (num ^ 0) === num;
  }

  return function(input) {
    if (input === null || !isNumeric(input) || !isInteger(input)) {
      return '- -';
    }

    if (input < 10) {
      return '0' + input;
    }

    return input;
  };
});
