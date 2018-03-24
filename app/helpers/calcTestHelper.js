/*
    Helper class that generate random expression for calculator Unit Test.

    printJsonExpr(amount_of_expr) method return JSON of "expr" - "answer" objects. Answer field is empty, you should use third-party calculators
    for expression calculation. Obtained JSON used as input for Unit Tests;

    Third party calcs:
    1) https://planetcalc.ru/2096/
    2) whatever you want
*/

'use strict';

var helper = angular.module('helpers.calcTestHelper', []);

helper.factory('helpers.calcTestHelper', calcTestHelper);

function calcTestHelper() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function isOdd(num) {
        return num & 1;
    }

    function getOctalNum(min, max) {
        var num = getRandomInt(min, max);

        while ((num.toString().indexOf('8') > -1) || (num.toString().indexOf('9') > -1)) {
            num = getRandomInt(min, max);
        }

        return num;
    }

    var operators = ['+', '-', '*', '/'];

    function printExpr(amount) {
        for (var i = 0; i < amount; i++) {
            var expr = '';

            var maxOperation = getRandomInt(5, 15);
            if (!isOdd(maxOperation)) {
                maxOperation += 1;
            }

            for (var n = 3; n <= maxOperation; n++) {
                if (isOdd(n)) {
                    expr += getOctalNum(0, 1024);
                } else {
                    expr += operators[getRandomInt(0, 3)];
                }
            }

            console.log(expr);
        }
    }

    function printJsonExpr(amount) {
        var json = [];

        for (var i = 0; i < amount; i++) {
            var expr = '';

            var maxOperation = getRandomInt(5, 15);
            if (!isOdd(maxOperation)) {
                maxOperation += 1;
            }

            for (var n = 3; n <= maxOperation; n++) {
                if (isOdd(n)) {
                    expr += getOctalNum(0, 1024);
                } else {
                    expr += operators[getRandomInt(0, 3)];
                }
            }

            json.push({'expr': expr, 'answer': ''});
        }

        return JSON.stringify(json);
    }

    var service = {
        getRandomInt: getRandomInt,
        isOdd: isOdd,
        getOctalNum: getOctalNum,
        printExpr: printExpr,
        printJsonExpr: printJsonExpr
    };

    return service;
}