var app = angular.module('myApp', []);
app.controller('fitnessCtrl', function ($scope, $http) {

    $scope.init = function () {
        console.log("Init called");
        var callback = function (arr) {
            console.log(arr);
            $scope.data = arr;
            if ($scope.data[0] != undefined) {
                $scope.weight = $scope.data[0].weight;
                $scope.height = $scope.data[0].height;
                $scope.age = $scope.data[0].age;
                $scope.name = $scope.data[0].userid;

                $scope.$apply();
            }
        }
        var phpToRetrieve = "/getProfile.php";

        var data = {
            "userid": localStorage.getItem("userid")
        }
        doAJAXCall(phpToRetrieve, data, callback, callback);
    }
    

    $scope.goTo = function (location) {
        window.location = location + ".html";
    }
});