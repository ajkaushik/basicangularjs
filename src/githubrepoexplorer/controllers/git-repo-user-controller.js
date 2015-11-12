(function(angular) {

    angular.module("gitExplorerModule")
        .controller("repoUserCtrl", ["githubExplorerService", "$stateParams",
            function(githubExplorerService, $stateParams) {

                var repoUserCtrl = this;

                var onUserComplete = function(response) {
                    repoUserCtrl.user = response.data;
                    if (repoUserCtrl.user) {
                        githubExplorerService.getRepos(repoUserCtrl.user)
                            .then(onReposSuccess, onError);
                    }
                };

                var onReposSuccess = function(response) {
                    repoUserCtrl.repos = response.data;
                };

                var onError = function(reason) {
                    console.log("In ctrl error");
                    repoUserCtrl.error = "Could not fetch data";
                };


                repoUserCtrl.username = $stateParams.username;
                repoUserCtrl.repoSortOrder = "-stargazers_count";
                repoUserCtrl.reportCountLimit = "100";

                githubExplorerService.getUser(repoUserCtrl.username)
                    .then(onUserComplete)
                    .catch(onError);

            }
        ]);
})(window.angular);
