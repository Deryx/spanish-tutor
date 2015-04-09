/**
 * Created by dscott on 3/18/2015.
 */
(function() {
    var WordScrambleController = function ($scope, $state, dictionaryFactory) {

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
                    $scope.wordArray = [];
                    $scope.unscrambledWord = [];
                    for(var i = 0;i < $scope.wordLength; i++) {
                        $scope.unscrambledWord.push($scope.word[i]);
                        $scope.wordArray.push($scope.word[i]);
                    }

                    function shuffle(array) {
                        var counter = array.length, temp, index;

                        // While there are elements in the array
                        while (counter > 0) {
                            // Pick a random index
                            index = Math.floor(Math.random() * counter);

                            // Decrease counter by 1
                            counter--;

                            // And swap the last element with it
                            temp = array[counter];
                            array[counter] = array[index];
                            array[index] = temp;
                        }

                        return array;
                    }

                    $scope.scrambledWord = shuffle($scope.wordArray);

                    $scope.$watchCollection('scrambledWord', function (newOrder) {
                        $scope.correctIndex = 0;
                        for(var i = 0; i < $scope.wordLength; i++) {
                            if ($scope.unscrambledWord[i] == newOrder[i]) {
                                $scope.correctIndex++;
                            }
                        };
                    });
                });
            if($scope.correctIndex > 0 && $scope.wordLength > 0) {
                if ($scope.correctIndex == $scope.wordLength) {
                    $scope.numberCorrect++;
                }
            }
        };

        function countdown() {
            ws-timer = document.getElementById('ws-timer');
            seconds = ws-timer.innerHTML;
            seconds = parseInt(seconds, 10);

            if (seconds == 0) {
                getWord();
                ws-timer.innerHTML = $scope.originalTime;
                if ($scope.index < $scope.numberQuestions) {
                    countdown();
                    $scope.index++;
                }
                return;
            }

            seconds--;
            temp = document.getElementById('ws-timer');
            temp.innerHTML = seconds;
            timeoutMyOswego = setTimeout(countdown, 1000);
        }

        $scope.continue = function() {
            if ($scope.numberQuestions != 0) {
                $scope.showIntroduction = false;
                $scope.showQuestions = true;

                if ($scope.timerTime != undefined && $scope.timerTime > 0) {
                    $scope.showTimer = true;
                    $scope.originalTime = $scope.timerTime;
                    countdown();
                }
                getWord();
            }
        };

        $scope.newWord = function() {
            document.getElementById('ws-timer');
            ws-timer.innerHTML = $scope.originalTime;
            if ($scope.index < $scope.numberQuestions) {
                getWord();

                $scope.index++;
            }
        }
    };

    WordScrambleController.$inject = ['$scope', '$state', 'dictionaryFactory'];

    angular.module('spanishApp')
        .controller('WordScrambleController', WordScrambleController);
}());
