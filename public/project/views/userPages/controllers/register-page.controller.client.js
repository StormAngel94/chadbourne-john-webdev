/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user.password === user.verify) {
                userService.nameTaken(user.username)
                    .then(function (response) {
                        if(response.data !== null) {
                            vm.registerError = "Username is unavailable"
                        }
                        else {
                            userService.createUser(user)
                                .then(function () {
                                    $location.url("/");
                                });
                        }
                    });

            }
            else {
                vm.registerError = "Passwords do not match, please try again"
            }
        }
    }
})();