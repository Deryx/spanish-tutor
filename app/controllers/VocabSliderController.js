/**
 * Created by dscott on 3/5/2015.
 */
(function() {
    var VocabSliderController = function ($scope, $state, dictionaryFactory, timerFactory) {
        $scope.showIntroduction = true;
        $scope.showCards = false;
        $scope.showAnswers = false;
        $scope.numberSets = 0;
        $scope.showTimer = false;
        $scope.originalTime = $scope.timerTime;
        $scope.index = 0;

        function getCards() {
            dictionaryFactory.getDictionary()
                .success(function (data) {
                    $scope.dictionaryInfo = data.dictionary;

                    var expression = "$..translation";

                    $scope.translations = JSONPath({json: $scope.dictionaryInfo, path: expression});
                    $scope.translationsLength = $scope.translations.length;

                    expression = "$..word";
                    $scope.words = JSONPath({json: $scope.dictionaryInfo, path: expression});

                    expression = "$..image";
                    $scope.images = JSONPath({json: $scope.dictionaryInfo, path: expression});

                    $scope.wordArray = [];

                    for (var i = 0; i < 6; i++) {
                        $scope.wordArray[i] = Math.floor((Math.random() * $scope.translationsLength) + 1);
                    }

                    $scope.selections = [];

                    $scope.translation1 = $scope.translations[$scope.wordArray[0]];
                    var word = $scope.translation1;
                    if (hasNumber(word)) {
                        word = word.substr(0, word.length - 2);
                    }
                    $scope.translation1 = word;
                    $scope.answer1 = $scope.words[$scope.wordArray[0]];
                    $scope.selections.push($scope.answer1);
                    $scope.image1 = $scope.images[$scope.wordArray[0]];

                    $scope.translation2 = $scope.translations[$scope.wordArray[1]];
                    word = $scope.translation2;
                    if (hasNumber(word)) {
                        word = word.substr(0, word.length - 2);
                    }
                    $scope.translation2 = word;
                    $scope.answer2 = $scope.words[$scope.wordArray[1]];
                    $scope.selections.push($scope.answer2);
                    $scope.image2 = $scope.images[$scope.wordArray[1]];

                    $scope.translation3 = $scope.translations[$scope.wordArray[2]];
                    var word = $scope.translation3;
                    if (hasNumber(word)) {
                        word = word.substr(0, word.length - 2);
                    }
                    $scope.translation3 = word;
                    $scope.answer3 = $scope.words[$scope.wordArray[2]];
                    $scope.selections.push($scope.answer3);
                    $scope.image3 = $scope.images[$scope.wordArray[2]];

                    $scope.translation4 = $scope.translations[$scope.wordArray[3]];
                    var word = $scope.translation4;
                    if (hasNumber(word)) {
                        word = word.substr(0, word.length - 2);
                    }
                    $scope.translation4 = word;
                    $scope.answer4 = $scope.words[$scope.wordArray[3]];
                    $scope.selections.push($scope.answer4);
                    $scope.image4 = $scope.images[$scope.wordArray[3]];

                    $scope.translation5 = $scope.translations[$scope.wordArray[4]];
                    var word = $scope.translation5;
                    if (hasNumber(word)) {
                        word = word.substr(0, word.length - 2);
                    }
                    $scope.translation5 = word;
                    $scope.answer5 = $scope.words[$scope.wordArray[4]];
                    $scope.selections.push($scope.answer5);
                    $scope.image5 = $scope.images[$scope.wordArray[4]];

                    $scope.translation6 = $scope.translations[$scope.wordArray[5]];
                    var word = $scope.translation6;
                    if (hasNumber(word)) {
                        word = word.substr(0, word.length - 2);
                    }
                    $scope.translation6 = word;
                    $scope.answer6 = $scope.words[$scope.wordArray[5]];
                    $scope.selections.push($scope.answer6);
                    $scope.image6 = $scope.images[$scope.wordArray[5]];

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

                    $scope.slideArray = [];
                    $scope.slideArray = shuffle($scope.wordArray);

                    $scope.slide1 = $scope.words[$scope.slideArray[0]];
                    $scope.slide2 = $scope.words[$scope.slideArray[1]];
                    $scope.slide3 = $scope.words[$scope.slideArray[2]];
                    $scope.slide4 = $scope.words[$scope.slideArray[3]];
                    $scope.slide5 = $scope.words[$scope.slideArray[4]];
                    $scope.slide6 = $scope.words[$scope.slideArray[5]];

                    $scope.slides = [];
                    $scope.slides.push($scope.slide1);
                    $scope.slides.push($scope.slide2);
                    $scope.slides.push($scope.slide3);
                    $scope.slides.push($scope.slide4);
                    $scope.slides.push($scope.slide5);
                    $scope.slides.push($scope.slide6);

                    $scope.results = "";
                    $scope.$watchCollection('slides', function (newSlides) {
                        var correctIndex = 0;
                        for (var i = 0; i < $scope.selections.length; i++) {
                            if ($scope.selections[i] == newSlides[i]) {
                                correctIndex++;
                            }
                        }
                        ;
                        if (correctIndex == 6) {
                            $scope.results = "Congratulations! All of your selections are correct!"
                        }
                        else {
                            $scope.results = "You have " + correctIndex + " correct selections.";
                        }
                    });
                });
        };

        function hasNumber(word) {
            return /\d/.test(word);
        }

        $scope.continue = function() {
            if ($scope.numberSets != 0) {
                $scope.showIntroduction = false;
                $scope.showCards = true;

                getCards();

                if ($scope.timerTime != undefined && $scope.timerTime > 0) {
                    $scope.showTimer = true;
                    $scope.originalTime = $scope.timerTime;
                    timerFactory.getTimer( 'vs-timer', $scope.originalTime);
                }
            }
        };

        $scope.newCards = function() {
            var vstimer = document.getElementById('vs-timer');
            vstimer.innerHTML = $scope.originalTime;
            if ($scope.index < $scope.numberSets) {
                $scope.showIntroduction = false;
                $scope.showCards = true;
                getCards();

                $scope.index++;
            }
        }

        $scope.reset = function() {
            $state.go($state.$current, null, { reload: true});
        }
    };

    VocabSliderController.$inject = ['$scope', '$state', 'dictionaryFactory', 'timerFactory'];

    angular.module('spanishApp')
        .controller('VocabSliderController', VocabSliderController);
}());
