(function(angular) {

    //Create a repo details controller
    angular.module("gitExplorerModule")
        .controller("repoDetailsCtrl", repoDetailsController);

    //List all dependency for injection, this is another way of specifying
    //dependencies. Then at run time angular will find these services and inject
    //them
    repoDetailsController.$inject = ["githubExplorerService", "$stateParams"];

    function repoDetailsController(githubExplorerService, $stateParams) {

        var repoDetailsCtrl = this;

        var onRepoSuccess = function(data) {
            repoDetailsCtrl.repo = data;
        };
        var onRepoError = function(reason) {
            repoDetailsCtrl.error = reason;
        };

        var reponame = $stateParams.reponame;
        var username = $stateParams.username;

        githubExplorerService.getRepoDetails(username, reponame)
            .then(onRepoSuccess, onRepoError);

    }
}(window.angular));
