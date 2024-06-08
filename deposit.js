var app = angular.module('depositApp', ['ngRoute','ngStorage']);

app.controller('DepositController', function($scope,$http,$sessionStorage,$window) {
    $scope.getSessionValue = function(key) {
        return $window.sessionStorage.getItem(key);
      };
    $scope.deleteSessionStorageItem = function(key) {
        $window.sessionStorage.removeItem(key);
    };
      
    $scope.deposit = {};
    var params = {
        amount: ''
      };
    $scope.successDeposit = false;
    var token = $scope.getSessionValue('token');
    
    var headers = {
          'Authorization': 'Bearer ' + token
    };
    $scope.logout = function() {
      this.deleteSessionStorageItem('token');
      this.deleteSessionStorageItem('accountId');
      location.href = "./index.html";
    };

      $scope.depositFunds = function(deposit) {
        $scope.deposit = deposit;   
        params.amount = deposit.amount;    
            var url = "http://10.120.7.76:8080/transaction/deposit";

        $http({
            method: 'POST',
            url: "http://10.120.7.76:8080/transaction/deposit",
            headers: headers,
            params : params,
            data: {}
          }).then(function successCallback(response) {
            // This function will be called if the request succeeds
            console.log('Success:', response);
            $scope.successDeposit = true;
          }, function errorCallback(response) {
            // This function will be called if the request fails
            console.error('Error:', response);
          });
    };
});