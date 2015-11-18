(function(angular) {

    //Creating factory on a module, basically creates an angular service
    //Angular service can be used to share data/functionality between
    //controllers.
    //syntax :
    //angular.module("<ModuleNameOnWhichServiceIsNeeded>")
    //.factory("<NameOfTheServiceBeingCreated>",FunctionEncapsulatingServiceBehavior)
    angular.module("gitExplorerModule")
        .factory("githubExplorerService", githubExplorer);

    //$inject is another way of specifying dependencies for any
    //angular component be it service or controller. Specifying 
    //dependencies explicitly makes the js file minification ready
    //and there will not be any issue post minification
    githubExplorer.$inject = ["$http", "$q", "GIT_API_BASE_URL", "appLogger"];

    //This is the Function which encapsulates service behavior in this
    //example, the parameters of this function are the other
    //services on which this service depends and same service name
    //has been specified in dependency list, using $inject
    function githubExplorer($http, $q, GIT_API_BASE_URL, appLogger) {

        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepoDetails: getRepoDetails
        };

        function getUser(username) {
            return $http.get(GIT_API_BASE_URL + "users/" + username);
        };

        function getRepos(user) {
            return $http.get(user.repos_url);
        };


        function getRepoDetails(username, reponame) {
            var repo;
            var repoUrl = GIT_API_BASE_URL + "repos/" + username + "/" + reponame;
            var deferred = $q.defer();

            $http.get(repoUrl)
                .then(function(response) {
                    repo = response.data;
                    return $http.get(repoUrl + "/contributors")
                })
                .then(function(response) {
                    repo.collaborators = response.data;
                    deferred.resolve(repo);
                })
                .catch(function(error) {
                    console.error(error);
                    deferred.reject("Server error, request failed.");
                });

            return deferred.promise;
        }

        function serviceErrorHandler(error) {
            console.error(error);
            return $q.reject("Server error, request failed.");
        }
    };
}(window.angular));
