/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, $location, pageService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.wid);
        }
        init();

        vm.widgets = widgets;
        function widgets(page) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + page._id + /widget/);
        }

        vm.edit = edit;
        function edit(page) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + page._id);
        }

        vm.new = newPage;
        function newPage() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/new");
        }

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid );
        }

        vm.back = back;
        function back() {
            $location.url("/user/" + vm.uid + "/website/")
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, $location, pageService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.wid);
        }

        init();

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid);
        }

        vm.cancel = cancel;
        function cancel() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }

        vm.create = create;
        function create(page) {
            pageService.createPage(vm.wid, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/")
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, $location, pageService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.wid);
            vm.page = pageService.findPageById(vm.pid);
        }

        init();

        vm.update = update;
        function update(page) {
            pageService.updatePage(vm.pid, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/")
        }

        vm.cancel = cancel;
        function cancel() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }

        vm.delete = deletePage;
        function deletePage(page) {
            pageService.deletePage(vm.pid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/")
        }

        vm.widgets = widgets;
        function widgets(page) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + page._id + /widget/);
        }

        vm.edit = edit;
        function edit(page) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + page._id);
        }

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid);
        }
    }
})();