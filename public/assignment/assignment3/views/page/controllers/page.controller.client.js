/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("pageListController", pageListController);

    function pageListController() {

    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController() {

    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($scope, pageService) {
        var pid = $routeParams["pid"];
        $scope.page = pageService.findPageById(pid);

        $scope.updateCurr = function (page) {
            websiteService.updateWebsite(page);
        };
    }
})();