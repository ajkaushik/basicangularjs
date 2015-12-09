(function(module) {

    var mongoose = require("mongoose");
    require("../models/Product");
    require("../models/Map");
    require("../models/Lookup");
    require("../models/Mapping");
    require("../models/LookupMapping");
    require("../models/ExternalAccount");

    module.exports = function(config) {
        mongoose.connect(config.db);
        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error.."));
        db.once("open", function callback() {
            console.log("reportServer db opened");
        });
    }
})(module);