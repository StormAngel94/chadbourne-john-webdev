/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("flickrService", flickrService);

    function flickrService($http) {
        var key = "4f02729dfdc824feb498d0f5c852a0ff";
        var secret = "f041ea97084a9c19";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhoto(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        return {
            "searchPhoto": searchPhoto
        }
    }
})();