var app = angular.module('myApp', []);
app.controller('fitnessCtrl', function ($scope, $http) {

    $scope.init = function () {
        console.log("Init called");
        var data = {
            "userid": localStorage.getItem('userid')
        };

        var callback = function (arr) {
            console.log(arr);
            if (arr[0] != undefined) {
                alert("You have an appointment at " + arr[0].date + " on " + arr[0].time);
            }
        }

        doAJAXCall("/getAppointment.php", data, callback, callback );
    }
    
    $scope.bookAppointment = function () {

        var date = $("#txtDate").val();
        var time = $("#txtTime").val();
        var data = {
            "userid": localStorage.getItem('userid'),
            "time": time,
            "date": date
        };

        var callbackLoad = function (arr) {
            console.log(arr);
            $scope.data = arr;
            alert("You have successfully booked an appointment.");
        }

        doAJAXCall("/bookAppointment.php", data, callbackLoad, callbackLoad);
        
    }

    $scope.goTo = function (location) {
        window.location = location + ".html";
    }

    //$scope.exerciseTime = 60;
    //$scope.repetition = 10;
    //$scope.work = 2;
    //$scope.rest = 1;
    //$scope.exercise = "0";  
});

