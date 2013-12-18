/* Services
*
*
*/


app.service('dataService',['$resource', function ($resource) {

    "use strict";

    return $resource('/order_api/api/:data/:id', {}, {
       // update: {method:'PUT'},
       // delete: {method:'DELETE'}
    });
}]);

