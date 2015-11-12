(function(angular) {

    //module.config function will be called at startup and can be used for
    //bootstrap information all views/controllers will be loaded after this
    //but angular services are available in this function. This function
    //takes a function where we can manipulate/configure stuff which we need
    //to set before angular uses any controllers etc.
    angular.module("mainApp")
        .config(mainAppModuleConfig);

    //This function will be executed before making mainAppModule available
    //for anything else. we are injecting below services here :
    //$stateProvider : This service is provided by ui-router module, which
    //we have added as a dependency of mainApp module. This service provides
    //the capability to configure all the state in view
    //$urlRouterProvider : This service will be used to set a fallback
    //url, if any incorrect state or url has been added and will always
    //redirect to some fallback url (home in our case)
    function mainAppModuleConfig($stateProvider, $urlRouterProvider) {

        //We are configuring a state named "home", and url for this state is "/"
        //which means whenever we hit this url in browser. This state will be
        //used to display the HTML 
        //templateUrl : url of the html template which will be loaded
        //whenever this state is active.
        //Url in address bar will be something like 
        //http://localhost:xxxx/#/
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "main/main-tmpl.html"
            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/newuser
            .state('createUser', {
                url: "/newuser",
                templateUrl: "user/user-create-tmpl.html"
            })
            //State can also specify its own controller, UI router will
            //instantiate the inject the corresponding controller 
            //object. 
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/allusers
            .state('showAll', {
                url: "/allusers",
                controller: "userCtrl",
                controllerAs: "userCtrl",
                templateUrl: "user/user-show-all-tmpl.html"
            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/reposearch
            .state("repoMain", {
                url: "/reposearch",
                templateUrl: "githubrepoexplorer/views/git-repo-explorer-tmpl.html",
                controller: "gitRepoExplorerCtrl",
                controllerAs: "gitRepoExplorerCtrl"

            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/repoexplorer/repo/testusername/testreponame
            .state("repoDetails", {
                url: "/repoexplorer/repo/:username/:reponame",
                templateUrl: "githubrepoexplorer/views/git-repo-details-tmpl.html",
                controller: "repoDetailsCtrl",
                controllerAs: "repoDetailsCtrl"
            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/repoexplorer/user/testusername
            .state("repoUser", {
                url: "/repoexplorer/user/:username",
                templateUrl: "githubrepoexplorer/views/git-repo-user-tmpl.html",
                controller: "repoUserCtrl",
                controllerAs: "repoUserCtrl"
            });

        //This is a fallback state, if any wrong URL is given in address bar
        //ui router will load the default url, Home state in this case
        $urlRouterProvider.otherwise('/');

    }
}(window.angular));
