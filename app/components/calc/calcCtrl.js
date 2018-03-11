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

    .controller('CalcCtrl', ["$scope", CalcCtrl]);

//const legalInputChars = new RegExp('^(\\d+[\\+\\-\\*\\/]{1})+\\d+$'); //^[-+]?[0-9]+([-+*/]+[-+]?[0-9]+)*$
var digits = ['0', '1', '2', '3', '4', '5', '6', '7'];
var operators = ['+', '-', '*', '/'];

function CalcCtrl($scope) {
    $scope.onCalcInput = function ($event) {
        var inputChar = String.fromCharCode($event.keyCode);
        var inputCalcControl = document.getElementById('print');
        var lastCharOfInput = inputCalcControl.value.slice(-1);

        if (!(digits.includes(inputChar) || (operators.includes(inputChar) && !operators.includes(lastCharOfInput)))) {
            $event.preventDefault();
        }
    }
}