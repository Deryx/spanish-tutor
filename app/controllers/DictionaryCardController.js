/**
 * Created by dscott on 2/28/2015.
 */
(function() {
    var DictionaryCardController = function ($scope, $state, dictionaryFactory) {
        $scope.dictionaryList = [];
        $scope.showIntroduction = true;
        $scope.showCard = false;
        $scope.index = 1;
        $scope.hasImage = true;

        dictionaryFactory.getDictionary()
            .success(function (data) {
                $scope.dictionaryInfo = data.dictionary;

                $scope.getCategories = function() {
                    var expression = "$..category";

                    $scope.categoryList = JSONPath({json: $scope.dictionaryInfo, path: expression});
                    $scope.categoryList.sort();
                };

                $scope.getWords = function(index) {
                    var expression = "$..[?(@.category=='" + $scope.wordCategory + "')]";

                    $scope.dictionaryList = JSONPath({json: $scope.dictionaryInfo, path: expression})[0];

                    words = $scope.dictionaryList.words;
                    words.sort(sort_by('translation', true, function(a) {return a.toUpperCase()}));

                    $scope.word = "";

                    $scope.article = $scope.dictionaryList.words[index].gender;
                    if ($scope.article == "m") {
                        $scope.word = "El ";
                    }
                    else if ($scope.article == "f") {
                        $scope.word = "La ";
                    }
                    else if ($scope.article == "fpl") {
                        $scope.word = "Las ";
                    }
                    else if ($scope.article == "mpl") {
                        $scope.word = "Los ";
                    }

                    $scope.word += $scope.dictionaryList.words[index].word;

                    expression = "$..[?(@.translation=='" + $scope.dictionaryList.words[index] + "')]..image";
                    $scope.image = $scope.dictionaryList.words[index].image;
                    if ($scope.image == "") {
                        $scope.hasImage = false;
                    } else {
                        $scope.hasImage = true;
                    }

                    if (hasNumber($scope.dictionaryList[$scope.index])) {
                        $scope.dictionaryList[index] = $scope.dictionaryList[0].substr(0, word.length - 2);
                    }

                    var translation = $scope.dictionaryList.words[index].translation;
                    if (hasNumber(translation)) {
                        translation = translation.substr(0, translation.length - 2);
                    }
                    $scope.translation = translation;
                };

                var sort_by = function(field, reverse, primer){
                    var key = function (x) {return primer ? primer(x[field]) : x[field]};

                    return function (a,b) {
                        var A = key(a), B = key(b);
                        return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
                    }
                }


                function hasNumber(word) {
                    return /\d/.test(word);
                };

                $scope.continue = function() {
                    $scope.showIntroduction = false;
                    $scope.showCard = true;
                };

                $scope.getCategories();

                $scope.newCard = function() {
                    var listLength = $scope.dictionaryList.words.length;
                    if ($scope.index < listLength) {
                        $scope.getWords($scope.index);

                        $scope.index++;
                    }
                }
            });

        $scope.clearCard = function() {
            $state.go($state.$current, null, { reload: true});
        }
    };

    DictionaryCardController.$inject = ['$scope', '$state', 'dictionaryFactory'];

    angular.module('spanishApp')
        .controller('DictionaryCardController', DictionaryCardController);
}());