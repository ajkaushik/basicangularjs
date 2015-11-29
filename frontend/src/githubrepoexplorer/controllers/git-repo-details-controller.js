(function(angular) {

    //Create a repo details controller
    angular.module("gitExplorerModule")
        .controller("repoDetailsCtrl", repoDetailsController);

    //List all dependency for injection, this is another way of specifying
    //dependencies. Then at run time angular will find these services and inject
    //them
    repoDetailsController.$inject = ["githubExplorerService", "$stateParams", "appLogger"];

    function repoDetailsController(githubExplorerService, $stateParams, appLogger) {

        var repoDetailsCtrl = this;

        var onRepoSuccess = function(data) {
            repoDetailsCtrl.repo = data;
        };
        var onRepoError = function(reason) {
            repoDetailsCtrl.error = reason;
            appLogger.error(reason);
        };

        //reponame and username have been passed in url
        //we will again use stateparam service to get the values and
        //load repo details from git hub api
        repoDetailsCtrl.reponame = $stateParams.reponame;
        repoDetailsCtrl.username = $stateParams.username;

        //Set flag for repo details loading
        repoDetailsCtrl.repoDetailsLoading = true;
        //This function will be triggered as soon as we hit this url
        githubExplorerService.getRepoDetails(repoDetailsCtrl.username,
                repoDetailsCtrl.reponame)
            .then(onRepoSuccess)
            .catch(onRepoError)
            .finally(function() {
                //console.log("In finally");
                //Hide progress bar
                repoDetailsCtrl.repoDetailsLoading = false;
            });

    }
}(window.angular));
