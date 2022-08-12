const mysql = require("mysql2");

const conn = mysql.createConnection({
    user:"admin",
    host:"database-1.cy9s1li1kztk.ap-south-1.rds.amazonaws.com",
    port:"3306",
    password:"rootadmin",
    database:"test"
});


conn.connect((err)=>{
    if(err) throw err;
    console.log("DB connected");
});


module.exports = conn;