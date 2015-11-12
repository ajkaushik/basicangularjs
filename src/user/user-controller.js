(function(angular) {

    //Get the module on which controller is to be created
    var userModule = angular.module("userModule");

    //We can create a controller on any module by using module.controller()
    //function. this function takes parameters as below :
    //First Parameter : Name of the controller to be created
    //Second paramtere : object array, which has the name of all the services
    //on which this controller depends. The Last item in this array will always
    //be the function which encapsulates the behavior of this controller
    //the names in the array should be in the same order in which they 
    //have been specified as paramtere in controller function

    //Now we will create a controller on userModule
    //Name of The controller : userCtrl
    //This controller will use userService and appLogger services
    //hence they have been specified as dependencies in object array
    //which is the second parameter to module.controller() function
    userModule.controller("userCtrl", ["userService", "appLogger", userController]);

    //This is the controller function and will provide all the behavior
    //wherever this controller is used
    //NOTE : Angular will always create a new object for angular, whenver we 
    //specify this controller as controller used by any view. And also,
    //angular will always create this object using the "new" operator and
    //hence "this" in controller function will refer to the controller object
    //itself
    function userController(userService, appLogger) {

        //Its a good practice to capture the this object in a variable, because
        //when used inside a child function this might point to something else
        //And in the view, which uses this controller, only the functions/properties
        //specified on this object will be available

        //Capture this object in a varibale
        var userCtrl = this;

        //Assign any property to the variable, this property 
        //will be available in view for binding
        userCtrl.title = "Manage Users";

        userCtrl.isEditMode = false;

        //Any function created on controller object, 
        //will be available to the view
        //ctrlObj.fnToBeExposedInView = function{...}

        //Create getUsers on userCtrl, which will have a reference to
        //a function expression
        userCtrl.getUsers = function() {

            //Set this flag to true, just for showing some simple wait message while user loads
            userCtrl.userLoadPending = true;

            //Controller should not have a business logic in them
            //so we will just to delegate the task of getting users
            //to userService and then controller will just display
            //the data/error as returned by the service method

            //getUsers() returns a promise, so we will attach our
            //then and catch handlers to handler success and error
            //conditions
            userService.getUsers()
                .then(assignUsers)
                .catch(handleError)
                .finally(function() {
                    //Set load user to false. This shows a simple usage of finally function of $q promises
                    //and finally will be called always even if the promise was rejected
                    userCtrl.userLoadPending = false;
                });
        };

        //Bootstrap user data
        userCtrl.getUsers();

        //Function for creating user
        userCtrl.createUser = function() {

            //userCtrl.newUser is bound to the controls on view, where we
            //enter the new user data, that will be available here, we will
            //pass the same object
            userService.createUser(userCtrl.newUser)
                .then(function(users) {
                    //Reset the userCtrl.newUser object to clear the input fields
                    userCtrl.newUser = undefined;
                    //Assign the users again, the users array will have the newly
                    //created object
                    userCtrl.users = users;
                    appLogger.success("User saved successfully.");
                })
                .catch(handleError);
        };


        userCtrl.setUserForEditing = function(user) {
            userCtrl.originalUser = user;
            //We need to create a copy, so that while editing
            //the original object remains intact else whenever we
            //start editing the original object will get modified,
            //because binding in angular is always two way
            userCtrl.editUser = angular.copy(user);
            userCtrl.isEditMode = true;
        }

        userCtrl.updateUser = function() {
            userService.updateUser(userCtrl.originalUser, userCtrl.editUser)
                .then(function(users) {
                    resetFields();
                    appLogger.success("User updated successfully.");
                    assignUsers(users);
                })
                .catch(handleError);
        }

        userCtrl.cancelEdit = function() {
            resetFields();
        }

        userCtrl.deleteCurrentUser = function(user) {
            if (userCtrl.isEditMode) {
                resetFields();
            }
            userService.deleteUser(user)
                .then(function(users) {
                    appLogger.success("User deleted successfully.");
                    assignUsers(users);
                })
                .catch(handleError);
        };

        //these are private functions 
        function assignUsers(usersDataFromService) {
            userCtrl.users = usersDataFromService;
        }
        //and will not be available in view for binding
        function handleError(error) {
            appLogger.error(error);
        }

        function resetFields() {
            userCtrl.originalUser = undefined;
            userCtrl.editUser = undefined;
            userCtrl.isEditMode = false;
        }

    }
}(window.angular));