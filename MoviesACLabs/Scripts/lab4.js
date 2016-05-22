var app = angular.module('testList', []);

app.controller('mainList', function ($scope) {
    $scope.list = [];
    $scope.listItem = {};
    $scope.listItem.name = '';
    $scope.listItem.checked = false;
    $scope.tab = 1;

    $scope.deleteItem = function (item) {
        var i = $scope.list.indexOf(item);
        $scope.list.splice(i, 1);
    };

    $scope.addItem = function () {
        var ok = true;
        for(var i = 0, len = $scope.list.length; i < len; i++) {
            if ($scope.list[i].name === $scope.listItem.name) {
                ok = false;
                break;
            }
        }
        if (ok)
        {
            $scope.list.push($scope.listItem);
            $scope.listItem = { name: '', checked: false };
            //console.log($scope.list);
        }
    };

    $scope.enableTab = function (tab) {
        $scope.tab = tab;
    };

    $scope.tabEnabled = function (tab) {
        return $scope.tab === tab;
    };

    $scope.filterFn = function (car) {
        // Do some tests

        if (car.carDetails.doors > 2) {
            return true; // this will be listed in the results
        }

        return false; // otherwise it won't be within the results
    };
    $scope.tabFilter = function (item) {
            switch($scope.tab)
            {
                case 1:
                    {
                        return true;
                        break;
                    }
                case 2:
                    {
                        return item.checked;
                        break;
                    }
                case 3:
                    {
                        return !item.checked;
                        break;
                    }
                    
            }
    }

});
