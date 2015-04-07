/**
 * Created by dscott on 2/18/2015.
 */
(function() {
    var VerbCardController = function ($scope, $state, verbsFactory) {

        verbsFactory.getVerbs()
            .success(function (data) {
                $scope.verbInfo = data.verbs;

                var expression = "$..infinitive";

                $scope.verbList = JSONPath({json: $scope.verbInfo, path: expression});
                $scope.verbList.sort();

            });

        $scope.infinitive = '[ Verb ]';
        $scope.translation = '[ Translation ]';

        $scope.changeCard = function(iverb) {
            $scope.infinitive = iverb;

            expression = "$..[?(@.infinitive=='" + iverb + "')].translation";
            $scope.translation = "[ " + JSONPath({json: $scope.verbInfo, path: expression})[0] + " ]";

            $scope.yo = '';
            $scope.tu = '';
            $scope.el = '';
            $scope.nosotros = '';
            $scope.ellos = '';
        };

        $scope.showTense = function(tense) {
            expression = "$..[?(@.infinitive=='" + $scope.infinitive + "')].";
            expression += tense;
            var tense = JSONPath({json: $scope.verbInfo, path: expression})[0];

            $scope.yo = tense.yo;
            $scope.tu = tense.tu;
            $scope.el = tense.el;
            $scope.nosotros = tense.nosotros;
            $scope.ellos = tense.ellos;
        }

        $scope.clearCard = function() {
            $scope.infinitive = '[ Verb ]';
            $scope.translation = '[ Translation ]';

            $scope.yo = '';
            $scope.tu = '';
            $scope.el = '';
            $scope.nosotros = '';
            $scope.ellos = '';
        }
    };

    VerbCardController.$inject = ['$scope', '$state', 'verbsFactory'];

    angular.module('spanishApp')
        .controller('VerbCardController', VerbCardController);
}());
