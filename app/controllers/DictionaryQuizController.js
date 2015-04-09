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

        function getQuestion() {
            dictionaryFactory.getDictionary()
                .success(function (data) {
                    $scope.dictionaryInfo = data.dictionary;

                    var expression = "$..word";
                    $scope.words = JSONPath({json: $scope.dictionaryInfo, path: expression});

                    expression = "$..translation";
                    $scope.selections = JSONPath({json: $scope.dictionaryInfo, path: expression});

                    $scope.dictionaryLength = $scope.words.length;

                    $scope.wordNumber = Math.floor((Math.random() * $scope.dictionaryLength) + 1);

                    $scope.word = $scope.words[$scope.wordNumber];
                    $scope.answer = $scope.selections[$scope.wordNumber];

                    $scope.selectionList = [];

                    $scope.selectionList.push($scope.answer);
                    for (var i = 1; i < 6; i++) {
                        $scope.selectionList.push($scope.selections[Math.floor((Math.random() * $scope.dictionaryLength) + 1)]);
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
                timer.innerHTML = $scope.originalTime;
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
            dq-timer.innerHTML = $scope.originalTime;
            if ($scope.index < $scope.numberQuestions) {
                if ($scope.answer == $scope.sel) {
                    $scope.numberCorrect++;
                }
                getQuestion();

                $scope.index++;
            }
        }

        $scope.reset = function() {
            $scope.numberCorrect = 0;
            $scope.numberQuestions = 0;
            getQuestion();
        }
    }

    DictionaryQuizController.$inject = ['$scope', '$state', 'dictionaryFactory'];

    angular.module('spanishApp')
        .controller('DictionaryQuizController', DictionaryQuizController);
}());
