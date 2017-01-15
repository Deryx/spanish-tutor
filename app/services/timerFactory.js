(function() {
    var timerFactory = function( $scope, $timeout ) {
        var factory = {};

        factory.getTimer = function( timr, duration ) {
            var seconds = document.getElementById( timr ).innerHTML;
            seconds = parseInt(seconds, 10);

            if (seconds == 0) {
                var timer = document.getElementById(timr);
                timer.innerHTML = duration;
                if ($scope.index < $scope.numberQuestions) {
                    factory.getTimer( timr, duration--);
                    $scope.index++;
                }

                return;
            }

            seconds--;
            var temp = document.getElementById( timr );
            temp.innerHTML = seconds;
            var timeoutMyOswego = setTimeout(function() {
                return factory.getTimer( timr, duration-- );
            }, 1000);
        };

        return factory;
    };

    timerFactory.$inject = ['$timeout'];

    angular.module('spanishApp')
        .factory('timerFactory', timerFactory);
}());