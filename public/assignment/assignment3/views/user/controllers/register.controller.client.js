/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("registerController", registerController);

    function registerController($scope, userService, $location) {
        $scope.register = function (user) {
            if (userService.findUserByUsername(user.username) !== null) {
                $scope.registerError = "Username not available";
                return null;
            }
            else if (user.password !== user.verify) {
                $scope.registerError = "Passwords do not match";
                return null;
            }
            var _user = [];
            _user.username = user.username;
            _user.password = user.password;
            userService.createUser(_user);
            $location.url("user/" + _user._id);
            $scope.user = _user;
        };
    }
})();