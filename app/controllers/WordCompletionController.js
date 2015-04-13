/**
 * Created by dscott on 3/18/2015.
 */
(function() {
    var WordCompletionController = function ($scope, $state, dictionaryFactory) {

        $scope.numberQuestions = 0;
        $scope.wordLength = 0;
        $scope.correctIndex = 0;
        $scope.numberCorrect = 0;
        $scope.showIntroduction = true;
        $scope.showQuestions = false;
        $scope.index = 0;

        function getWord() {
            dictionaryFactory.getDictionary()
                .success(function (data) {
                    $scope.dictionaryInfo = data.dictionary;

                    var expression = "$..word";
                    $scope.words = JSONPath({json: $scope.dictionaryInfo, path: expression});

                    expression = "$..translation";
                    $scope.translations = JSONPath({json: $scope.dictionaryInfo, path: expression});

                    $scope.dictionaryLength = $scope.words.length;

                    $scope.wordNumber = Math.floor((Math.random() * $scope.dictionaryLength) + 1);

                    $scope.word = $scope.words[$scope.wordNumber];
                    $scope.translation = $scope.translations[$scope.wordNumber];

                    $scope.wordLength = $scope.word.length;
                    $scope.completeWord = [];
                    $scope.wordArray = [];
                    for (var i = 0; i < $scope.wordLength; i++) {
                        $scope.completeWord.push($scope.word[i]);
                        $scope.wordArray.push($scope.word[i]);
                    }
                    $scope.wordLength = $scope.completeWord.length;

                    $scope.chars2Remove = Math.floor((Math.random() * $scope.wordLength - 1) + 1);
                    while ($scope.chars2Remove <= 1) {
                        $scope.chars2Remove = Math.floor((Math.random() * $scope.wordLength - 1) + 1);
                    }

                    for(var i = 0; i < $scope.chars2Remove; i++) {
                        $scope.randomChar = Math.floor((Math.random() * $scope.wordLength - 1) + 1);
                        $scope.wordArray[$scope.randomChar] = ' ';
                    }
                    console.log($scope.wordLength);

                    $scope.$watchCollection('wordArray', function (newWord) {
                        $scope.correctIndex = 0;
                        for (var i = 0; i < $scope.wordLength; i++) {
                            if ($scope.completeWord[i] == newWord[i]) {
                                $scope.correctIndex++;
                            }
                        };
                    });
                });
            if ($scope.correctIndex > 0 && $scope.wordLength > 0) {
                if ($scope.correctIndex == $scope.wordLength) {
                    $scope.numberCorrect++;
                }
            }
        }

        function countdown() {
            seconds = document.getElementById('wc-timer').innerHTML;
            seconds = parseInt(seconds, 10);

            if (seconds == 0) {
                getWord();
                var wctimer = document.getElementById('wc-timer');
                wctimer.innerHTML = $scope.originalTime;
                if ($scope.index < $scope.numberQuestions) {
                    countdown();
                    $scope.index++;
                }
                return;
            }

            seconds--;
            temp = document.getElementById('wc-timer');
            temp.innerHTML = seconds;
            timeoutMyOswego = setTimeout(countdown, 1000);
        }

        $scope.continue = function() {
            if ($scope.numberQuestions != 0) {
                $scope.showIntroduction = false;
                $scope.showWords = true;

                if ($scope.timerTime != undefined && $scope.timerTime > 0) {
                    $scope.showTimer = true;
                    $scope.originalTime = $scope.timerTime;
                    countdown();
                }
                getWord();
            }
        };

        $scope.newWord = function() {
            var wctimer = document.getElementById('wc-timer');
            wctimer.innerHTML = $scope.originalTime;
            if ($scope.index < $scope.numberQuestions) {
                getWord();

                $scope.index++;
            }
        }
    }

    WordCompletionController.$inject = ['$scope', '$state', 'dictionaryFactory'];

    angular.module('spanishApp')
        .controller('WordCompletionController', WordCompletionController);
}());
