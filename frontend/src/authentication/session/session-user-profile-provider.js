(function(angular) {
    angular.module("sessionModule")
        .factory("SessionUserProfile", fnSessionUserProfile);

    fnSessionUserProfile.$inject = ["$q", "sessionService"];

    function fnSessionUserProfile($q, sessionService) {
        var accessSessionObject = {};
        var currentUser = {};
        currentUser.Name = fnGetCurrentUserName();
        accessSessionObject.CurrentUser = currentUser;
        accessSessionObject.isAuthenticated = fnIsAuthenticated;
        accessSessionObject.checkRole = fnCheckRole;
        accessSessionObject.getRoles = fnGetRoles;
        accessSessionObject.isAnonymous = fnIsAnonymous;
        accessSessionObject.endSession = fnEndSession;

        return accessSessionObject;

        function fnGetCurrentUserName() {
            var userName = undefined;
            var currentUser = sessionService.getCurrentUser();
            if (currentUser) {
                userName = currentUser.loggedInUser;
            }
            return userName;
        }

        function fnCheckRole(roleName) {
            var deferred = $q.defer();
            var hasRole = sessionService.hasRole(roleName);
            if (hasRole) {
                deferred.resolve(true);
            } else {
                deferred.reject(false);
            }
            return deferred.promise;
        }

        function fnGetRoles() {
            var deferred = $q.defer();
            var roles = [];//["user"];
            var userRoles = sessionService.getRoles();
            if (userRoles) {
                roles = userRoles;
            }
            //console.log("In GetRoles", roles);
            deferred.resolve(roles);
            return deferred.promise;
        }

        function fnEndSession() {
            var deferred = $q.defer();
            sessionService.resetCurrentUser();
            currentUser.Name = undefined;
            deferred.resolve(true);
            return deferred.promise;
        }

        function fnIsAuthenticated() {
            return authRequired(true);
        }

        function fnIsAnonymous() {
            return authRequired(false);
        }

        function authRequired(authRequiredFlag) {
            var deferred = $q.defer();
            var isAuthenticated = sessionService.isAuthenticated();
            if (authRequiredFlag) {
                if (isAuthenticated) {
                    deferred.resolve(true);
                } else {
                    deferred.reject(false);
                }
            } else {
                if (isAuthenticated) {
                    deferred.reject(false);
                } else {
                    deferred.resolve(true);
                }
            }

            return deferred.promise;
        }
    }
}(window.angular));
