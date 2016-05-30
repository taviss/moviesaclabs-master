var app = angular.module('lab_test', []);

app.service("FootballService", function ($http) {

    this.getFootballers = function () {
        return $http({
            method: "GET",
            url: "/api/footballers"
        });
    }

    this.addFootballer = function (actor) {
        return $http({
            method: "POST",
            url: "/api/footballers",
            headers: { 'contentType': "application/json" },
            data: {
                "Id": 0,
                "Name": actor.name,
                "Age": actor.age,
                "Goals": actor.goals
            }
        });
    }

    this.deleteFootballer = function (id) {
        return $http({
            method: "DELETE",
            url: "api/footballers/" + id
        });
    }

    this.updateFootballer = function (actor) {
        return $http({
            method: "PUT",
            url: "api/footballers/" + actor.Id,
            data: {
                "Id": actor.Id,
                "Name": actor.Name,
                "Age": actor.Age,
                "Goals": actor.Goals
            }
        })
    }

    this.searchFootballer = function (rev) {
        return $http({
            method: "GET",
            url: "api/footballers/" + rev
        })
    }

    this.getTeams = function () {
        return $http({
            method: "GET",
            url: "/api/teams"
        });
    }

    this.getTeamsWithTwoVowels = function () {
        return $http({
            method: "GET",
            url: "/teamvowels"
        });
    }

    this.addTeam = function (award) {
        return $http({
            method: "POST",
            url: "/api/teams",
            headers: { 'contentType': "application/json" },
            data: {
                "Id": 0,
                "Name": award.name,
                "Country": award.country
            }
        });
    }

    this.deleteTeam = function (id) {
        return $http({
            method: "DELETE",
            url: "/api/teams/" + id
        });
    }

    this.updateTeam = function (award) {
        return $http({
            method: "PUT",
            url: "/api/teams/" + award.Id,
            data: {
                "Id": award.Id,
                "Name": award.Name,
                "Country": award.Country
            }
        })
    }

    this.searchTeam = function (name) {
        return $http({
            method: "GET",
            url: "api/teams/" + name
        })
    }
});

app.controller('testLab', function ($scope, FootballService) {
    $scope.list = [];
    $scope.actorList = [];
    $scope.teamsVList = [];
    $scope.listItem = {};
    $scope.listItem.name = "";
    $scope.listItem.country = "";

    $scope.iddel = 0;

    FootballService.getTeams().then(function (dataResponse) {
        $scope.list = dataResponse.data;
        //console.log($scope.list);
    });

    FootballService.getTeamsWithTwoVowels().then(function (dataResponse) {
        $scope.teamsVList = dataResponse.data;
        console.log($scope.teamsVList);
    });

    FootballService.getFootballers().then(function (dataResponse) {
        $scope.actorList = dataResponse.data;
    });

    $scope.lessThan = function (prop, val) {
        return function (item) {
            return item[prop].length < val;
        }
    };

    $scope.greaterThan = function (prop, val) {
        return function (item) {
            return item[prop].length > val;
        }
    };

    $scope.addTeam = function () {
        FootballService.addTeam($scope.listItem).then(function () {
            FootballService.getTeams().then(function (dataResponse) {
                $scope.list = dataResponse.data;
            })
        });
    };

    $scope.deleteTeam = function () {
        //console.log(item.Id);
        FootballService.deleteTeam($scope.iddel).then(function () {
            FootballService.getTeams().then(function (dataResponse) {
                $scope.list = dataResponse;
            })
        });
    };
});
