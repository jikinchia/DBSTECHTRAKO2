var app = angular.module('myApp', []);
app.controller('fitnessCtrl', function ($scope, $http) {
    $scope.checker = true;

    $scope.reps = [];
    var timePerRep = function () {
        return parseInt($scope.exerciseTime / $scope.repetition);
    }

    var workRestTime = function () {
        var rep = timePerRep();
        var repInSeconds = rep * 60;
        var totalRatio = parseInt($scope.work) + parseInt($scope.rest);
        console.log(repInSeconds);
        console.log(totalRatio);
        console.log($scope.work);
        var workTime = parseInt(repInSeconds / totalRatio * $scope.work);
        var restTime = parseInt(repInSeconds / totalRatio * $scope.rest);
        return [workTime, restTime];
    }

    $scope.loadFromCloud = function () {
        console.log("Session userid : " + localStorage.getItem('userid') ) ;
        var data = {
            "userid": localStorage.getItem('userid')
        };
        var callback = function (arr) {
            console.log(arr);
            $scope.data = arr;

            $scope.exerciseTime = parseInt($scope.data[0].time);
            $scope.repetition = parseInt($scope.data[0].rep);
            $scope.work = parseInt($scope.data[0].work);
            $scope.rest = parseInt($scope.data[0].rest);
            $scope.exercise = $scope.data[0].exercise;

            $scope.$apply();
            
        }
        doAJAXCall("/loadFromCloud.php", data, callback, callback);
    }

    
    

    var checkInputCorrectness = function () {
        if (!isWholeNumber($scope.exerciseTime)) {
            alert("Time is not whole number");
            return false;
        }
        if (!isWholeNumber($scope.repetition)) {
            alert("repetition is not whole number");
            return false;
        }
        if (!isWholeNumber($scope.work)) {
            alert("Work time is not whole number");
            return false;
        }
        if (!isWholeNumber($scope.rest)) {
            alert("Rest time is not whole number");
            return false;
        }
        return true;
    }

    $scope.saveToCloud = function () {
        if (checkInputCorrectness()) {
            var data = {
                "userid": localStorage.getItem('userid'),
                "time": parseInt($scope.exerciseTime),
                "work": parseInt($scope.work),
                "rest": parseInt($scope.rest),
                "rep": parseInt($scope.repetition),
                "exercise": $scope.exercise
            };
            var callback = function (arr) {
                console.log(arr);
            }

            var callbackLoad = function (arr) {
                console.log(arr);
                $scope.data = arr;

                if ($scope.data[0] == undefined) {
                    console.log("Save called");
                    doAJAXCall("/saveToCloud.php", data, callback, callback);
                }
                else {
                    console.log("Update called");
                    doAJAXCall("/updateToCloud.php", data, callback, callback);
                }

            }

            doAJAXCall("/loadFromCloud.php", data, callbackLoad, callbackLoad);
        }
        
    }
    
    $scope.plan = function () {
        if (checkInputCorrectness()) {
            var workRestTotalTime = workRestTime();
            $scope.reps = [];
            console.log(workRestTime());
            $scope.totalWorkTime = parseInt(workRestTotalTime[0] * parseInt($scope.repetition) / 60);
            console.log(workRestTotalTime[0] * parseInt($scope.repetition));
            $scope.totalRestTime = parseInt(workRestTotalTime[1] * parseInt($scope.repetition) / 60);
            $scope.totalHIITTime = (parseInt($scope.totalWorkTime) + parseInt($scope.totalRestTime));
            for (var x = 0; x < $scope.repetition; x++) {
                $scope.reps.push({ "rep": x + 1, "work": parseInt(workRestTotalTime[0]), "rest": parseInt(workRestTotalTime[1]) });
            }
            var exercises = ["Standing Mountain Climbers", "Push Ups", "Speed Squats", "Plank"];
            $scope.strExercise = exercises[$scope.exercise]
            console.log($scope.reps);
            $scope.checker = false;
        }
        
    }

    $scope.back = function () {
        $scope.checker = true;
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

