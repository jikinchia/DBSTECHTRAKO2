var app = angular.module('myApp', []);
app.controller('fitnessCtrl', function ($scope, $http) {

    $scope.login = function () {
        console.log("Login called.");

        var resetInput = function () {
            $scope.userid = "";
            $scope.password = "";
            $scope.$apply();
        }

        var callback = function (arr) {
            console.log("We received feedback");
            console.log(arr);
            if (arr[0].result == "0") {
                resetInput();
                alert("Wrong password");
                
            }
            else {
                localStorage.setItem("userid", userid);
                alert("Login successfully");
                //window.location = "homepage.html";
            }
            
        }
        var phpToRetrieve = "/login.php";

        var data = {
            "userid": $scope.userid,
            "password": $scope.password
        }
        doAJAXCall(phpToRetrieve, data, callback, callback);
    }

    $scope.signUp =  function () {
        console.log("Sign up called.");
        window.location = "signup.html";
    }

    $scope.goTo = function (location) {
        window.location = location + ".html";
    }
});