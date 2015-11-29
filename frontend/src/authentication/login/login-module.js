(function(angular) {
    //Create a new module named loginModule, which is dependent on
    //coreModule so that it gets logging and some other core functionality
    angular.module("loginModule", ["coreModule"]);
}(window.angular));
