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
        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToAccount = goToAccount;
        vm.goToAdmin = goToAdmin;
        vm.goSearch = goSearch;
        vm.logout = logout;
        vm.cancel = cancel;

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

        function cancel() {
            $location.url("/");
        }
    }
})();