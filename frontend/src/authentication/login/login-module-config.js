(function(angular) {
    angular.module("loginModule")
        .config(loginModuleConfigProvider);


    loginModuleConfigProvider.$inject = ["appMenuProvider"];

    function loginModuleConfigProvider(appMenuProvider) {
        
        var loginMenuItem = {
            title: "Login",
            uiSref: "login"
        }
        //appMenuProvider.addMenuItem(loginMenuItem);
    }
}(window.angular));
