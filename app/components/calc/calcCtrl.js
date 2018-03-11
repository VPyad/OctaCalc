'use strict';

angular.module('calc', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/calc', {
            templateUrl: 'components/calc/calc.html',
            controller: 'CalcCtrl',
            css: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
                'bower_components/bootstrap/dist/css/bootstrap-grid.min.css',
                'components/calc/calc.css']
        });
    }])

    .controller('CalcCtrl', [function () {

    }]);