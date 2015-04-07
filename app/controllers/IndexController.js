/**
 * Created by dscott on 4/7/2015.
 */
(function() {
    var IndexController = function ($scope) {
        $scope.showMenu = false;

        $scope.menuClick = function () {
            if ($scope.showMenu == false) {
                $scope.showMenu = true;
            } else if ($scope.showMenu == true) {
                $scope.showMenu = false;
            }
        }
    };

    IndexController.$inject = ['$scope'];

    angular.module('spanishApp')
        .controller('IndexController', IndexController);
}());
