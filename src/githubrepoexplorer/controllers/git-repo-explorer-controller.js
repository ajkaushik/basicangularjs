(function(angular) {

    var gitRepoModule = angular.module("gitExplorerModule");

    gitRepoModule.controller("gitRepoExplorerCtrl", ["$location",
        function($location) {

            var gitRepoExplorerCtrl = this;

            //Search function will be executed on button click, and we will simply
            //change the url in browser using $location angular service. As soon
            //as we change the address, UI router will load the corresponding state
            //check Main-module-config.js for correspodning state
            //we are passing the username entered by user as part of url
            //this url param will be used by the next view to load data from git hub api
            gitRepoExplorerCtrl.search = function(username) {
                $location.path("/repoexplorer/user/" + gitRepoExplorerCtrl.username);
            };
        }
    ]);
}(window.angular));
