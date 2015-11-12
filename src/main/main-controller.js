(function(angular) {

    angular.module("mainApp")
        .controller("mainCtrl", ["appMenu", mainController]);

    function mainController(appMenu) {
        var mainCtrl = this;
        mainCtrl.menuItems = angular.copy(appMenu.getMenuItems());
        mainCtrl.welcomeMessage = "Welcome to User Admin App";
    }

}(window.angular));
