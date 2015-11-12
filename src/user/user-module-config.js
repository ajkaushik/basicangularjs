(function(angular) {

    //module.confiug() will be called by angular at bootstrap, before
    //making this module available to modules and views
    angular.module("userModule")
        .config(userModuleConfigProvider);

    //We have injected appMenu service here
    //NOTE : appMenu service has been injected as appMenuProvider
    //because <providerNameGivenByUs> will be appnended by
    //Provider word by angular
    function userModuleConfigProvider(appMenuProvider) {

        //Each module will add its own menu items and then
        //main module will load all the menu items
        var userMenuItems = {
            //uiSref: "createUser",
            title: "User",
            menuItems: [{
                uiSref: "createUser",
                title: "Create User"
            }, {
                uiSref: "showAll",
                title: "Show All Users"
            }]

        }

        appMenuProvider.addMenuItem(userMenuItems);
    }
}(window.angular));
