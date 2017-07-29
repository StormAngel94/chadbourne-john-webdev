/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, $location, pageService) {
        var vm = this;

        vm.widgets = widgets;
        vm.edit = edit;
        vm.new = newPage;
        vm.profile = profile;
        vm.back = back;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        function init() {
            var promise = pageService.findPagesByWebsiteId(vm.wid);
            promise
                .then(function (response) {
                    vm.pages = response.data;
                })
        }
        init();

        function widgets(page) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + page._id + /widget/);
        }

        function edit(page) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + page._id);
        }

        function newPage() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/new");
        }

        function profile() {
            $location.url("/user/" + vm.uid );
        }

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

        vm.profile = profile;
        vm.cancel = cancel;
        vm.create = create;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        function init() {
            var promise = pageService.findPagesByWebsiteId(vm.wid);
            promise
                .then(function (response) {
                    vm.pages = response.data;
            })
        }
        init();

        function profile() {
            $location.url("/user/" + vm.uid);
        }

        function cancel() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }

        function create(page) {
            var promise = pageService.createPage(vm.wid, page);
            promise
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/")
                })
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
            var promise = pageService.findPagesByWebsiteId(vm.wid);
            promise
                .then(function (response) {
                    vm.pages = response.data;
                });
            promise = pageService.findPageById(vm.pid);
            promise
                .then(function (response) {
                    vm.page = response.data;
                })
        }

        init();

        vm.update = update;
        function update(page) {
            var promise = pageService.updatePage(vm.pid, page);
            promise
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/")
                })
        }

        vm.cancel = cancel;
        function cancel() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }

        vm.delete = deletePage;
        function deletePage(page) {
            var promise = pageService.deletePage(vm.pid);
            promise
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/")
                })
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