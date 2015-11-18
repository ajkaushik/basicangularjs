(function(angular, Spinner) {
    "use strict";
    var directiveName = "showprogress";
    angular.module("app-ui-directives")
        .directive(directiveName, fnprogressDirective);

    function fnprogressDirective() {
        var directiveDefinition = {
            restrict: "A",
            scope: {
                showprogress: '='
            },
            link: fnprogressDirectiveLink
        };
        return directiveDefinition;

        function fnprogressDirectiveLink(scope, element, attr) {
            scope.$watch(directiveName, showSpinner);
            var spinner;

            function showSpinner(newValue) {
                if (newValue) {
                    var height = element[0].offsetHeight;
                    var originalWidth = element[0].offsetWidth;
                    var length = Math.round(height / 5);

                    var radius = Math.round(height / 10);
                    var width = Math.round(height / 20);

                    var spinnerOptions = {
                        lines: 17, // The number of lines to draw
                        length: length, // The length of each line
                        width: width, // The line thickness
                        radius: radius, // The radius of the inner circle
                        trail: 90, // Afterglow percentage
                        hwaccel: true, // Whether to use hardware acceleration
                        //top: '50%', //(radius + length) + 'px', // Top position relative to parent in px
                        //left: '50%', //((originalWidth / 2) - radius) + 'px' // Left position relative to parent in px
                        color: "#006600",
                        opacity:.6
                    };
                    //element.width(originalWidth + originalWidth / 2);
                    //console.log(spinnerOptions);
                    attr.$set("style", "position:relative;");
                    attr.$set('disabled', true);
                    spinner = new Spinner(spinnerOptions).spin();
                    element.append(spinner.el);
                } else {
                    if (spinner) {
                        spinner.stop();
                        attr.$set('disabled', false);
                        //console.log(spinner);
                        //element.width(originalWidth);
                    }
                }

            }

        }
    }
}(window.angular, window.Spinner));
