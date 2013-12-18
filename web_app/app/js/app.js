var app =  angular.module('app',
    ['ngRoute','ngResource']);

app.config(['$locationProvider','$routeProvider',   function($locationProvider,$routeProvider) {

//$locationProvider.html5Mode(true);
$locationProvider.hashPrefix('!');
    $routeProvider.when('/', {templateUrl: 'home.html', controller: 'homeCtrl'});
    $routeProvider.when('/home', {templateUrl: 'home.html', controller: 'homeCtrl'});
    $routeProvider.when('/about', {templateUrl: 'about.html', controller: 'aboutCtrl'});
    $routeProvider.when('/root', {templateUrl: 'root.html', controller: 'rootCtrl'});
    $routeProvider.when('/:data', {templateUrl: 'data.html', controller: 'dataCtrl'});
    $routeProvider.when('/:data/:id', {templateUrl: 'data_item.html', controller: 'dataItemCtrl'});

    $routeProvider.otherwise({redirectTo: '/'});
}]);


app.run(['$rootScope',function($rootScope){
$rootScope.alertmsg = "";
}]);

angular.element(document).ready(function() {
angular.bootstrap(document, [ "app" ]);
});