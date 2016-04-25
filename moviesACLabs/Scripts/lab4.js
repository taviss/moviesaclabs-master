var app = angular.module('list', []);

app.controller('mainList', function ($scope) {
    $scope.list = [];
    $scope.listItem = {};
    $scope.listItem.name = "Enter item name";
    $scope.listItem.checked = false;
    $scope.count = 0;

    $scope.clearInput = function () {
        if ($scope.listItem.name == 'Enter item name') $scope.listItem.name = '';
    };

    $scope.resetInput = function () {
        if($scope.listItem.name == '') $scope.listItem.name = 'Enter item name';
    };

    $scope.deleteItem = function (item) {
        var i = $scope.list.indexOf(item);
        $scope.list.splice(i, 1);
    };

    $scope.addItem = function () {
        if ($scope.list.indexOf($scope.listItem) == -1) {
            $scope.list.push($scope.listItem);
            $scope.count += 1;
        }
        $scope.resetInput();
    };
});
