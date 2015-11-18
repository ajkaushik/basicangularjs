(function(angular) {
    //Create a new angular controller, which will have the handlers for
    //view and will delegate all data/logic related tasks to loginService
    //And hence loginService has been mentioned as a dependency here
    angular.module("loginModule")
        .controller("loginCtrl", fnloginCtrl);

    //Inject the loginService, so that at run time angular can
    //find the service and injects the required object
    //appLogger is provided by core module, so we will inject that as well
    fnloginCtrl.$inject = ["$state", "loginService", "appLogger"];

    //This is the function which will control the view and will
    //delegate the needed tasks to loginService
    //NOTE : Order of parameters of this function should always 
    //be same as the order of dependencies listed in inject []
    function fnloginCtrl($state, loginService, appLogger) {

        //NOTE : Angular will create an object of this function using
        //"new operator" and hence we will assign all the properties
        //and functions, which we want to expose to view on "this" object
        //So here we will capture "this" in a var at top level, so that
        //same can be referred inside other functions
        var loginCtrl = this;

        loginCtrl.isAuthenticated = false;

        loginCtrl.login = function(username, password) {
            //loginService returns a promise, so we will handle
            //that promise here
            loginCtrl.isLoginPending = true;
            loginService.login(username, password)
                .then(function(result) {
                    if (result) {
                        appLogger.success("User logged in successfully.");
                        loginCtrl.isAuthenticated = true;
                        $state.go("home");
                    }
                })
                .catch(function(error) {
                    appLogger.error(error);
                })
                .finally(function() {
                    loginCtrl.isLoginPending = false;
                });

        }

        loginCtrl.logout = function(username) {
            //loginService returns a promise, so we will handle
            //that promise here
            loginService.logout(username, password)
                .then(function(result) {
                    if (result) {
                        appLogger.success("User logged out successfully.");
                        loginCtrl.isAuthenticated = false;
                    }
                })
                .catch(function(error) {
                    appLogger.error(error);
                });

        }
    }
}(window.angular));
