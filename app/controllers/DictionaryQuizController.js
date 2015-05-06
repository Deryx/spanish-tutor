/**
 * Created by dscott on 3/10/2015.
 */
(function() {
    var DictionaryQuizController = function ($scope, $state, dictionaryFactory) {

        $scope.numberQuestions = 0;
        $scope.numberCorrect = 0;
        $scope.showIntroduction = true;
        $scope.showQuestions = false;
        $scope.showTimer = false;
        $scope.originalTime = $scope.timerTime;
        $scope.index = 0;

        $scope.flipToggle = false;


        function getQuestion() {
            dictionaryFactory.getDictionary()
                .success(function (data) {
                    $scope.dictionaryInfo = data.dictionary;

                    var expression = "$..word";
                    $scope.words = JSONPath({json: $scope.dictionaryInfo, path: expression});

                    expression = "$..translation";
                    $scope.selections = JSONPath({json: $scope.dictionaryInfo, path: expression});

                    $scope.dictionaryLength = $scope.words.length;
                    console.log($scope.dictionaryLength);

                    $scope.wordNumber = Math.floor((Math.random() * $scope.dictionaryLength) + 1);

                    $scope.word = $scope.words[$scope.wordNumber];

                    $scope.answer = $scope.selections[$scope.wordNumber];
                    word = $scope.answer;
                    if (hasNumber(word)) {
                        word = word.substr(0, word.length - 2);
                    }
                    $scope.answer = word;

                    $scope.selectionList = [];

                    $scope.selectionList.push($scope.answer);
                    for (var i = 1; i < 6; i++) {
                        var selection = $scope.selections[Math.floor((Math.random() * $scope.dictionaryLength) + 1)];
                        for (var j = 2; j < i; j++) {
                            if (selection == $scope.selectionList[j] || selection == 0) {
                                selection = $scope.selections[Math.floor((Math.random() * $scope.dictionaryLength) + 1)];
                            }
                        }
                        word = selection;
                        if (hasNumber(word)) {
                            word = word.substr(0, word.length - 2);
                        }
                        selection = word;
                        $scope.selectionList.push(selection);
                    }

                    function hasNumber(word) {
                        return /\d/.test(word);
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

                    $scope.selectionList = shuffle($scope.selectionList);
                })
        };

        function countdown() {
            seconds = document.getElementById('dq-timer').innerHTML;
            seconds = parseInt(seconds, 10);

            if (seconds == 0) {
                getQuestion();
                var dqtimer = document.getElementById('dq-timer');
                dqtimer.innerHTML = $scope.originalTime;
                if ($scope.index < $scope.numberQuestions) {
                    countdown();
                    $scope.index++;
                }
                return;
            }

            seconds--;
            temp = document.getElementById('dq-timer');
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
                getQuestion();
            }
        };

        $scope.submit = function() {
            var dqtimer = document.getElementById('dq-timer');
            dqtimer.innerHTML = $scope.originalTime;
            if ($scope.index < $scope.numberQuestions) {
                $scope.newCard = false;
                if ($scope.answer == $scope.sel) {
                    $scope.numberCorrect++;
                }

                $scope.index++;

                if ($scope.index < $scope.numberQuestions) {
                    getQuestion();
                }
            }
        }

        $scope.reset = function() {
            $state.reload();
        }
    }

    DictionaryQuizController.$inject = ['$scope', '$state', 'dictionaryFactory'];

    angular.module('spanishApp')
        .controller('DictionaryQuizController', DictionaryQuizController);
}());
