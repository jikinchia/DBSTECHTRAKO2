var app = angular.module('myApp', []);
app.controller('fitnessCtrl', function ($scope, $http) {

    var customerDetails = 

    $scope.data = "";
    var bankDetails = { "availableBalance": "2365.07", "currency": "S$", "dateOfBalance": "2018-02-28T08:00:00.396+0000", "displayName": "POSB SAVINGS ACCOUNT", "accountNumber": "806290151", "accountType": "SAVINGS" };

    $scope.balanceData = bankDetails;
    
    $scope.customerDetails = { "userName": "Mary Tan", "customerId": 2 }; 
    console.log("$scope.customerDetails : ", $scope.customerDetails)
    $scope.init = function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://techtrek-api-gateway.cfapps.io/customers/marytan",
            "method": "GET",
            "headers": {
                "identity": "O2",
                "token": "545a6a5f-f955-48c1-936b-d545eac1aee8",
                "cache-control": "no-cache",
                "Postman-Token": "c66b43da-290f-4c7d-9fbd-8e0acc36d162"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response == undefined || response == null) {
                $scope.init();
            }
        });

    }

    $scope.getCustomers = function () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://techtrek-api-gateway.cfapps.io/customers/marytan",
            "method": "GET",
            "headers": {
                "identity": "O2",
                "token": "545a6a5f-f955-48c1-936b-d545eac1aee8",
                "cache-control": "no-cache",
                "Postman-Token": "c66b43da-290f-4c7d-9fbd-8e0acc36d162"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);

            $scope.data.username = response;
        });
    }

    var loadCharts = function () {
        var myChart = Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Fruit Consumption'
            },
            xAxis: {
                categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Fruit eaten'
                }
            },
            series: [{
                name: 'Jane',
                data: [1, 0, 4]
            }, {
                name: 'John',
                data: [5, 7, 3]
            }]
        });
    }

    loadCharts();

    var getTransactionDetails = function (accountID , cb) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://techtrek-api-gateway.cfapps.io/transactions/" + accountID.toString() + "?from=01-01-2018&to=02-01-2019",
            "method": "GET",
            "headers": {
                "identity": "O2",
                "token": "545a6a5f-f955-48c1-936b-d545eac1aee8",
                "cache-control": "no-cache",
                "postman-token": "75409749-6947-7173-773b-22618cf90066"
            },
            "data": "{\r\n  \"userId\": \"jack\"\r\n}"
        }

        $.ajax(settings).done(function (response) {
            console.log(response);

            $scope.overviewData = response;

            cb();
        });
    }

    function getBalanceOfDepositAcc(accountID , cb) {
        var settings =
            {
                "async": true,
                "crossDomain": true,
                "url": "https://techtrek-api-gateway.cfapps.io/accounts/deposit/" + accountID.toString() + "/balance?month=1&year=2018",
                "method": "GET",
                "headers": {
                    "identity": "O2",
                    "token": "545a6a5f-f955-48c1-936b-d545eac1aee8",
                    "cache-control": "no-cache",
                    "postman-token": "abbcc2e8-60fa-2c9a-b385-77c0d22e9726"
                },
                "data": "{\r\n  \"userId\": \"jack\"\r\n}"
            }

        $.ajax(settings).done(function (response) {
            console.log(response);
            $scope.balanceData = response;
            cb();
            console.log($scope.balanceData.availableBalance);
        });


    }

    $scope.overviewButton = function () {
        console.log("button");

        var callback = function () {
            console.log("callback called");
            //console.log("testing", Object.keys($scope.balanceData));
            var myChart = Highcharts.chart('container', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'DBS Accounts Overview'
                },
                xAxis: {
                    categories: ['Savings']
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                series: [ {
                        name: $scope.balanceData.displayName.toString(),
                        data: [parseFloat($scope.balanceData.availableBalance), {
                            name: 'Investment',
                            y: parseFloat("1292.34")
                        }, {
                            name: 'Loans',
                            y: parseFloat("232.74")
                        }]
                }]
            });
        }
        //getTransactionDetails(10);
        //getBalanceOfDepositAcc(10 , callback);


        callback();
        
        
    }

    $scope.weeklySpending = function () {
        Highcharts.chart('container', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Cashflow Overview'
            },

            xAxis: {
                categories: ['Cash In', 'Cash Out']
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'S$'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
            },

            series: [{
                name: 'John',
                data: stubWeeklyData[0],
                stack: 'male'
            }, {
                name: 'Joe',
                data: stubWeeklyData[1],
                stack: 'male'
            }, {
                name: 'Jane',
                data: stubWeeklyData[2],
                stack: 'female'
            }, {
                name: 'Janet',
                data: stubWeeklyData[3],
                stack: 'female'
            }]
        });
    }

    var stubWeeklyData = [[400, 100],
        [600, 200],
        [800, 300],
        [1000, 400]]

    $scope.monthSpending = function () {

    }
    $scope.spendingButton = function () {

        var callback = function () {
            console.log("callback called");
            //console.log("testing", Object.keys($scope.balanceData));
            var myChart = Highcharts.chart('container', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'DBS Accounts Overview'
                },
                xAxis: {
                    categories: ['Savings' , "Investments" , "Loans"]
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },

                series: 

                [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: $scope.balanceData.displayName,
                        y: parseFloat($scope.balanceData.availableBalance)
                    }, {
                        name: 'Investment',
                        y: parseFloat($scope.balanceData.availableBalance)
                    }, {
                        name: 'Loans',
                        y: parseFloat($scope.balanceData.availableBalance)
                    }]
                }]
            });
        }
        getTransactionDetails(10, callback);
    }
    

        $scope.callAPI = function () {

            console.log("API CALLED");

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://techtrek-api-gateway.cfapps.io/customers/marytan",
                "method": "GET",
                "headers": {
                    "identity": "O2",
                    "token": "545a6a5f-f955-48c1-936b-d545eac1aee8",
                    "cache-control": "no-cache",
                    "Postman-Token": "c66b43da-290f-4c7d-9fbd-8e0acc36d162"
                }
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
            });
        }
        
});