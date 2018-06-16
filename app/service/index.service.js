/**
 * Created by ali on 10.08.2016.
 */
'use strict';

angular.module('imdbApp.index')
    .service('IndexService', ['$http', function ($http) {
        var IndexService = {};
        var baseUrl = 'http://localhost:9200/imdb_movie/_search/';

        IndexService.getElasticData = function (query) {
            return $http.post(baseUrl, query);
        };

        return IndexService;
    }]);
