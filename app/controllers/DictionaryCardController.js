/**
 * Created by dscott on 2/28/2015.
 */
(function() {
    var DictionaryCardController = function ($scope, $state, dictionaryFactory) {

        dictionaryFactory.getDictionary()
            .success(function (data) {
                $scope.dictionaryInfo = data.dictionary;

                var expression = "$..[?(@.category=='colors')]..translation";

                $scope.colorList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.colorList.sort();

                expression = "$..[?(@.category=='clothes')]..translation";
                $scope.clothesList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.clothesList.sort();

                expression = "$..[?(@.category=='family')]..translation";
                $scope.familyList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.familyList.sort();

                expression = "$..[?(@.category=='body')]..translation";
                $scope.bodyList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.bodyList.sort();

                expression = "$..[?(@.category=='animals')]..translation";
                $scope.animalList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.animalList.sort();

                expression = "$..[?(@.category=='time')]..translation";
                $scope.timeList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.timeList.sort();

                expression = "$..[?(@.category=='food')]..translation";
                $scope.foodList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.foodList.sort();

                expression = "$..[?(@.category=='household')]..translation";
                $scope.householdList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.householdList.sort();

                expression = "$..[?(@.category=='people')]..translation";
                $scope.peopleList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                $scope.peopleList.sort();
            });

        $scope.word = '[ Word ]';
        $scope.translation = '[ Translation ]';

        $scope.changeCard = function(word) {
            expression = "$..[?(@.translation=='" + word + "')]..gender";
            $scope.article = JSONPath({json: $scope.dictionaryInfo, path: expression})[0];
            if ($scope.article == "m") {
                $scope.word = "El ";

                expression = "$..[?(@.translation=='" + word + "')]..word";
                $scope.word += JSONPath({json: $scope.dictionaryInfo, path: expression})[0];
            }
            else if ($scope.article == "f") {
                $scope.word = "La ";

                expression = "$..[?(@.translation=='" + word + "')]..word";
                $scope.word += JSONPath({json: $scope.dictionaryInfo, path: expression})[0];
            }
            else if ($scope.article == "fpl") {
                $scope.word = "Las ";

                expression = "$..[?(@.translation=='" + word + "')]..word";
                $scope.word += JSONPath({json: $scope.dictionaryInfo, path: expression})[0];
            }
            else if ($scope.article == "mpl") {
                $scope.word = "Los ";

                expression = "$..[?(@.translation=='" + word + "')]..word";
                $scope.word += JSONPath({json: $scope.dictionaryInfo, path: expression})[0];
            }
            else {

                expression = "$..[?(@.translation=='" + word + "')]..word";
                $scope.word = JSONPath({json: $scope.dictionaryInfo, path: expression})[0];
            }

            expression = "$..[?(@.translation=='" + word + "')]..image";
            $scope.image = JSONPath({json: $scope.dictionaryInfo, path: expression})[0];

            if (hasNumber(word)) {
                word = word.substr(0, word.length - 2);
            }
            $scope.translation = "[ " + word + " ]";

        };

        $scope.clearCard = function() {
            $scope.word = '[ Word ]';
            $scope.translation = '[ Translation ]';
            $scope.image = "";
        }

        function hasNumber(word) {
            return /\d/.test(word);
        }
    };

    DictionaryCardController.$inject = ['$scope', '$state', 'dictionaryFactory'];

    angular.module('spanishApp')
        .controller('DictionaryCardController', DictionaryCardController);
}());
