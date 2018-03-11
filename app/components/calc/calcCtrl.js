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

const legalInputChars = new RegExp('^(\\d+[\\+\\-\\*\\/]{1})+\\d+$'); //^[-+]?[0-9]+([-+*/]+[-+]?[0-9]+)*$
var digits = ['0', '1', '2', '3', '4', '5', '6', '7'];
var operators = ['+', '-', '*', '/'];

function CalcCtrl($scope) {
    var inputCalcControl = document.getElementById('print');

    inputCalcControl.onpaste = function (ev) {
        if (!legalInputChars.test(ev.clipboardData.getData('text/plain'))) {
            ev.preventDefault();
            // show error
        }
    }

    $scope.onCalcInput = function ($event) {
        var inputChar = String.fromCharCode($event.keyCode);
        var lastCharOfInput = inputCalcControl.value.slice(-1);

        if (!(digits.includes(inputChar) || (operators.includes(inputChar) && !operators.includes(lastCharOfInput)))) {
            $event.preventDefault();
        }
    }

    $scope.onInputBtnClicked = function ($input) {
        var lastCharOfInput = inputCalcControl.value.slice(-1);
        if (operators.includes($input)) {
            if (operators.includes(lastCharOfInput)) { // last char is operator → remove last operator and insert current
                inputCalcControl.value = inputCalcControl.value.slice(0, -1);
                inputCalcControl.value += $input;
            } else {
                inputCalcControl.value += $input;
            }
        } else if (digits.includes($input)) {
            inputCalcControl.value += $input;
        } // else → unknown input
    }

    $scope.onServiceBtnClicked = function ($input) {
        switch ($input) {
            case 'C': // find index of last operator, remove from this index to end of string
                var indx = [];

                operators.forEach(function (operator) {
                    indx.push(inputCalcControl.value.lastIndexOf(operator))
                });

                var i = indx.sort()[indx.length - 1];

                inputCalcControl.value = inputCalcControl.value.substring(0, i);

                break;
            case 'CE':
                inputCalcControl.value = '';
                break;
            case 'Del':
                inputCalcControl.value = inputCalcControl.value.slice(0, -1);
                break;
            case '=':
                break;
        }
    }
}