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
            user = userService.findUserByCredentials(user.username, user.password);

            if (user) {
                $location.url("user/" + user._id);
            } else {
                $scope.errorMessage = "Invalid login, please try again.";
            }
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
            if (userService.findUserByUsername(user.username) !== null) {
                vm.registerError = "Username not available";
                return null;
            }

            else if (user.password !== user.verify) {
                vm.registerError = "Passwords do not match";
                return null;
            }

            userService.createUser(user);
            $location.url("user/" + user._id);
            vm.user = user;
        };
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("profileController", profileController);

    function profileController ($routeParams, userService, $location) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.user = userService.findUserById(vm.uid);

        vm.websites = websites;

        function websites() {
            $location.url("user/" + vm.user._id + "/website");
        }

        vm.updateCurr = updateCurr;
        function updateCurr(user, userService) {
            userService.updateUser(user);
        }
    }
})();