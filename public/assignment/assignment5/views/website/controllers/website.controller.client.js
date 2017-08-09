/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, $location, websiteService) {
        var vm = this;

        vm.pages = pages;
        vm.edit = edit;
        vm.profile = profile;
        vm.new = newWebsite;
        vm.back = back;

        vm.uid = $routeParams["uid"];
        function init() {
            var promise = websiteService.findWebsitesByUser(vm.uid);
            promise
                .then(function (response) {
                    vm.websites = response.data;
                });
        }
        init();

        function pages(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id + "/page");
        }

        function edit(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id);
        }

        function profile() {
            $location.url("/user/" + vm.uid);
        }

        function newWebsite() {
            $location.url("/user/" + vm.uid + "/website/new");
        }

        function back() {
            $location.url("/user/" + vm.uid);
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {
        var vm = this;

        vm.create = create;
        vm.cancel = cancel;
        vm.profile = profile;
        vm.pages = pages;
        vm.edit = edit;

        vm.uid = $routeParams["uid"];
        function init() {
            var promise = websiteService.findWebsitesByUser(vm.uid);
            promise
                .then(function (response) {
                    vm.websites = response.data;
                })
        }
        init();

        function create(website) {
            var promise = websiteService.createWebsite(vm.uid, website);
            promise
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/");
                })
        }

        function cancel(website) {
            $location.url("/user/" + vm.uid + "/website/");
        }

        function profile() {
            $location.url("/user/" + vm.uid);
        }

        function pages(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id + "/page");
        }

        function edit(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id);
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {
        var vm = this;

        vm.pages = pages;
        vm.edit = edit;
        vm.updateWebsite = updateWebsite;
        vm.cancel = cancel;
        vm.delete = deleteWebsite;
        vm.profile = profile;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        function init() {
            var promise = websiteService.findWebsitesByUser(vm.uid);
            promise
                .then(function (response) {
                    vm.websites = response.data
                });
            promise = websiteService.findWebsiteById(vm.wid);
            promise
                .then(function (response) {
                    vm.website = response.data
                })
        }
        init();

        function pages(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id + "/page");
        }

        function edit(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id);
        }

        function updateWebsite(website) {
            var promise = websiteService.updateWebsite(vm.wid, website);
            promise.then(function () {
                $location.url("/user/" + vm.uid + "/website/");
            });
        }

        function cancel() {
            $location.url("/user/" + vm.uid + "/website/");
        }

        function deleteWebsite(website) {
            var promise = websiteService.deleteWebsite(vm.wid);
            promise.then(function () {
                $location.url("/user/" + vm.uid + "/website/");
            });
        }

        function profile() {
            $location.url("/user/" + vm.uid);
        }
    }
})();
