/**
 * Created by dscott on 11/13/2014.
 */
(function() {
    var DataAccessFactory = function ($http) {
        var urlBase = 'app/data';
        var factory = {};

        factory.getJSONData = function(tableFile) {
            return $http.get(urlBase + '/' + tableFile)
        };

        return factory;
    };

   DataAccessFactory.$inject = ['$http'];

    angular.module('spanishApp')
        .factory('DataAccessFactory', DataAccessFactory);
}());