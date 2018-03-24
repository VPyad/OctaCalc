'use strict';

angular.module('welcome', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'components/welcome/welcome.html',
            controller: 'WelcomeCtrl'
        });
    }])

    .controller('WelcomeCtrl', [function() {
        //window.alert('!!!');
    }]);