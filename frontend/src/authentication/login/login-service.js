(function(angular, _) {
    //Create a new angular service, which will handle all login
    //related functionality, how to authenticate/validate user
    angular.module("loginModule")
        .factory("loginService", fnloginService)
        .constant("AUTH_API_URL", "http://localhost:3030/api/auth");
    //Inject the dependencies of this service
    fnloginService.$inject = ["$http", "$q", "userService", "sessionService", "SessionUserProfile", "AUTH_API_URL"];

    //This is the function which has all the logic of this service
    //and at run time when angular injects this service, the return value
    //of this function will be injected; in other words any other service
    //controller which lists this service as its dependency will get an object
    //as returned by this function
    function fnloginService($http, $q, userService, sessionService, SessionUserProfile, AUTH_API_URL) {
        var loginServiceObject = {};
        //We will return this object, and all the methods/properties
        //declared on this object will be available to the consumer 
        //of the service
        //We are assigning function references of the functions
        //defined in this service to the properties on return object
        //to expose these functions to consumer of this service
        loginServiceObject.login = fnlogin;
        loginServiceObject.logout = fnlogout;
        loginServiceObject.validateUsername = fnvalidateUsername;

        return loginServiceObject;

        function fnlogin(username, password) {
            //We will return a promise from here, once we add
            //the remote service call here, the controller will not
            //have to change, and we will keep the interface same
            var deferred = $q.defer();
            if (username && password) {
                $http.post(AUTH_API_URL + "/login", {
                        userName: username,
                        password: password
                    })
                    .then(function(response) {
                        sessionService.setCurrentUser(response.data);
                        SessionUserProfile.CurrentUser.Name = response.data.loggedInUser;
                        deferred.resolve(true);
                    })
                    .catch(function(response) {
                        sessionService.setCurrentUser(undefined);
                        deferred.reject(response.data.status);
                    });
            } else {
                deferred.reject("Please enter valid username/password.");
            }

            //Return the promise to consumer of this service
            return deferred.promise;
        }

        function fnlogout(username) {
            //We will return a promise from here, once we add
            //the remote service call here, the controller will not
            //have to change, and we will keep the interface same
            var deferred = $q.defer();

            //In Actual code, we will have some code like as below :
            //$http.post(authServiceUrl,{username:username})
            //.then(handleSuccessAndResolve)
            //.catch(handleErrorAndReject);

            //For now we will just return true, as we are not using
            //any backend for actual validation
            var loggedOut = true;
            SessionUserProfile.endSession();
            deferred.resolve(loggedOut);

            //Return the promise to consumer
            return deferred.promise;

        }

        function fnvalidateUsername(username) {
            return userService.validateUsername(username);

            // //We will return a promise from here, once we add
            // //the remote service call here, the controller will not
            // //have to change, and we will keep the interface same
            // var deferred = $q.defer();

            // //In Actual code, we will have some code like as below :
            // //$http.post(authServiceUrl,{username:username})
            // //.then(handleSuccessAndResolve)
            // //.catch(handleErrorAndReject);

            // //For now we will just return true, as we are not using
            // //any backend for actual validation

            // userService.getUsers()
            //     .then(function(users) {
            //         var validUser = undefined;
            //         if (users) {
            //             var validUser = _.find(users, function(user) {
            //                 if (user.userName === username) {
            //                     return user;
            //                 }
            //             });

            //             if (!validUser) {
            //                 deferred.resolve(true);
            //             } else {
            //                 deferred.reject("User already present.");
            //             }
            //         }
            //     })
            //     .catch(function() {
            //         deferred.reject("User validation failed.");
            //     })
            //     //Return the promise to consumer
            // return deferred.promise;

        }

    }
}(window.angular, window._));
