/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (!user){
                vm.errorMessage = "Invalid login, please try again.";
                return
            }
            var promise = userService.findUserByCredentials(user.username, user.password);
            promise
                .then(function (response) {
                    if (response.data === null) {
                        vm.errorMessage = "Invalid login, please try again.";
                    } else {
                        user = response.data;
                        $location.url("user/" + user._id);
                    }
                })
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            var promise = userService.findUserByUsername(user.username);
            promise
                .then(function (response) {
                    if (response.data !== null) {
                        vm.registerError = "Username not available";
                        return;
                    }

                    else if (user.password !== user.verify) {
                        vm.registerError = "Passwords do not match";
                        return;
                    }

                    promise = userService.createUser(user);
                    promise
                        .then(function (response) {
                            vm.user = response.data;
                            $location.url("user/" + vm.user._id);
                        })
                });
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("profileController", profileController);

    function profileController ($routeParams, userService, $location) {
        var vm = this;

        vm.websites = websites;
        vm.updateCurr = updateCurr;
        vm.deleteCurr = deleteCurr;

        vm.uid = $routeParams["uid"];
        var promise = userService.findUserById(vm.uid);
        promise
            .then(function (response) {
                vm.user = response.data;
            });


        function websites() {
            $location.url("user/" + vm.uid + "/website");
        }


        function updateCurr(user) {
            var promise = userService.updateUser(vm.uid, user);
            promise
                .then(function () {
                    vm.done = "Profile Updated";
                })
        }

        function deleteCurr() {
            var promise = userService.deleteUser(vm.uid);
            promise
                .then(function () {
                    $location.url("/");
                })
        }
    }
})();