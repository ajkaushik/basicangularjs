(function() {
    //constant is a type of angular service and can be used to hold some
    //constant value or simple object which can be used throughout the module
    angular.module("gitExplorerModule")
        .constant("GIT_API_BASE_URL", "https://api.github.com/");
}());
