'use strict';

angular.module('test', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/test', {
            templateUrl: 'components/test/test.html',
            controller: 'TestCtrl'
        });
    }])

    .controller('TestCtrl', [function() {

    }]);