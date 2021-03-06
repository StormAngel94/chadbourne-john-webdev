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
                templateUrl: "./views/userPages/templates/account-page.view.client.js.html",
                controller: "accountController",
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
            .when("/search/go/movie/:mid", {
                templateUrl: "./views/moviePages/templates/movie-page.view.client.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/search/go/tag/:tid", {
                templateUrl: "./views/moviePages/templates/tag-page.view.client.html",
                controller: "tagController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/search/go/tag/:tid/edit", {
                templateUrl: "./views/moviePages/templates/editTag-page.view.client.html",
                controller: "tagEditController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginSecure
                }
            })
            .when("/search/go/user/:uid", {
                templateUrl: "./views/userPages/templates/profile-page.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/ADMIN/base", {
                templateUrl: "./views/adminPages/templates/admin-page.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginADMIN
                }
            })
            .when("/ADMIN/user/:uid", {
                templateUrl: "./views/adminPages/templates/adminUser-page.view.client.html",
                controller: "adminUserController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginADMIN
                }
            })
            .when("/ADMIN/movie/:mid", {
                templateUrl: "./views/adminPages/templates/adminMovie-page.view.client.html",
                controller: "adminMovieController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginADMIN
                }
            })
            .when("/ADMIN/tag/:tid", {
                templateUrl: "./views/adminPages/templates/adminTag-page.view.client.html",
                controller: "adminTagController",
                controllerAs: "model",
                resolve: {
                    user: checkLoginADMIN
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

    function checkLoginADMIN(userService, $q, $location) {
        var deferred = $q.defer();
        userService.checkLogin()
            .then(function (response) {
                var user = response.data;
                if(user === '0' || user.isAdmin === false) {
                    deferred.reject();
                    $location.url("/login")
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();