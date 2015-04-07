/**
 * Created by dscott on 2/18/2015.
 */

(function() {
    var verbsFactory = function($http) {
        var factory = {};

        factory.getVerbs = function() {
            return $http.get('app/data/verbs.json');
        };

        return factory;
    };

    verbsFactory.$inject = ['$http'];

    angular.module('spanishApp')
        .factory('verbsFactory', verbsFactory);
}());