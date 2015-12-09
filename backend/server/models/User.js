(function (module) {
    var mongoose = require("mongoose");
    var encryption = require("../utilities/encryption");


    var userSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: '{{PATH} is required!'
        },
        lastName: {
            type: String,
            required: '{{PATH} is required!'
        },
        userName: {
            type: String,
            required: '{{PATH} is required!',
            unique: true
        },
        salt: {
            type: String,
            required: '{{PATH} is required!'
        },
        password: {
            type: String,
            required: '{{PATH} is required!'
        },
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (password) {
            return encryption.hashPwd(this.salt, password) === this.password;
        }
    }

    var User = mongoose.model("User", userSchema);

    module.exports.createDefaultUsers = function () {

        User.find({}).exec(function (err, collection) {
            if (collection.length === 0) {
                var salt, hash;
                salt = encryption.createSalt();
                hash = encryption.hashPwd(salt, "aj")
                User.create({
                    firstName: "Ajay",
                    lastName: "Kaushik",
                    userName: "aj@test.com",
                    salt: salt,
                    password: hash,
                    roles: ["admin"]
                });

                salt = encryption.createSalt();
                hash = encryption.hashPwd(salt, "aj")
                User.create({
                        firstName: "Test",
                        lastName: "User",
                        userName: "test@test.com",
                        salt: salt,
                        password: hash,
                        roles: []
                    }
                );

                salt = encryption.createSalt();
                hash = encryption.hashPwd(salt, "aj")
                User.create({
                    firstName: "Happy",
                    lastName: "Hours",
                    userName: "happy@test.com",
                    salt: salt,
                    password: hash
                });
            }
        });
    }
})(module)