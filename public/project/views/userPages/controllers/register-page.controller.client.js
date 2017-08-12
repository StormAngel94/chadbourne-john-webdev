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
        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToAccount = goToAccount;
        vm.goToAdmin = goToAdmin;
        vm.goSearch = goSearch;
        vm.logout = logout;

        function goToLogin() {
            $location.url("/login")
        }

        function goToRegister() {
            $location.url("/register")
        }

        function goToAccount() {
            $location.url("/profile")
        }

        function goToAdmin() {
            $location.url("/ADMIN/base")
        }

        function logout() {
            $location.url("/login")
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }

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