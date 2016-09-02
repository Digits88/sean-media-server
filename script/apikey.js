var crypto = require("crypto");

var api = crypto.randomBytes(20).toString("hex").toUpperCase();
console.log(api);
