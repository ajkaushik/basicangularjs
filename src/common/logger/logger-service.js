(function(angular) {

    //Retrieve the module and create Service on top of that
    //This is the meat of this module, as module itself is nothing
    //but a container and once any other module lists loggerModule
    //as its a dependency, then appLogger will be available to controller
    //and services of that module
    angular.module("loggerModule")
        .factory("appLogger", ["toastr",
            function(toastr) {

                return {
                    success: fnsuccess,
                    error: fnerror,
                    info: fninfo
                };

                function fnsuccess(msg) {
                    console.log(msg);
                    toastr.success(msg);
                }

                function fnerror(error) {
                    console.error(error);
                    toastr.error(error);
                }

                function fninfo(info) {
                    console.info(info);
                    toastr.info(info);
                }

            }
        ]);

}(window.angular));
