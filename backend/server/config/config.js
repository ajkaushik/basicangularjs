(function(module) {

    var path = require("path");

    var rootPath = path.normalize(__dirname + '/../../');

    module.exports = {
        development: {
            rootPath: rootPath,
            db: "mongodb://localhost/userdb",
            port: process.env.PORT || 3030
        },
        production: {
            rootPath: rootPath,
            db: "mongodb:<prdMongoServer>/userdb",
            port: process.env.PORT || 80
        },
        allowedOrigins: [
            "http://127.0.0.1:3000",
            "http://localhost:3000",
            "http://127.0.0.1:8080",
            "http://localhost:8080",
        ]
    }
}(module));
