(function(angular) {

    //mainApp module is the main module of our app, its like main function or entry
    //point for angular.This module will tell angular what all other modules
    //are needed for this app. we can define everything in one module
    //but its a good practice to create small small module per feature

    //For this example we will create mainApp module, which then depends upon
    //ui.router module : This module is a third party module and provides client
    //side navigation. In very broad sense, this module takes a state name and url for
    //html for that state and then at run time will switch the html in a ui-view tag
    //if one has been added to html page.

    //userModule : This is our module which we have created for handling our
    //user management, we will add that as a dependency here, so that
    //angular can load all service/controllers defined in that module

    //Create mainApp module.
    angular.module("mainApp", ["ui.router", "userModule", "gitExplorerModule"]);
}(window.angular));
