var app = angular.module('homeApp', ['ngRoute','ngStorage']);

app.controller('HomeController', function($scope,$http,$sessionStorage,$window) {
    $scope.getSessionValue = function(key) {
        return $window.sessionStorage.getItem(key);
      };

      $scope.deleteSessionStorageItem = function(key) {
        $window.sessionStorage.removeItem(key);
    };
      
    $scope.accountDetails = {};
    $scope.userDetails = {};
    var token = $scope.getSessionValue('token');
    var accountId = $scope.getSessionValue('accountId');
    var config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };

    $http.get("http://10.120.7.76:8080/account/"+accountId,config)
    .then(function (response) {
        $scope.accountNumber = response.data.accountNumber;
        $scope.balance = response.data.balance;
        $scope.ifsc = response.data.ifscCode;
        $scope.branch = response.data.branch;
        //alert($scope.usersData);
        $scope.errorMessage = "No Exceptions"; 
    })
    .catch(function(error) {
      $scope.errorMessage = error.status; 
    });

    $scope.logout = function() {
      this.deleteSessionStorageItem('token');
      this.deleteSessionStorageItem('accountId');
      location.href = "./index.html";
    };

    $http.get("http://10.120.7.76:8080/users/"+accountId,config)
    .then(function (response) {
      console.log(response,"gfgfkufuyfg");
        $scope.userDetails = response.data;
    })
    .catch(function(error) {
      $scope.errorMessage = error.status; 
    });

});