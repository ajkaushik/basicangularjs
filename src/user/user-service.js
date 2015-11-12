(function(angular) {

    //We can create services on any existing angular module, to get the
    //module, the syntax is :
    //var module=angular("<ModuleNameOnWhichServiceIsNeeded");
    //Make not of the syntax, if we just pass one parameter to 
    //angular.module("ModuleName") function, it will return the existing module
    //of that name, but if we pass two paramters angular.module("ModuleName",[])
    //A new module of that name will be created.

    //Services are singleton by nature and hance can be shared among controllers
    //to share the state/behavior between them

    //Get the user module
    var userModule = angular.module("userModule");

    //create  a constant service on angular module, constant a type of
    //provider/service which can be created on any module and we can 
    //specify any object as its value. Constant service can also be accessed
    //in .config() function of module

    //In this example, we will create a Constant service on userModule
    //to hold the URL of our remote service for getting all users
    userModule.constant("USER_API_URL", "user/mock-users.json");

    //Create a service on user module using .factory() function. Angular
    //will execute the function specified as service and will return
    //the value to the service/controller where this service has been
    //mentioned as dependency
    //The syntax to create a service is :
    //module.factory("<serviceName>",
    //[commaSeparatedNamesOfOtherServices,
    //function(serviceNamesInSameOrderAsSpecifiedInDependencyArray){}]);
    //First Paramter: Name of the Service
    //Second Parameter : An Array where item is the function which encapsulates
    //all the behavior of the Service, and all dependencies of this service
    //will be injected as parameters to this function. Name of the services
    //to be injected should be mentioned in the same order as they have been
    //mentioned in dependency array. For Example :
    //module1.factory("myService",
    //["service1,service2",function(service1,service2){}]);
    //Here myService is dependent on service1 and service2.

    //$http : This is an Angular service, which provides an interface
    //to make xhr calls, and it supports all http verbs like get,post,put,delete etc.
    //All the methods on this service returns a promise, which gets resolved
    //with the result returned by the remote service as a result of xhr call
    //The promise returned by $http can be used as a standard promise
    //and then/catch handlers are available

    //$q : This is an Angular service, which provides the capability
    //of creating our own promise and then returning them to callers
    //of the service method. For Example : We made a service call from
    //a controller to our angular service to get the user details
    //from our angular service, we want to make another xhr call (remote service call)
    //But before returning the response to controller, we want to do some
    //processing. In this scenario we can create a promis using $q service
    //and then resolve/reject that according to the respons of remote call

    //USER_API_URL : This is a constant service, which we just created
    //on the same module for illustration purpose, as of now this constant
    //service holds URL of remote service to be used in our userService

    //appLogger : This is our service which we have created in loggerModule
    //and as userModule is using loggerModule as dependency, so this service
    //is available to all services/controllers of userModule

    userModule.factory("userService", ["$http", "$q", "USER_API_URL", "appLogger", userService]);

    //Order of parameters should be same as mentioned in above dependency array
    function userService($http, $q, USER_API_URL, appLogger) {

        //This array will hold the user details for our mock data, and we will
        //add/remove from this array only to show the basic CRUD operations
        var users = [];

        //These are the methods exposed by this angular service. Basically
        //this is the public interface of this service and wherever this
        //service is injected the consumer will have access to these functions
        return {
            getUsers: getUsers,
            createUser: createUser,
            deleteUser: deleteUser,
            updateUser: updateUser
        };

        function getUsers() {

            //Create a deferred object using $q.defer(). This is the way to
            //create a promise in angular. We will call the asynchronous
            //function and immediately after that return the promise to the
            //caller
            var deferred = $q.defer();

            //Used setTimeout, just for fake delay purpose, in realty; the only delay would be
            //actual time taken by remote call ($http.get). In our example, everything is local
            //so we just added a fake delay
            setTimeout(function() {
                if (!users || users.length == 0) {
                    //Now make the remote call using $http service, this is an
                    //asynchrounus call, after this call promise will be returned
                    //to the caller, which will get resolve/reject as per the result
                    //of the Remote service call
                    $http.get(USER_API_URL)
                    //$http service returns a promise, so attach the
                    //required handlers will be called
                    //if the remote service call is successfull
                    .then(function(response) {

                        //Remote call was successful, do some processing
                        //on the response
                        users = response.data;
                        //And now, resolve the promise which we created and was
                        //returned to the caller of this function
                        deferred.resolve(users);
                    })
                        .catch(function(error) {
                            //.catch will be called if remote service call 
                            //fails due to some reason Remote call failed, 
                            //reject the promise which was returned to the caller
                            deferred.reject("Failed to load users.");
                        });
                } else {
                    //No need for remote call, just return already
                    //existing users
                    deferred.resolve(users);
                }
            }, 2000);

            //Return the promise to caller of this function
            return deferred.promise;
        }

        function createUser(newUser) {
            //console.log(users);
            var deferred = $q.defer();
            users.push(newUser);
            deferred.resolve(users);
            return deferred.promise;
        }

        function updateUser(originalUser, updatesUser) {
            var deferred = $q.defer();

            //HardCoded error condition, just to show failure on screen
            if (!originalUser || originalUser.firstName === "Abhishek") {
                deferred.reject("Error in saving");
            } else {
                var index = users.indexOf(originalUser);
                if (index > -1) {
                    users[index] = updatesUser;
                }
                deferred.resolve(users);
            }
            return deferred.promise;
        }

        function deleteUser(user) {
            var deferred = $q.defer();

            //HardCoded error condition, just to show failure on screen
            if (!user || user.firstName === "Abhishek") {
                deferred.reject("Error in deletion");
            } else {
                var index = users.indexOf(user);
                if (index > -1) {
                    users.splice(index, 1)
                }
                deferred.resolve(users);
            }
            return deferred.promise;
        }
    }
}(window.angular));