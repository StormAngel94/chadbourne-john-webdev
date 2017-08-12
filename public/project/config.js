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
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/profile", {
                templateUrl: "./views/userPages/templates/account-page.controller.client.js.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginSecure
                }
            })
            .when("/login", {
                templateUrl: "./views/userPages/templates/login-page.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/register", {
                templateUrl: "./views/userPages/templates/register-page.view.client.html",
                controller: "registerController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/search/:type/:search", {
                templateUrl: "./views/generalPages/templates/search-page.view.client.html",
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/search/:mid", {
                templateUrl: "./views/moviePages/templates/movie-page.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/search/:tid", {
                templateUrl: "./views/moviePages/templates/tag-page.view.client.html",
                controller: "tagController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
    }

    function checkLogin(userService, $q) {
        var deferred = $q.defer();
        userService.checkLogin()
            .then(function (response) {
                var user = response.data;
                if(user === '0') {
                    deferred.resolve()
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkLoginSecure(userService, $q, $location) {
        var deferred = $q.defer();
        userService.checkLogin()
            .then(function (response) {
                var user = response.data;
                if(user === '0') {
                    deferred.reject();
                    $location.url("/login")
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();