var app = angular.module('transactionApp', ['ngRoute','ngStorage']);

app.controller('TransactionController', function($scope,$http,$sessionStorage,$window) {
    $scope.getSessionValue = function(key) {
        return $window.sessionStorage.getItem(key);
      };
    $scope.deleteSessionStorageItem = function(key) {
        $window.sessionStorage.removeItem(key);
    };
      
    $scope.transaction = {};
    $scope.deposit = {};
    $scope.successTransaction = false;
    $scope.successDeposit = false;
    $scope.alert = { visible: false, message: '', type: '' };
    var token = $scope.getSessionValue('token');
    var accountId = $scope.getSessionValue('accountId');
    var config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    };
    $scope.logout = function() {
      this.deleteSessionStorageItem('token');
      this.deleteSessionStorageItem('accountId');
      location.href = "./index.html";
    };

    $scope.fundsTransfer = function(transaction) {
    $scope.transaction = transaction;
        
        var url = "http://10.120.7.76:8080/transaction/transfer/" + transaction.destinationAccountNumber;
        $http.post(url, transaction,config).then(
            function (response) {
              console.log(response.data,"Success");
            $scope.successTransaction = true;
            },
            function (response) {
              console.log(response,"Error");
              if(response.data.status !== "Success"){
                
              }
           }
        );
      };

      $scope.depositFunds = function(deposit) {
        $scope.deposit = deposit;       
            var url = "http://10.120.7.76:8080/transaction/deposit";
            $http.post(url, deposit,config).then(
                function (response) {
                  console.log(response.data,"Success");
                $scope.successDeposit = true;
                },
                function (response) {
                  console.log(response,"Error");
                  if(response.data.status !== "Success"){
                    
                  }
               }
            );
          };
});