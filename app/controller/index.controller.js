/**
 * Created by ali on 08.08.2016.
 */
'use strict';

angular.module('imdbApp.index')
    .controller('HomeCtrl', ['$scope', 'IndexService', 'ngProgressFactory', function ($scope, IndexService, ngProgressFactory) {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('grey');
        /**
         * Progress Bar Loading Page Reflesh and Pagination reflesh.
         */
        $scope.progressbar.start();
        $scope.progressbar.complete();
        /**
         *  ----
         *  **/
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.bigTotalItems = 0;
        $scope.bigCurrentPage = 1;
        $scope.boolen = false;
        $scope.genres = '';
        $scope.yearStart = 1983;
        $scope.yearFinish = 2004;

        var query = '{"query":{"bool":{"must":[{"range":{"Title":{"gt":"'+(($scope.currentPage * 10) - 10)+'","lt":"'+($scope.currentPage * 10)+'"}}},{"range":{"Year":{"gt":"1983","lt":"2004"}}}],"must_not":[{"term":{"Genre":""}}],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}';
        /**
         * Standart Query.. Home Query
         * **/
        $scope.getData = function(query) {
            IndexService.getElasticData(query)
                .success(function (data) {
                    $scope.imdbMovies = data;
                    $scope.bigTotalItems = data.hits.total;
                });
        };
        $scope.getData(query);

        /**
         * Pagination li change
         * **/
        $scope.pageChanged = function () {
            $scope.progressbar.start();

            if($scope.boolen == true)
                query = '{"query":{"bool":{"must":[{"range":{"Title":{"gt":"'+(($scope.currentPage * 10) - 10)+'","lt":"'+($scope.currentPage * 10)+'"}}},{"fuzzy":{"Genre":{"value":"'+$scope.genres+'"}}},{"range":{"Year":{"gt":"'+$scope.yearStart+'","lt":"'+$scope.yearFinish+'"}}}],"must_not":[],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}';
            else
                query = '{"query":{"bool":{"must":[{"range":{"Title":{"gt":"'+(($scope.currentPage * 10) - 10)+'","lt":"'+($scope.currentPage * 10)+'"}}},{"range":{"Year":{"gt":"'+$scope.yearStart+'","lt":"'+$scope.yearFinish+'"}}}],"must_not":[{"term":{"Genre":""}}],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}';
            $scope.getData(query);

            $scope.progressbar.complete();
        };

        /**
         * Category Change
         * **/
        $scope.setGenre = function (genre) {
            $scope.progressbar.start();

            $scope.genre = angular.copy(genre);
            if(genre != false) {
                $scope.boolen = true;
                $scope.genres = genre;
                $scope.currentPage = 1;
                query = '{"query":{"bool":{"must":[{"range":{"Title":{"gt":"'+(($scope.currentPage * 10) - 10)+'","lt":"'+($scope.currentPage * 10)+'"}}},{"fuzzy":{"Genre":{"value":"'+genre+'"}}},{"range":{"Year":{"gt":"'+$scope.yearStart+'","lt":"'+$scope.yearFinish+'"}}}],"must_not":[],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}';

                $scope.getData(query);
            }
            else {
                $scope.boolen = false;
                $scope.currentPage = 1;

                query = '{"query":{"bool":{"must":[{"range":{"Title":{"gt":"'+(($scope.currentPage * 10) - 10)+'","lt":"'+($scope.currentPage * 10)+'"}}},{"range":{"Year":{"gt":"'+$scope.yearStart+'","lt":"'+$scope.yearFinish+'"}}}],"must_not":[{"term":{"Genre":""}}],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}';
                $scope.getData(query);
            }

            $scope.progressbar.complete();
        };
        /**
         * Slider Year Data
         * **/
        $scope.getDataSlider = function (yearStart, yearFinish) {
            $scope.progressbar.start();

            $scope.yearStart = angular.copy(yearStart);
            $scope.yearFinish = angular.copy(yearFinish);

            if($scope.boolen == true)
                query = '{"query":{"bool":{"must":[{"range":{"Title":{"gt":"'+(($scope.currentPage * 10) - 10)+'","lt":"'+($scope.currentPage * 10)+'"}}},{"fuzzy":{"Genre":{"value":"'+$scope.genres+'"}}},{"range":{"Year":{"gt":"'+$scope.yearStart+'","lt":"'+$scope.yearFinish+'"}}}],"must_not":[],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}';
            else
                query = '{"query":{"bool":{"must":[{"range":{"Title":{"gt":"'+(($scope.currentPage * 10) - 10)+'","lt":"'+($scope.currentPage * 10)+'"}}},{"range":{"Year":{"gt":"'+$scope.yearStart+'","lt":"'+$scope.yearFinish+'"}}}],"must_not":[{"term":{"Genre":""}}],"should":[]}},"from":0,"size":10,"sort":[],"aggs":{}}';
            $scope.getData(query);

            $scope.progressbar.complete();
        };

        $scope.getSearchData = function (data) {
            $scope.progressbar.start();

            $scope.search = angular.copy(data);
            var searchQuery = '{"query":{"bool":{"must":[{"fuzzy":{"Title":{"value":"'+$scope.search+'"}}}],"must_not":[],"should":[]}},"from":0,"size":4,"sort":[],"aggs":{}}';
            IndexService.getElasticData(searchQuery)
                .success(function (data) {
                    $scope.searchMovies = data;
                });
            if(!$scope.search) {
                $scope.getData(query);
            }
            $scope.progressbar.complete();
        };

        $scope.getSearchDataClick = function () {
            $scope.imdbMovies = $scope.searchMovies;
            $scope.bigTotalItems = 1;
        };

    }]);

