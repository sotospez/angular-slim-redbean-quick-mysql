
app.controller('dataCtrl',['$scope','dataService','dataSupportService','$routeParams','$location',function($scope,dataService,dataSupportService,$routeParams,$location){

    "use strict";
    $scope.title=$routeParams.data;
    $scope.listdata="";
    $scope.model=[];

    $scope.fillform=function(){
      dataService.query($routeParams,function (datamodel)
            {

                $scope.listdata =  dataSupportService.createListview(datamodel[0]);
                $scope.model=datamodel;


            }
        );

    };


    $scope.save = function (item_data) {


            dataService.save($routeParams,item_data);

    };
    $scope.getData=function(data){
        //dataService.get({id:data.id},$scope.fillform);
        $location.path($routeParams.data+"/"+data.id);
    };

    $scope.new = function () {
        dataService.save({data:$routeParams.data},{id:0},$scope.getData);
    };

    $scope.delete = function (item_data) {
            dataService.delete({data:$routeParams.data,id:item_data.id});
        $scope.model.splice($scope.model.indexOf(item_data), 1);
    };

    $scope.edit = function (data) {
        $location.path($routeParams.data+"/"+data.id);
    };



    $scope.loadData = function() {

        dataService.query($routeParams,function (datamodel){

            $scope.model=datamodel;
        });

    };
    $scope.fillform();


}]);