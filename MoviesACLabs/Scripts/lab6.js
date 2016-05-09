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
            headers: { 'contentType': "application/json" },
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

    this.getAwards = function () {
        return $http({
            method: "GET",
            url: "/api/awards"
        });
    }

    this.addAward = function (award) {
        return $http({
            method: "POST",
            url: "/api/awards",
            headers: { 'contentType': "application/json" },
            data: {
                "Id": 0,
                "Name": award.name,
                "ActorId": award.actorId,
                "Description": award.desc
            }
        });
    }

    this.deleteAward = function (id) {
        return $http({
            method: "DELETE",
            url: "api/awards/" + id
        });
    }

    this.updateAward = function (award) {
        return $http({
            method: "PUT",
            url: "api/awards/" + award.Id,
            data: {
                "Id": award.Id,
                "Name": award.Name,
                "Description": award.Description,
                "ActorId": award.ActorId
            }
        })
    }
});

app.controller('mainMov', function ($scope, MoviesService) {
    $scope.list = [];
    $scope.actorList = [];
    $scope.listItem = {};
    $scope.listItem.name = "";
    $scope.listItem.actorId = 0;
    $scope.listItem.desc = "None";
    $scope.count = 0;
    $scope.editorStatus = 0;

    MoviesService.getAwards().then(function (dataResponse) {
        $scope.list = dataResponse.data;
    });

    MoviesService.getActors().then(function (dataResponse) {
        $scope.actorList = dataResponse.data;
    })

    $scope.clearInput = function () {
        if ($scope.listItem.name == 'Enter data...') $scope.listItem.name = '';
    };

    $scope.resetInput = function () {
        if ($scope.listItem.name == '') $scope.listItem.name = 'Enter data...';
    };

    $scope.deleteItem = function (item) {
        console.log(item.Id);
        MoviesService.deleteAward(item.Id).then(function () {
            MoviesService.getAwards().then(function (dataResponse) {
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
        MoviesService.updateAward(item).then(function () {
            MoviesService.getAwards().then(function (dataResponse) {
                $scope.list = dataResponse.data;
            })
        });
        $scope.editorStatus = 0;
    }

    $scope.addItem = function () {
        MoviesService.addAward($scope.listItem).then(function () {
            MoviesService.getAwards().then(function (dataResponse) {
                $scope.list = dataResponse.data;
            })
        });
    };
});
