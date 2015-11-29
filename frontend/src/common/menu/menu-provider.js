(function(angular) {
    var menuModule = angular.module("appMenuModule");

    //Provider is another type of angular service, which is base type
    //of all type of services and this service can be accessed in 
    //module.config function
    menuModule.provider("appMenu", appMenuProvider);

    function appMenuProvider() {
        var _menuItems = [];
        //$get function is a mandatory function if we are
        //creating a provider type of service and this will be called 
        //by angular while injecting the service
        this.$get = function() {
            return {
                getMenuItems: getMenuItems
            }
        }

        //This method will be called by main controller while loading
        //menu at startup
        function getMenuItems() {
            //console.log(_menuItems);
            return _menuItems;
        }

        //Add menu item can only be accessed by other modules
        //only in bootstrap (config method of modules) to add their menu
        //items
        this.addMenuItem = function(menuItem) {
            //console.log(menuItem);
            _menuItems.push(menuItem);
        }
    }

}(window.angular));
