/**
 * Created by dscott on 3/13/2015.
 */
(function() {
    var VerbConjugatorController = function ($scope, $state, verbsFactory) {

        $scope.numberQuestions = 0;
        $scope.showIntroduction = true;
        $scope.showQuestions = false;
        $scope.showTimer = false;
        $scope.originalTime = $scope.timerTime;
        $scope.cardsCorrect = 0;
        $scope.index = 0;

        $scope.verbTense = undefined;

        function getVerb() {
            verbsFactory.getVerbs()
                .success(function (data) {
                    $scope.verbInfo = data.verbs;

                    var expression = "$..infinitive";

                    $scope.verbList = JSONPath({json: $scope.verbInfo, path: expression});

                    $scope.verbListLength = $scope.verbList.length;

                    $scope.verbNumber = Math.floor((Math.random() * $scope.verbListLength) + 1);


                    $scope.verb = $scope.verbList[$scope.verbNumber];

                    expression = "$..[?(@.infinitive=='" + $scope.verb + "')].translation";
                    $scope.translation = "[ " + JSONPath({json: $scope.verbInfo, path: expression})[0] + " ]";

                    expression = "$..[?(@.infinitive=='" + $scope.verb + "')].";
                    expression += $scope.verbTense;

                    tenses = JSONPath({json: $scope.verbInfo, path: expression})[0];

                    $scope.yoAnswer = tenses.yo;
                    $scope.tuAnswer = tenses.tu;
                    $scope.elAnswer = tenses.el;
                    $scope.nosotrosAnswer = tenses.nosotros;
                    $scope.ellosAnswer = tenses.ellos;
                });
        }

        function countdown() {
            seconds = document.getElementById('vc-timer').innerHTML;
            seconds = parseInt(seconds, 10);

            if (seconds == 0) {
                nextQuestion();
                var vctimer = document.getElementById('vc-timer');
                vctimer.innerHTML = $scope.originalTime;
                countdown();
                return;
            }

            seconds--;
            temp = document.getElementById('vc-timer');
            temp.innerHTML = seconds;
            timeoutMyOswego = setTimeout(countdown, 1000);
        }

        function nextQuestion() {
            if ($scope.index < $scope.numberQuestions) {
                getVerb();

                $scope.numberCorrect = 0;
                if($scope.yoAnswer == $scope.yoInput) {
                    $scope.numberCorrect++;
                }
                if($scope.tuAnswer == $scope.tuInput) {
                    $scope.numberCorrect++;
                }
                if($scope.elAnswer == $scope.elInput) {
                    $scope.numberCorrect++;
                }
                if($scope.nosotrosAnswer == $scope.nosotrosInput) {
                    $scope.numberCorrect++;
                }
                if($scope.ellosAnswer == $scope.ellosInput) {
                    $scope.numberCorrect++;
                }

                if ($scope.numberCorrect == 5) {
                    $scope.cardsCorrect++;
                }

                $scope.index++;
            }
        }

        $scope.continue = function() {
            $scope.showIntroduction = false;
            $scope.showQuestions = true;

            if ($scope.timerTime != undefined && $scope.timerTime > 0) {
                $scope.showTimer = true;
                $scope.originalTime = $scope.timerTime;
                countdown();
            }
            getVerb();
        };

        $scope.submit = function() {
            var vctimer = document.getElementById('vc-timer');
            vctimer.innerHTML = $scope.originalTime;
            nextQuestion();

            $scope.yoInput = '';
            $scope.tuInput = '';
            $scope.elInput = '';
            $scope.nosotrosInput = '';
            $scope.ellosInput = '';
        };

        function getCaretPosition (oField) {

            // Initialize
            var iCaretPos = 0;

            // IE Support
            if (document.selection) {

                // Set focus on the element
                oField.focus ();

                // To get cursor position, get empty selection range
                var oSel = document.selection.createRange ();

                // Move selection start to 0 position
                oSel.moveStart ('character', -oField.value.length);

                // The caret position is selection length
                iCaretPos = oSel.text.length;
            }

            // Firefox support
            else if (oField.selectionStart || oField.selectionStart == '0')
                iCaretPos = oField.selectionStart;

            // Return results
            return (iCaretPos);
        }

        $scope.accentClick = function(textBox, char) {
            var inputBox = document.getElementById(textBox);

            var currentPosition = getCaretPosition(inputBox);

            var originalValue = inputBox.value;

            var newValue = originalValue.substr(0, currentPosition) + char + originalValue.substr(currentPosition);

            inputBox.value = newValue;
        };

        $scope.reset = function() {
            $state.go($state.$current, null, { reload: true});
        };
    };

    VerbConjugatorController.$inject = ['$scope', '$state', 'verbsFactory'];

    angular.module('spanishApp')
        .controller('VerbConjugatorController', VerbConjugatorController);
}());