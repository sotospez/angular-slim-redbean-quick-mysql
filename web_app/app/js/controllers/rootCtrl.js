
app.controller('rootCtrl',['$scope','$http',function($scope,$http){
    'use strict';


    $http.get('/order_api/api').success(function(data){
        $scope.tables=data;
    });


}]);