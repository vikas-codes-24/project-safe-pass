const mysql = require("mysql2");
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"safepass",
});



db.connect((err)=>{
    if(err){
        console.log("database connection failed:",err.message);

    }
    else{
       console.log("connected to mysql database"); 
    }
});

module.exports= db;