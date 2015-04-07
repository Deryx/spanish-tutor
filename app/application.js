/**
 * Created by dscott on 2/16/2015.
 */

(function() {
    var app = angular.module('spanishApp', ['ui.router', 'ui.sortable']);

    app.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home.html',
                controller: 'HomeController'
            });
        $stateProvider
            .state('word-completion', {
                url: '/word-completion',
                templateUrl: 'app/views/wordCompletion.html',
                controller: 'WordCompletionController'
            });
        $stateProvider
            .state('word-scramble', {
                url: '/word-scramble',
                templateUrl: 'app/views/wordScramble.html',
                controller: 'WordScrambleController'
            });
        $stateProvider
            .state('dictionary-flashcard', {
                url: '/dictionary-flashcard',
                templateUrl: 'app/views/dictionaryFlash.html',
                controller: 'DictionaryCardController'
            });
        $stateProvider
            .state('verb-flashcard', {
                url: '/verb-flashcard',
                templateUrl: 'app/views/verbflash.html',
                controller: 'VerbCardController'
            });
        $stateProvider
            .state('vocab-slider', {
                url: '/vocab-slider',
                templateUrl: 'app/views/vocabSlider.html',
                controller: 'VocabSliderController'
            });
        $stateProvider
            .state('vocab-quiz', {
                url: '/vocab-quiz',
                templateUrl: 'app/views/dictionaryQuiz.html',
                controller: 'DictionaryQuizController'
            });
        $stateProvider
            .state('verb-conjugator', {
                url: '/verb-conjugator',
                templateUrl: 'app/views/verbConjugator.html',
                controller: 'VerbConjugatorController'
            });

        $urlRouterProvider.otherwise('/');
    });
}());
