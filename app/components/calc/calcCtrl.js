'use strict';

angular.module('calc', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/calc', {
            templateUrl: 'components/calc/calc.html',
            controller: 'CalcCtrl'
        });
    }])

    .controller('CalcCtrl', [function() {

    }]);