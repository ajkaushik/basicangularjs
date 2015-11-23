(function(angular, Spinner) {
    console.log("directives");
    //This is an example of some helper/generic directives which can be
    //used to enrich behavior of some controls with app specific 
    //implementation
    //In this case, we will validate each username as we tab out
    //from the user name field
    angular.module("loginModule")
        .directive('validateusername', fnValidateUsername);


    //fnValidateUsername.$inject = ["$q", "loginService"];

    function fnValidateUsername($q, loginService) {
        console.log("Test");
        //require will let angular know, that this directive
        //will need ngModelController, so angular will inject
        //the corresponding ngModelController from the element
        //on which this directive is applied
        var directiveDefinition = {
            restrict: "A",
            require: 'ngModel',
            link: fnValidateUserNameLink
        };
        return directiveDefinition;

        function fnValidateUserNameLink(scope, element, attrs, ctrl) {
            //$asynValidators is an object exposed by angular, which will have
            //all the validators as properties having reference to
            //validator function. Validator function will be called by
            //angular with modelValue and viewValue, where modelValue 
            //is the current value on model(controller property) and
            //viewValue is the value which is being entered by user on the control
            ctrl.$asyncValidators.username = function(modelValue, viewValue) {
                //Each asyncValidator should return a promise, 
                //as these validators will be called asynchronously 
                //by angular

                startStopProgress(true, element, attrs);

                var deferred = $q.defer();
                loginService.validateUsername(viewValue)
                    .then(function() {
                        deferred.resolve();
                        startStopProgress(false, element, attrs);
                    })
                    .catch(function() {
                        deferred.reject();
                        startStopProgress(false, element, attrs);
                    });
                return deferred.promise;
            };
        }

        function startStopProgress(start, element, attr) {
            if (start) {
                attr.$set('disabled', true);
                element.addClass("progress");
            } else {
                attr.$set('disabled', false);
                element.removeClass("progress");
            }
        }
    }
}(window.angular, window.Spinner));
