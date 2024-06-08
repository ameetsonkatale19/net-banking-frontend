var app = angular.module('loginApp', ['ngRoute','ngStorage']);

// Configure the routes
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './index.html',
            // controller: 'login'
        })
        .when('/home', {
            templateUrl: './home.html',
            // controller: 'home'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('loginController', function($scope, $location,$http,$sessionStorage,$window) {
    $scope.user = {};
    $scope.invalidCredentials = false;
    $scope.setSessionValue = function(key, value) {
        $window.sessionStorage.setItem(key, value);
    };
          
  $scope.loginUser = function(user) {
    $scope.user = user;
    
    var url = "http://10.120.7.76:8080/auth/login", config = "contenttype";
    $http.post(url, user,config).then(
        function (response) {
          console.log(response.data,"Success");
          if(response.data.status === "Success"){
            $scope.setSessionValue('token', response.data.jwtToken);
            $scope.setSessionValue('accountId', response.data.accountId);
            $scope.setSessionValue('accountNumber', response.data.accountNumber);
            location.href = "./home.html";
          }
        },
        function (response) {
          console.log(response,"Error");
          if(response.data.status !== "Success"){
            $scope.invalidCredentials = true;
            
          }
       }
    );
  };
});