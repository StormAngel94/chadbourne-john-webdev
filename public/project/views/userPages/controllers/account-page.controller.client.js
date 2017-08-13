/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("accountController", accountController);

    function accountController($location, userService, user) {
        var vm = this;
        vm.user = user;

        vm.updateCurr = updateCurr;
        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToAccount = goToAccount;
        vm.goToAdmin = goToAdmin;
        vm.goSearch = goSearch;
        vm.logout = logout;

        function updateCurr(user) {
            userService.updateUser(user._id, user);
            vm.updateMessage = "Update Successful!"
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

    }
})();