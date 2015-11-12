(function(angular) {
    'use strict';
    //We have created a very basic directive, for replacing the menu html in
    //index.html page
    //A custom diretive can have its own html, controller and behavior which we
    //can specify in link function
    angular.module('appMenuModule')
        .directive("mainappmenu", MainappMenu);

    //Create a directive function, which can only acts as element in html
    //restrict="E", this means this directive can only be added as an element
    //in html
    //templateUrl: Url of the html file, which will get replaced at runtime
    function MainappMenu() {
        return ({
            restrict: "E",
            templateUrl: "common/menu/menu-tmpl.html",
            controller: "appMenuCtrl",
            controllerAs: "appMenuCtrl",
            link: function(scope, elem, attr, controller) {
                var e =angular.element(elem.find("navbardiv"));
                //link function can be used for manipulating markup
                //or any other behavior
            }
        });
    }
}(window.angular));
