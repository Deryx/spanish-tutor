/**
 * Created by dscott on 2/28/2015.
 */

(function() {
    var dictionaryFactory = function($http) {
        var factory = {};

        factory.getDictionary = function() {
            return $http.get('app/data/dictionary.json');
        };

        return factory;
    };

    dictionaryFactory.$inject = ['$http'];

    angular.module('spanishApp')
        .factory('dictionaryFactory', dictionaryFactory);
}());