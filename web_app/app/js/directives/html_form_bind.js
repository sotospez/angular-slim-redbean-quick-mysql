/**
 * Created by sotiris on 17/12/2013.
 */


app.directive('htmlFormBind',['$compile', function($compile) {
   "use strict";
    return function(scope, elm, attrs) {

        scope.$watch(attrs.htmlFormBind, function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                elm.html(newValue);
                $compile(elm.contents())(scope);
            }
        });
    };
}]);