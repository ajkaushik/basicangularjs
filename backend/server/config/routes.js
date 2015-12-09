(function(module) {

    var authentication = require("../controllers/authentication");
    var user = require("../controllers/user");
    var config = require("../config/config");
    var _ = require("underscore");

    module.exports = function(app) {

        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", getAllowedOrigin(req, res));
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');

            next();
        });

        var user_api = "/api/users";

        app.route(user_api)
            .get(user.getUsers)
            .post(user.createUser)
            .put(user.updateUser)

        app.post(user_api + "/validate", user.validateUserName);
        app.route(user_api + "/:username")
            .get(user.getUser)
            .delete(user.deleteUser);

        var auth_api = "/api/auth";

        app.post(auth_api + "/login", authentication.login);
        app.post(auth_api + "/profile", authentication.profile);

        app.get("*", function(req, res) {
            res.status(404).end();
        });

    }

    function getAllowedOrigin(req, res) {
        var origin = req.get("origin")
        if (config.allowedOrigins) {
            if (_.contains(config.allowedOrigins, origin)) {
                return origin;
            }
        }
        return "";
        //res.status(404).send();
    }
})(module);
