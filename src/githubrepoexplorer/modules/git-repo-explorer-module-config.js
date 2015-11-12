(function(angular) {

    //module.confiug() will be called by angular at bootstrap, before
    //making this module available to modules and views
    angular.module("gitExplorerModule")
        .config(gitExplorerModuleConfigProvider);

    //We have injected appMenu service here
    //NOTE : appMenu service has been injected as appMenuProvider
    //because <providerNameGivenByUs> will be appnended by
    //Provider word by angular
    function gitExplorerModuleConfigProvider(appMenuProvider) {

        //Each module will add its own menu items and then
        //main module will load all the menu items while 
        //loading the menu directive
        var repoMenuItems = {
            uiSref: "repoMain",
            title: "Repo Explorer"
        }

        appMenuProvider.addMenuItem(repoMenuItems);
    }
}(window.angular));
