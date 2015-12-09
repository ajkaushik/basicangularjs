(function(module) {

    var _ = require("underscore");
    var users = require('../dummydata/mock-users.json');

    module.exports.getUsers = function(req, res) {
        _.each(users, function(user) {
            delete user.password;
            delete user.roles;
        });
        return res.status(200).send(users);
    }

    module.exports.createUser = function(req, res) {
        var newuser = req.body;
        if (newuser) {
            var validationResult = validateUser(newuser);
            if (validationResult.isValid) {
                var userAlreadyPresent = _.find(users, function(user) {
                    return user.userName == newuser.userName;
                })
                if (!userAlreadyPresent) {
                    newuser.password = "test123";
                    users.push(newuser);
                    return res.status(200).send(newuser);
                } else {
                    return res.status(400).send({
                        status: "Username already exists."
                    });
                }
            } else {
                return res.status(400).send({
                    status: validationResult.message
                });
            }
        } else {
            return res.status(400).send({
                status: "Invalid request"
            });
        }

    }

    module.exports.updateUser = function(req, res) {
        var userTobeUpdated = req.body;
        if (userTobeUpdated) {
            var validationResult = validateUser(userTobeUpdated);
            if (validationResult.isValid) {
                var existingUser = _.find(users, function(user) {
                    return user.userName == userTobeUpdated.userName;
                });
                if (existingUser) {
                    //Mock condition, for displaying error condition
                    if (existingUser.firstName === "Abhishek") {
                        return res.status(400).send({
                            status: "Mock error from server. Update failed."
                        });
                    }
                    existingUser.firstName = userTobeUpdated.firstName;
                    existingUser.lastName = userTobeUpdated.lastName;
                    return res.status(200).send(userTobeUpdated);
                } else {
                    return res.status(400).send({
                        status: "User does not exists."
                    });
                }
            } else {
                return res.status(400).send({
                    status: validationResult.message
                });
            }
        } else {
            return res.status(400).send({
                status: "Invalid request"
            });
        }

    }


    module.exports.deleteUser = function(req, res) {
        if (req.params && req.params["username"]) {

            if (req.params["username"] == "asharma") {
                return res.status(400).send({
                    status: "Mock error from server. Deletion failed."
                });
            }
            var userTobeDeletedIndex = _.findIndex(users, function(user) {
                return user.userName == req.params["username"];
            });
            if (userTobeDeletedIndex >= 0) {
                users.splice(userTobeDeletedIndex, 1);
                return res.status(200).send(req.params["username"]);
            } else {
                return res.status(400).send({
                    status: "User does not exists."
                });
            }
        } else {
            return res.status(400).send({
                status: "Invalid request"
            });
        }
    }


    module.exports.getUser = function(req, res) {
        if (req.params && req.params["username"]) {

            var existingUser = _.find(users, function(user) {
                return user.userName == req.params["username"];
            });
            if (existingUser) {
                return res.status(200).send(existingUser);
            } else {
                return res.status(400).send({
                    status: "User does not exists."
                });
            }
        } else {
            return res.status(400).send({
                status: "Invalid request"
            });
        }
    }

    module.exports.validateUserName = function(req, res) {
        if (req.body && req.body.userName) {

            var validUser = _.find(users, function(user) {
                if (user.userName === req.body.userName) {
                    return user;
                }
            });

            if (!validUser) {
                return res.status(200).send({
                    status: true
                });
            } else {
                return res.status(400).send({
                    status: "User already present."
                });
            }
        } else {
            res.status(400).send({
                status: "Username is invalid."
            });
        }
    }



    function validateUser(user) {
        console.log(user);
        var validationResult = {};
        if (!user) {
            validationResult.isValid = false;
            validationResult.message = "Invalid user details.";
        } else if (!user.userName) {
            validationResult.isValid = false;
            validationResult.message = "Invalid user name.";

        } else if (!user.firstName) {
            validationResult.isValid = false;
            validationResult.message = "Invalid user first name.";
        } else if (!user.lastName) {
            validationResult.isValid = false;
            validationResult.message = "Invalid user last name.";
        } else {
            validationResult.isValid = true;
        }
        return validationResult;
    }

    module.exports.loadUsers = function() {
        return users;
    }
})(module);
