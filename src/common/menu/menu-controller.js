(function(angular) {
    angular.module("appMenuModule")
        .controller("appMenuCtrl", appMenuCtrl);

    appMenuCtrl.$inject = ["appMenu"];

    function appMenuCtrl(appMenu) {
    	
        this.menuItems = appMenu.getMenuItems();
    }

}(window.angular));
