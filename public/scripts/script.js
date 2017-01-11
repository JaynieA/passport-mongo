var myApp = angular.module('myApp', []);

myApp.controller('mainController',['$scope', '$http', function($scope, $http) {

}]);

myApp.controller('registerController',['$scope', '$http', function($scope, $http) {
  $scope.register = function() {
    console.log('in register controller', $scope.username, $scope.password);
    //construct object
    var toSend = {
      username: $scope.username,
      password: $scope.password
    }; // end toSend
    //post registration data to server
    $http({
      method: 'POST',
      url: '/register',
      data: toSend
    }).then( function(response) {
      console.log('in response -->', response);
    }); // end $http
  }; // end register

}]);
