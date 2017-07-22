/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("profileController", profileController);

    function profileController($scope, $routeParams, userService) {
        var uid = $routeParams["uid"];
        $scope.user = userService.findUserById(uid);

        $scope.websites = function (user) {
        }
    }
})();