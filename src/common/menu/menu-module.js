(function(angular) {
    //angular object is provided by angular js library
    //and same can be used to create module,services,controllers and 
    //directives. In this case we are creating a module. 
    //The syntax is as below :
    //angular.module("<NameOfTheModuleToBeCreated",[CommaSeparatedListOfOtherModules])
    //First Parameter : Name of The Module to be created
    //Second Paramter : Other Module Names, on which this Module depends
    //If module has no dependency, give an empty array[].
    //Any Module which has been specified as a dependency of this module
    //that implicitly means all the services/controllers/directives of
    //that module are available to this module

    angular.module("appMenuModule", []);
}(window.angular));
