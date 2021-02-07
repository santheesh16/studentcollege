var mysql = require('mysql');
const dbConfig = require("../config/db.config.js");


const connection = mysql.createConnection({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user:  dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    connectionLimit: 10,
    
    
});

var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
      if (err.fatal) {
        console.trace('fatal error: ' + err.message);
      }
      return del.call(this, err, sequence);
};

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;