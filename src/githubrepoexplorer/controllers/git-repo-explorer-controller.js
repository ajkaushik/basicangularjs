(function(angular) {

    var gitRepoModule = angular.module("gitExplorerModule");

    gitRepoModule.controller("gitRepoExplorerCtrl", ["$location",
        function($location) {

            var gitRepoExplorerCtrl = this;
            gitRepoExplorerCtrl.search = function(username) {
                $location.path("/repoexplorer/user/" + gitRepoExplorerCtrl.username);
            };
        }
    ]);
}(window.angular));