const mysql = require("mysql2");
const config = require("../configuration/config");


con = mysql.createConnection(config.database);

module.exports = con;