var mysql = require("mysql");
var config = require("../config.json");

module.exports = mysql.createPool({
	host: config.database.host,
	port: config.database.port,
	user: config.database.user,
	password: config.database.password,
	database: config.database.database,
	connectionLimit: 10
});
