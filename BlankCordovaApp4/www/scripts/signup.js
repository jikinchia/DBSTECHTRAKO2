var app = angular.module('myApp', []);
app.controller('fitnessCtrl', function ($scope, $http) {

    var checkInputCorrectness = function () {
        if (!isWholeNumber($scope.age)) {
            alert("Age is not whole number");
            return false;
        }
        return true;
    }
    $scope.register =  function () {
        console.log("Register called.");

        var url = serverURL() + "/user_register.php";
        var data = {
            "userid": $scope.userid,
            "password": $scope.password,
            "email": $scope.email,
            "description": $scope.description,
            "weight": $scope.weight,
            "height": $scope.height,
            "age" : $scope.age
        };

        var headers = {
            'identity': 'table0',
            'token': 'TESTTOKEN'
        };

        var options = {
            url: 'https://techtrek-api-gateway.cfapps.io/customers/:userName',
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }

        request(options, callback);
        var callback = function ( arr ) {
            if (arr[0].result == "0") {

                    $.ajax({
                        url: url,
                        type: 'GET',
                        data: data,
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        success: function (arr) {
                            window.location = "index.html";
                            alert("Successfully registered. Please continue");
                        },
                        error: function () {
                            window.location = "index.html";
                            return;
                        }
                    });

                
            }
            else {
                alert("There is a user with same userid. Please choose another userid");
            }
        }
        if (checkInputCorrectness())
            doAJAXCall("/checkUser.php", data , callback , callback);
        
        
    }
});