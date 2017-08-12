/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (!user){
                vm.errorMessage = "Invalid login, please try again.";
                return
            }
            var promise = userService.login(user.username, user.password);
            promise
                .then(function (response) {
                    if (response.data === null) {
                        vm.errorMessage = "Invalid login, please try again.";
                    } else {
                        user = response.data;
                        $location.url("/");
                    }
                })
        }
    }
})();