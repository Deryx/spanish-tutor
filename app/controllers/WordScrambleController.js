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

                    var word = $scope.translation;
                    if (hasNumber(word)) {
                        word = word.substr(0, word.length - 2);
                    }
                    $scope.translation = word;

                    $scope.wordLength = $scope.word.length;
                    $scope.wordArray = [];
                    var scrambledWords = '';

                    var string = $scope.word;
                    var numberWords = string.split(' ').length;
                    console.log(numberWords);
                    $scope.scrambledWord = [];
                    if (numberWords > 1) {
                        console.log($scope.word);
                        var stringWords = string.split(' ');
                        console.log(stringWords);
                        var stringArray = [];
                        for (var i = 0; i < numberWords; i++) {
                            var str = stringWords[i];
                            console.log(str);
                            for (var j = 0; j < str.length; j++) {
                                stringArray.push(str[j]);
                                console.log(stringArray);
                                $scope.sword = [];
                                $scope.sword = shuffle(stringArray);
                           }
                           $scope.scrambledWord.push(' ');
                           for (var m = 0; m < str.length; m++) {
                               $scope.scrambledWord.push($scope.sword[m]);
                           }
                           stringArray = [];
                           console.log($scope.scrambledWord);
                        };
                        $scope.scrambledWord.splice(0, 1);
                    } else {
                        for(var i = 0; i < $scope.wordLength; i++) {
                            $scope.wordArray.push($scope.word[i]);
                            $scope.scrambledWord = shuffle($scope.wordArray);
                        }
                    }

                    function shuffle(array) {
                        var counter = array.length, temp, index;

                        // While there are elements in the array
                        while (counter > 0) {
                            // Pick a random index
                            index = Math.floor(Math.random() * counter);

                            // Decrease counter by 1
                            counter--;

                            if (array[counter] != ' ') {
                                // And swap the last element with it
                                temp = array[counter];
                                array[counter] = array[index];
                                array[index] = temp;
                            }
                        }

                        return array;
                    }

                    $scope.unscrambledWord = [];
                    for(var k = 0;k < $scope.wordLength; k++) {
                        $scope.unscrambledWord.push($scope.word[k]);
                    }
                    console.log($scope.unscrambledWord);

                    $scope.$watchCollection('scrambledWord', function (newOrder) {
                        $scope.correctIndex = 0;
                        for(var l = 0; l < $scope.wordLength; l++) {
                            if ($scope.unscrambledWord[l] == newOrder[l]) {
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
            seconds = document.getElementById('ws-timer').innerHTML;
            seconds = parseInt(seconds, 10);

            if (seconds == 0) {
                getWord();
                var wstimer = document.getElementById('ws-timer');
                wstimer.innerHTML = $scope.originalTime;
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

        function hasNumber(word) {
            return /\d/.test(word);
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
            var wstimer = document.getElementById('ws-timer');
            wstimer.innerHTML = $scope.originalTime;
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
