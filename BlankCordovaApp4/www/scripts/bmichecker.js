var app = angular.module('myApp', []);
app.controller('fitnessCtrl', function ($scope, $http) {
    $scope.bmi = 0;

    $scope.checker = true;
    var calcForWomen = function () {
        return 655 + (9.6 * parseFloat($scope.weight)) + (1.8 * parseFloat($scope.height) * 100) - (4.7 * parseFloat($scope.age));
    }

    var calcForMan = function () {
        return 66 + (13.7 * parseFloat($scope.weight)) + (5 * parseFloat($scope.height) * 100) - (6.8 * parseFloat($scope.age));
    }

    var exerciseFreqNeeds = function (BMR, freq) {
        var multiplier = [1.2, 1.375, 1.55, 1.725, 1.9];
        return BMR * multiplier[freq];
    }

    var calcNoOfDays = function (difference) {
        
        var caloriesInKg = 0.064;
        var noOfDays = Math.abs(difference) / caloriesInKg; 

        return noOfDays;
    }

    $scope.back = function () {
        $scope.checker = true;
    }

    $scope.height = 1.7;
    $scope.weight = 65;
    $scope.age = 6;
    $scope.dWeight = 60;
    $scope.gender = "F";
    $scope.frequency = "0";
    $scope.calculate = function () {

        
        $scope.bmi = parseFloat($scope.weight / (($scope.height) * ($scope.height))).toFixed(2);
        //theChart.series[0].data = getData(parseInt($scope.bmi));
        if ($scope.bmi < 18.5) {
            $scope.results = "Underweight";
        }
        else if ($scope.bmi < 24.99) {
            $scope.results = "Normal Weight";
        }
        else if ($scope.bmi < 29.99) {
            $scope.results = "Overweight";
        }
        else if ($scope.bmi < 34.99) {
            $scope.results = 'Obese (class 1)';
        }
        else if ($scope.bmi < 39.99) {
            $scope.results = 'Obese (class 2)';
        }
        else {
            $scope.results = "Morbidly Obese";
        }

        $scope.bmr = $scope.gender == "M" ? calcForMan() : calcForWomen();
        $scope.bmr = parseFloat($scope.bmr).toFixed(2);
        $scope.mWeight = parseFloat(exerciseFreqNeeds($scope.bmr, $scope.frequency)).toFixed(2);
        $scope.tWeight = Math.abs(parseFloat($scope.dWeight) - parseFloat($scope.weight));
        $scope.noOfDays = parseInt(calcNoOfDays($scope.tWeight));
        $scope.checker = false;
    }
    $scope.goTo = function (location) {
        window.location = location + ".html";
    }
});
