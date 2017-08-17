/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("tagEditController", tagEditController);
    
    function tagEditController($routeParams, $location, user, userService, tagService) {
        var vm = this;
        vm.tid = $routeParams["tid"];
        vm.user = user;

        function init() {
            tagService.findTagById(vm.tid)
                .then(function (response) {
                    vm.tag = response.data;
                    })
        }
        init();

        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToAccount = goToAccount;
        vm.goToAdmin = goToAdmin;
        vm.goSearch = goSearch;
        vm.logout = logout;
        vm.goToTag = goToTag;
        vm.favorite = favorite;
        vm.editTag = editTag;

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

        function goToTag(tid) {
            $location.url("/search/go/tag/" + tid)
        }

        function logout() {
            $location.url("/login")
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }

        function favorite() {
            var tid = vm.tid;
            var uid = vm.user._id;
            if(vm.user.tags && contains(vm.user.tags, tid)) {
                tagService.removeFav(tid);
                userService.removeTag(uid, tid);
            } else {
                tagService.addFav(tid);
                userService.addMovie(uid, tid);
            }
            location.reload()
        }

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        function editTag(tag) {
            tagService.updateTag(tag)
                .then(function () {
                    $location.url("/search/go/tag/" + vm.tid);
                });
        }
    }
})();