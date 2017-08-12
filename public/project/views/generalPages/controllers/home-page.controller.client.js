/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("homeController", homeController);

    function homeController($location, user) {
        var vm = this;
        vm.user = user;

        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToProfile = goToProfile;
        vm.goToAdmin = goToAdmin;

        function goToLogin() {
            $location.url("/login")
        }

        function goToRegister() {
            $location.url("/register")
        }

        function goToProfile() {
            $location.url("/profile")
        }

        function goToAdmin() {
            $location.url("/ADMIN/base")
        }
    }
})();