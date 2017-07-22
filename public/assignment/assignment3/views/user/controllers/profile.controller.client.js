/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, userService, $location) {
        var uid = $routeParams["uid"];
        $scope.user = userService.findUserById(uid);

        $scope.websites = function () {
            $location.url("user/" + $scope.user._id + "/website");
        };

        $scope.updateCurr = function (user, userService) {
            userService.updateUser(user);
        };
    }
})();