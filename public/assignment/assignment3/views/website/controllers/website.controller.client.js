/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, $location, websiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.uid);
        }
        init();

        vm.pages = pages;
        function pages(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id + "/page");
        }

        vm.edit = edit;
        function edit(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id);
        }

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid);
        }

        vm.new = newWebsite;
        function newWebsite() {
            $location.url("/user/" + vm.uid + "/website/new");
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.uid);
        }
        init();

        vm.create = create;
        function create(website) {
            websiteService.createWebsite(vm.uid, website);
            $location.url("/user/" + vm.uid + "/website/");
        }

        vm.cancel = cancel;
        function cancel(website) {
            $location.url("/user/" + vm.uid + "/website/");
        }

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid);
        }

        vm.pages = pages;
        function pages(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id + "/page");
        }

        vm.edit = edit;
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
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.uid);
            vm.website = websiteService.findWebsiteById(vm.wid);
        }
        init();

        vm.updateCurr = updateCurr;
        function updateCurr(site) {
            websiteService.updateWebsite(site);
        }

        vm.pages = pages;
        function pages(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id + "/page");
        }

        vm.edit = edit;
        function edit(website) {
            $location.url("/user/" + vm.uid + "/website/" + website._id);
        }

        vm.update = update;
        function update(website) {
            websiteService.updateWebsite(vm.wid, website);
            $location.url("/user/" + vm.uid + "/website/");
        }

        vm.cancel = cancel;
        function cancel() {
            $location.url("/user/" + vm.uid + "/website/");
        }

        vm.delete = deleteWebsite;
        function deleteWebsite(website) {
            websiteService.deleteWebsite(vm.wid);
            $location.url("/user/" + vm.uid + "/website/");
        }

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid);
        }
    }
})();
