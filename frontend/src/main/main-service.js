(function(angular) {
    angular.module("mainApp")
        .factory("mainService", fnMainService);

    fnMainService.$inject = ["SessionUserProfile"]

    function fnMainService(SessionUserProfile) {

        var userName = {};
        userName.Name = SessionUserProfile.UserName;

        return {
            UserName: userName
        };
    }
}(window.angular));
