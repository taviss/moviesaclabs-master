var app = angular.module('movies', []);

app.service("MoviesService", function ($http) {

    this.getActors = function () {
        return $http({
            method: "GET",
            url: "/api/actors"
        });
    }

    this.addActor = function (actor) {
        return $http({
            method: "POST",
            url: "/api/actors",
            headers: {'contentType': "application/json"},
            data: {
                    "Id": 0,
                    "Name": actor.name,
                    "DateOfBirth": actor.dob,
                    "Revenue": actor.revenue
            }
        });
    }

    this.deleteActor = function (id) {
        return $http({
            method: "DELETE",
            url: "api/actors/" + id
        });
    }

    this.updateActor = function (actor) {
        return $http({
            method: "PUT",
            url: "api/actors/" + actor.Id,
            data: {
                "Id": actor.Id,
                "Name": actor.Name,
                "DateOfBirth": actor.DateOfBirth,
                "Revenue": actor.Revenue
            }
        })
    }

    this.getMovies = function () {
        return $http({
            method: "GET",
            url: "/api/movies"
        });
    }

    this.addMovie = function (movie) {
        return $http({
            method: "POST",
            url: "/api/movies",
            headers: { 'contentType': "application/json" },
            data: {
                "Id": 0,
                "Title": movie.Title,
                "Description": movie.Description
            }
        });
    }

    this.deleteMovie = function (id) {
        return $http({
            method: "DELETE",
            url: "api/movies/" + id
        });
    }

    this.updateMovie = function (movie) {
        return $http({
            method: "PUT",
            url: "api/movies/" + movie.Id,
            data: {
                "Id": movie.Id,
                "Title": movie.Title,
                "Description": movie.Description
            }
        })
    }
});

app.controller('mainMov', function ($scope, MoviesService) {
    $scope.list = [];
    $scope.listItem = {};
    $scope.listItem.title = "";
    $scope.listItem.desc = "";
    $scope.count = 0;
    $scope.editorStatus = 0;

    MoviesService.getActors().then(function (dataResponse) {
        $scope.list = dataResponse.data;
    });

    $scope.deleteItem = function (item) {
        console.log(item.Id);
        MoviesService.deleteMovie(item.Id).then(function () {
            MoviesService.getMovies().then(function (dataResponse) {
                $scope.list = dataResponse;
            })
        });
    };

    $scope.editorEnabled = function (item) {
        return ($scope.editorStatus == item.Id ? 1 : 0);
    }

    $scope.editItem = function (item) {
        $scope.editorStatus = item.Id;
    }

    $scope.saveItem = function (item) {
        MoviesService.updateMovie(item).then(function () {
            MoviesService.getMovies().then(function (dataResponse) {
                $scope.list = dataResponse.data;
            })
        });
        $scope.editorStatus = 0;
    }

    $scope.addItem = function () {
        MoviesService.addMovie($scope.listItem).then(function () {
            MoviesService.getMovies().then(function (dataResponse) {
                $scope.list = dataResponse.data;
            })
        });
    };
});
