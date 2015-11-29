(function(angular) {

    "use strict";
    //module.config function will be called at startup and can be used for
    //bootstrap information all views/controllers will be loaded after this
    //but angular services are available in this function. This function
    //takes a function where we can manipulate/configure stuff which we need
    //to set before angular uses any controllers etc.
    angular.module("mainApp")
        .config(mainAppModuleConfig)
        .run(mainAppModuleRun);

    //This function will be executed before making mainAppModule available
    //for anything else. we are injecting below services here :
    //$stateProvider : This service is provided by ui-router module, which
    //we have added as a dependency of mainApp module. This service provides
    //the capability to configure all the state in view
    //$urlRouterProvider : This service will be used to set a fallback
    //url, if any incorrect state or url has been added and will always
    //redirect to some fallback url (home in our case)

    mainAppModuleConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

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
                templateUrl: "main/main-tmpl.html",
                resolve: {
                    AccessCheck: ["SessionUserProfile", function(SessionUserProfile) {
                        //console.log("AccessCheck");
                        return SessionUserProfile.isAuthenticated();
                    }]
                }
            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/newuser
            .state('createUser', {
                url: "/newuser",
                templateUrl: "user/user-create-tmpl.html",
                resolve: {
                    AccessCheck: ["SessionUserProfile", function(SessionUserProfile) {
                        return SessionUserProfile.checkRole("admin");
                    }]
                }
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
                templateUrl: "user/user-show-all-tmpl.html",
                resolve: {
                    AccessCheck: ["SessionUserProfile", function(SessionUserProfile) {
                        return SessionUserProfile.isAuthenticated();
                    }]
                }
            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/reposearch
            .state("repoMain", {
                url: "/repoexplorer",
                templateUrl: "githubrepoexplorer/views/git-repo-explorer-tmpl.html",
                controller: "gitRepoExplorerCtrl",
                controllerAs: "gitRepoExplorerCtrl",
                resolve: {
                    AccessCheck: ["SessionUserProfile", function(SessionUserProfile) {
                        return SessionUserProfile.isAuthenticated();
                    }]
                }

            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/repoexplorer/repo/testusername/testreponame
            .state("repoMain.repoUser.repoDetails", {
                url: "/repo/:reponame",
                templateUrl: "githubrepoexplorer/views/git-repo-details-tmpl.html",
                controller: "repoDetailsCtrl",
                controllerAs: "repoDetailsCtrl",
                resolve: {
                    AccessCheck: ["SessionUserProfile", function(SessionUserProfile) {
                        return SessionUserProfile.isAuthenticated();
                    }]
                }
            })
            //Url in address bar will be something like 
            //http://localhost:xxxx/#/repoexplorer/user/testusername
            .state("repoMain.repoUser", {
                url: "/user/:username",
                templateUrl: "githubrepoexplorer/views/git-repo-user-tmpl.html",
                controller: "repoUserCtrl",
                controllerAs: "repoUserCtrl",
                resolve: {
                    AccessCheck: ["SessionUserProfile", function(SessionUserProfile) {
                        return SessionUserProfile.isAuthenticated();
                    }]
                }
            })
            .state("login", {
                url: '/login',
                templateUrl: "authentication/login/login-tmpl.html",
                controller: "loginCtrl",
                controllerAs: "loginCtrl",
                resolve: {
                    AccessCheck: ["SessionUserProfile", function(SessionUserProfile) {
                        return SessionUserProfile.isAnonymous();
                    }]
                }
            })
            .state("logout", {
                url: '/logout',
                controller: ["$state", function($state) {
                    $state.go("login");
                }],
                resolve: {
                    AccessCheck: ["loginService",
                        function(loginService) {
                            //console.log("AccessCheck");
                            return loginService.logout();
                        }
                    ]
                }
            });

        //This is a fallback state, if any wrong URL is given in address bar
        //ui router will load the default url, Home state in this case
        $urlRouterProvider.otherwise('/');

    }

    mainAppModuleRun.$inject = ["$rootScope", "$state"];

    function mainAppModuleRun($rootScope, $state) {

        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            if (!error && toState.name !== "login") {
                $state.go("login");
            } else {
                $state.go("home");
            }
        });

    }
}(window.angular));
