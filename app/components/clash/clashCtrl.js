'use strict';

angular.module('myApp.components', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/clash', {
            templateUrl: 'components/clash/clash.html',
            controller: 'ClashCtrl'
        });
    }])

    .controller('ClashCtrl', [function() {

    }]);