(function(angular) {

    //This is an example of some helper/generic directives which can be
    //used to enrich behavior of some controls with app specific 
    //implementation
    //In this case, we will validate each username as we tab out
    //from the user name field
    angular.module("loginModule")
        .directive('validateUsername', fnValidateUsername);

    fnValidateUsername.$inject = ["$q", "loginService"];

    function fnValidateUsername($q, loginService) {

        return {
            //require will let angular know, that this directive
            //will need ngModelController, so angular will inject
            //the corresponding ngModelController from the element
            //on which this directive is applied
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {

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
                    var deferred = $q.defer();
                    loginService.validateUsername(viewValue)
                        .then(function() {
                            deferred.resolve();
                        })
                        .catch(function() {
                            deferred.reject();
                        });
                    return deferred.promise;
                };
            }
        };
    }
}(window.angular));
