/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("loginController", loginController);

    function loginController($scope, $location, userService) {
        $scope.login = function (user) {
            var _user = userService.findUserByCredentials(user.username, user.password);
            if (_user !== null) {
                $location.url("user/" + _user._id);
            } else {
                $scope.errorMessage = "Invalid login, please try again.";
            }
        }
    }
})();