(function(module) {

    var _ = require("underscore");
    var user = require('./user');

    module.exports.login = function(req, res) {
        console.log("in login");
        if (req.body && req.body.userName && req.body.password) {
            console.log(req.body.userName, req.body.password);
            var allUsers = user.loadUsers();
            console.log(allUsers);
            var userLoggedIn = _.find(allUsers, function(user) {
                return user.userName === req.body.userName && user.password === req.body.password;
            });
            console.log(userLoggedIn);
            if (userLoggedIn) {
                console.log(userLoggedIn);
                res.cookie('UM_AUTH_SESSION_ID', user.userName, {
                    secure: true,
                    httpOnly: true
                });

                return res.status(200).send({
                    loggedInUser: userLoggedIn.firstName + " " + userLoggedIn.lastName,
                    roles: userLoggedIn.roles
                });
            } else {
                return res.status(401).send({
                    status: "Valid username/password required."
                });
            }
        } else {
            return res.status(401).send({
                status: "Valid username/password required."
            });
        }
    }

    module.exports.profile = function(req, res) {

        if (req.cookies.UM_AUTH_SESSION_ID) {
            var userLoggedIn = _.find(user.loadUsers(), function(user) {
                return user.userName === req.cookies.UM_AUTH_SESSION_ID
            });

            if (userLoggedIn) {
                return res.status(200).send({
                    loggedInUser: userLoggedIn.firstName + " " + userLoggedIn.lastName
                });
            }
        } else {
            return res.status(401).send({
                status: "Valid username/password required."
            });
        }
    }

})(module);
