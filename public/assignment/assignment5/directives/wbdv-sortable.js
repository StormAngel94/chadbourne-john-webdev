/**
 * Created by Chadbourne on 8/2/2017.
 */
(function() {
    angular.module("wbdv-sortable", [])
        .directive("sort", sortDirective);
    
    function sortDirective($http, $routeParams) {
        var startIndex = -1;
        var stopIndex = -1;
        var pid = $routeParams["pid"];
        function linkFunction(scope, element) {
            element.find("ul").sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    stopIndex = $(ui.item).index();
                    $http.put("/page/" + pid +"/widget?initial=" + startIndex + "&final=" + stopIndex)
                }
            })
        }
        return {
            templateUrl: "./views/widget/templates/widget-ul.html",
            link: linkFunction
        };
    }
})();