var app = angular.module('profileApp', ['ngRoute','ngStorage']);

app.controller('ProfileController', function($scope,$http,$sessionStorage,$window) {
    $scope.getSessionValue = function(key) {
        return $window.sessionStorage.getItem(key);
      };
    $scope.deleteSessionStorageItem = function(key) {
        $window.sessionStorage.removeItem(key);
    };
    $scope.statements = {};
    $scope.statementsLists = {};
    $scope.showDownload = false;
    var params = {
      startDate: '',
      endDate: ''
    };
    var token = $scope.getSessionValue('token');
    var accountNumber = $scope.getSessionValue('accountNumber');
    var headers= {
          'Authorization': 'Bearer ' + token
    
      };

    $scope.logout = function() {
        this.deleteSessionStorageItem('token');
        this.deleteSessionStorageItem('accountId');
        location.href = "./index.html";
    };

// Function to submit the form
    $scope.submitDates = function (statements) {
    $scope.statements = statements;
    $scope.showDownload = true;
    var year = statements.startDate.getFullYear();
    var month = ('0' + (statements.startDate.getMonth() + 1)).slice(-2);
    var day = ('0' + statements.startDate.getDate()).slice(-2);

    var endyear = statements.endDate.getFullYear();
    var endmonth = ('0' + (statements.endDate.getMonth() + 1)).slice(-2);
    var endday = ('0' + statements.endDate.getDate()).slice(-2);

    params.endDate = endyear + '-' + endmonth + '-' + endday;
    params.startDate = year + '-' + month + '-' + day;

    $http({
      method: 'GET',
      url: "http://10.120.7.76:8080/statement/json/"+accountNumber,
      params: params,
      headers: headers,
      // responseType: 'arraybuffer'
    }).then(function(response) {
      console.log(response.data,"wejfbkjsd");
      $scope.statementsLists = response.data;
      
    }, function(error) {
      // Error callback
      console.error('Error fetching data:', error);
    });

  };

  $scope.downloadStatement = function (statements) {
    $scope.statements = statements;

    var year = statements.startDate.getFullYear();
    var month = ('0' + (statements.startDate.getMonth() + 1)).slice(-2);
    var day = ('0' + statements.startDate.getDate()).slice(-2);

    var endyear = statements.endDate.getFullYear();
    var endmonth = ('0' + (statements.endDate.getMonth() + 1)).slice(-2);
    var endday = ('0' + statements.endDate.getDate()).slice(-2);

    params.endDate = endyear + '-' + endmonth + '-' + endday;
    params.startDate = year + '-' + month + '-' + day;
   
    $http({
      method: 'GET',
      url: "http://10.120.7.76:8080/statement/pdf/"+accountNumber,
      params: params,
      headers: headers,
      responseType: 'arraybuffer'
  }).then(function(response) {
      // Success callback
      var file = new Blob([response.data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
  }, function(error) {
      // Error callback
      console.error('Error fetching data:', error);
  });
  };
});