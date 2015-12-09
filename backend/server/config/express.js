(function(module) {

    var express = require("express"),
        bodyparser = require("body-parser"),
        cookieParser = require("cookie-parser"),
        logger = require('morgan');

    module.exports = function(app, config) {

        app.use(logger("dev"));

        app.use(cookieParser("um_app_cookies"));

        app.use(bodyparser.urlencoded({
            extended: true
        }));
        app.use(bodyparser.json());

        //app.use(express.methodOverride());
    }

}(module));
