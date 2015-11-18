(function(angular) {
    angular.module("sessionModule")
        .factory("sessionService", fnSessionService);

    fnSessionService.$inject = ["$q", "$http", "$cookies"];

    function fnSessionService($q, $http, $cookies) {
        var sessionServiceObject = {};
        var cookieKey = "UM_APP_AUTH_COOKIE";
        var currentUser = undefined;

        sessionServiceObject.getCurrentUser = fnGetCurrentUser;
        sessionServiceObject.setCurrentUser = fnSetCurrentUser;
        sessionServiceObject.resetCurrentUser = fnResetCurrentUser;
        sessionServiceObject.hasRole = fnHasRole;
        sessionServiceObject.getRoles = fnGetRoles;
        sessionServiceObject.isAuthenticated = fnIsAuthenticated;

        return sessionServiceObject;

        function fnSetCurrentUser(user) {
            currentUser = user;
            $cookies.putObject(cookieKey, user);
        }

        function fnResetCurrentUser(user) {
            currentUser = undefined;
            $cookies.remove(cookieKey);
            return true;
        }


        function fnGetCurrentUser() {
            //console.log("In fnGetCurrentUser");
            if (!currentUser) {
                currentUser = $cookies.getObject(cookieKey);
            }

            return currentUser;
        }

        function fnHasRole(requiredRole) {
            var currentUser = fnGetCurrentUser();
            var isRolePresent = false;
            if (currentUser) {
                var roles = currentUser.roles;
                if (roles) {
                    for (var i = roles.length - 1; i >= 0; i--) {
                        if (roles[i] === requiredRole) {
                            isRolePresent = true;
                            break;
                        }
                    };
                }
            }

            return isRolePresent;
        }

        function fnGetRoles() {

            var currentUser = fnGetCurrentUser();
            //console.log(currentUser);
            var isRolePresent = false;
            if (currentUser) {
                return currentUser.roles;
            }
        }

        function fnIsAuthenticated() {
            //console.log("In isAuthenticated");
            return fnGetCurrentUser() !== undefined;
        }
    }
}(window.angular));
