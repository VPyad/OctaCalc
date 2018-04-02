'use strict';

angular.module('clash', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/clash', {
            templateUrl: 'components/clash/clash.html',
            controller: 'ClashCtrl'
        });
    }])

    .controller('ClashCtrl', ['$scope', ClashCtrl]);

var ranges = [];
var operators = [];

const validInputChars = new RegExp('^[0-7]+$');
var digits = ['0', '1', '2', '3', '4', '5', '6', '7'];

var currentExpression = '';

function ClashCtrl($scope) {
    var userInputControl = document.getElementById('task-answer');
    var taskPresenterControl = document.getElementById('task-text');
    var answerInputControl = document.getElementById('answer-text');

    var clashTask = new ClashTask;

    InitOperatorSelector();
    InitRangeSelector();

    $scope.range = ranges;
    $scope.operator = operators;

    $scope.onGoBtnClicked = function () {
        userInputControl.value = '';
        answerInputControl.value = '';
        answerInputControl.style.border = 'solid #D3D3D3'; // #CC0000';

        clashTask.num1 = getOctalNum($scope.selectedRange.startPos, $scope.selectedRange.endPos);
        clashTask.num2 = getOctalNum($scope.selectedRange.startPos, $scope.selectedRange.endPos);
        clashTask.operator = $scope.selectedOperator.operatorName;

        var userTaskExpr = buildUserTask(clashTask);
        taskPresenterControl.textContent = userTaskExpr;

        currentExpression = buildExpression(clashTask);
    }

    userInputControl.onpaste = function (ev) {
        if (!validInputChars.test(ev.clipboardData.getData('text/plain'))) {
            ev.preventDefault();
        }
    }

    $scope.onInputBtnClicked = function ($input) {
        var fuck = '';
        userInputControl.value += $input;
    }

    $scope.onAnswerInput = function ($event) {
        var inputChar = String.fromCharCode($event.keyCode);

        if (!digits.includes(inputChar)) {
            $event.preventDefault();
        }
    }

    $scope.onDelBtnClicked = function () {
        userInputControl.value = userInputControl.value.slice(0, -1);
    }

    $scope.onCheckBtnClicked = function () {
        var answer = calculate(currentExpression);
        var userAnswer = userInputControl.value;

        answerInputControl.value = answer;

        if (userAnswer === answer) {
            answerInputControl.style.border = 'solid #00FF00';
        } else {
            answerInputControl.style.border = 'solid #FF0000';
        }
    }
}

function RangeSelector() {
    this.startPos = 0;
    this.endPos = 0;
    this.id = 0;
    this.alias = '';
}

function OperatorSelector() {
    this.operatorName = '';
    this.alias = '';
}

function ClashTask() {
    this.num1 = '';
    this.num2 = '';
    this.operator = '';
}

function InitRangeSelector() {
    var range1 = new RangeSelector;
    range1.startPos = 0;
    range1.endPos = 10;
    range1.id = 0;
    range1.alias = '0 — 10';

    var range2 = new RangeSelector;
    range2.startPos = 0;
    range2.endPos = 20;
    range2.id = 1;
    range2.alias = '0 — 20';

    var range3 = new RangeSelector;
    range3.startPos = 0;
    range3.endPos = 100;
    range3.id = 2;
    range3.alias = '0 — 100';

    ranges.push(range1);
    ranges.push(range2);
    ranges.push(range3);
}

function InitOperatorSelector() {
    var operator1 = new OperatorSelector;
    operator1.operatorName = 'plus';
    operator1.alias = '+';

    var operator2 = new OperatorSelector;
    operator2.operatorName = 'minus';
    operator2.alias = '-';

    operators.push(operator1);
    operators.push(operator2);
}

function buildExpression(clashTask) {
    var str = '(';

    str += buildParser(clashTask.num1);

    switch (clashTask.operator) {
        case 'plus':
            str += ' + ';
            break;
        case 'minus':
            str += ' - ';
            break;
    }

    str += buildParser(clashTask.num2);
    str += ').toString(8)';

    return str;
}

function buildUserTask(clashTask) {
    var str = '';
    str += clashTask.num1.toString();

    switch (clashTask.operator) {
        case 'plus':
            str += ' + ';
            break;
        case 'minus':
            str += ' - ';
            break;
    }

    str += clashTask.num2 + ' =';

    return str;
}


// TODO Refactor: method duplicates in calcTestHelper
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO Refactor: method duplicates in calcTestHelper
function getOctalNum(min, max) {
    var num = getRandomInt(min, max);

    while ((num.toString().indexOf('8') > -1) || (num.toString().indexOf('9') > -1)) {
        num = getRandomInt(min, max);
    }

    return num;
}

// TODO Refactor: method duplicates in calcCtrl
function buildParser(num) {
    var s = 'parseInt(' + num + ', 8)';
    return s;
}

// TODO Refactor: method duplicates in calcCtrl
function calculate(expr) {
    return eval(expr);
}