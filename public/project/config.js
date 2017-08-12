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
                templateUrl: "./views/generalPages/templates/home-page.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "./views/userPages/templates/login-page.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "./views/userPages/templates/register-page.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "./views/moviePages/templates/search-page.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/search/:mid", {
                templateUrl: "./views/moviePages/templates/details-page.view.client.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/search/:tid", {
                templateUrl: "./views/moviePages/templates/tag-page.view.client.html",
                controller: "tagController",
                controllerAs: "model"
            })
    }
})();