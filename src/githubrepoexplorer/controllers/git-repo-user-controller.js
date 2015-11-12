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


                //We are using stateParam service here, as soon as this 
                //route is hit, we will find the username param in url 
                //(check main-module-config.js for state url template)
                repoUserCtrl.username = $stateParams.username;

                //These properties will be used for applying angular filter on the
                //collections
                repoUserCtrl.repoSortOrder = "-stargazers_count";
                repoUserCtrl.reportCountLimit = "100";
                //Call the remote service to get repo details
                //for this username
                //Set flag to progress image to true
                repoUserCtrl.repoLoadPending = true;
                githubExplorerService.getUser(repoUserCtrl.username)
                    .then(onUserComplete)
                    .catch(onError)
                    .finally(function() {
                        //Irrespective of the promise result, set this
                        //flag to false so that progress img is hidden
                        repoUserCtrl.repoLoadPending = false;
                    });

            }
        ]);
})(window.angular);
