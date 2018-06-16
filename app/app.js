'use strict';


// Index view App ..
angular.module('imdbApp.index', ['ngAnimate', 'ui.bootstrap', 'ngProgress']);
angular.module('imdbApp.chart', ['ngProgress', 'ngDraggable', 'googlechart']);

google.load('visualization', '1', {
    packages: ['corechart']
});

google.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['demoGraph']);
});


// Declare app level module which depends on views, and components
angular.module('imdbApp', [
    'ngRoute',
    'imdbApp.chart',
    'imdbApp.index',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    $routeProvider
        .when('/', {
            templateUrl: '/template/home.html',
            controller: 'HomeCtrl'
        })
        .when('/chart', {
            templateUrl: '/template/chart.html',
            controller: 'chartCtrl'
        })
}]);