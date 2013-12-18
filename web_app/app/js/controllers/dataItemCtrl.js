
app.controller('dataItemCtrl',['$scope','dataService','dataSupportService','$routeParams','$location', function($scope,dataService,dataSupportService,$routeParams,$location){

    "use strict";

    $scope.title=$routeParams.data;
    $scope.model ={};
    $scope.model.id =0;


    $scope.fillform=function(data){
        var model=data;
        $scope.modelform =  dataSupportService.createImputForm(model);
        $scope.model=model;

    };

    $scope.getData=function(data){
       dataService.get({data:$routeParams.data,id:data.id},$scope.fillform);

    };


    if($routeParams.id){
    if($routeParams.id==='new' || $routeParams.id==='add' ){
        dataService.save({data:$routeParams.data},$scope.model ,$scope.getData);

    }else{
    $scope.getData($routeParams);
    //    dataService.get({id:data.id},$scope.fillform);
    }
    }


    $scope.fld_types= dataSupportService.getFieldTypes();

    $scope.modelform="";
    $scope.save = function () {

        dataService.save({data:$routeParams.data},$scope.model,function(data){

            $scope.model=data;
        });


    };

    $scope.delete = function () {
        dataService.delete( {data:$routeParams.data,id:$scope.model.id});
        $location.path($routeParams.data);
    };



    $scope.createfldtype = function(type,name) {
          $scope.modelform =  $scope.modelform +dataSupportService.createImputType(type,name);

    };

}]);