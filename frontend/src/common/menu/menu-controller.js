(function(angular, _) {
    angular.module("appMenuModule")
        .controller("appMenuCtrl", appMenuCtrl);

    appMenuCtrl.$inject = ["appMenu", "SessionUserProfile"];

    function appMenuCtrl(appMenu, SessionUserProfile) {

        var appMenuCtrl = this;
        var filteredMenuItems = [];
        var roles = [];

        function isMenuAllowed(roleNeeded) {
            //console.log(roleNeeded);
            var p = _.contains(roles, roleNeeded);
            //console.log(p);
            return p;
        }

        SessionUserProfile.getRoles()
            .then(function(userRoles) {
                // console.log("Filter menuItem");
                roles = userRoles;
                //console.log(roles);
                filteredMenuItems = [];
                var origMenuItems = appMenu.getMenuItems();
                var allMenuItems = angular.copy(origMenuItems);
                // console.log(allMenuItems);
                if (allMenuItems && allMenuItems.length > 0) {
                    for (var i = 0; i < allMenuItems.length; i++) {
                        var menuItem = allMenuItems[i];
                        var allowedMenuItem = false;
                        //console.log(menuItem.roleNeeded);
                        if (!menuItem.roleNeeded) {
                            allowedMenuItem = true;
                        } else {
                            allowedMenuItem = isMenuAllowed(menuItem.roleNeeded);
                        }
                        if (allowedMenuItem) {
                            if (menuItem.menuItems) {

                                var childMenuItems = [];
                                for (var j = 0; j < menuItem.menuItems.length; j++) {
                                    var childMenuItem = menuItem.menuItems[j];
                                    var allwoedChildMenuItem = false;
                                    if (!childMenuItem.roleNeeded) {
                                        allwoedChildMenuItem = true;
                                    } else {
                                        allwoedChildMenuItem = isMenuAllowed(childMenuItem.roleNeeded);
                                    }
                                    if (allwoedChildMenuItem) {
                                        childMenuItems.push(childMenuItem);
                                    }
                                };
                                if (childMenuItems.length > 0) {
                                    menuItem.menuItems = childMenuItems;
                                }
                            }
                            filteredMenuItems.push(menuItem);
                        }
                    };
                }

                // console.log(filteredMenuItems);
                appMenuCtrl.menuItems = filteredMenuItems;
            });


    }

}(window.angular, window._));
