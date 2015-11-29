(function(angular) {
    "use strict";
    angular.module("mainApp")
        .controller("mainCtrl", mainController);

    mainController.$inject = ["appMenu", "SessionUserProfile"];

    function mainController(appMenu, SessionUserProfile) {
        var mainCtrl = this;
        mainCtrl.menuItems = angular.copy(appMenu.getMenuItems());
        mainCtrl.welcomeMessage = "Welcome to User Admin App";
        mainCtrl.CurrentUser = SessionUserProfile.CurrentUser;
    }

}(window.angular));
