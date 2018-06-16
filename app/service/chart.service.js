/**
 * Created by ali on 17.08.2016.
 */
'use strict';

angular.module('imdbApp.chart')
    .service('chartService', ['$http', function ($http) {
        var chartService = {};
        var baseUrl = 'http://localhost:9200/imdb_movie/_search/';

        chartService.getElasticData = function (query) {
          return $http.post(baseUrl, query);
        };

        return chartService;
    }]);