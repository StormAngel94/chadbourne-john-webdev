/**
 * Created by ember on 7/20/2017.
 */
(function() {
    angular
        .module("tagMovies")
        .config(routeConfig);
    function routeConfig($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "./views/search-page.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })

            .when("/search", {
                templateUrl: "./views/search-page.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/search/:mid", {
                templateUrl: "./views/details-page.view.client.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }
})();