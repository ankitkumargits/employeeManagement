const mysql = require('mysql');

// const connectToMySql = () => {

    const conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"",
        database:"emsdb"
    });

    conn.connect((err)=> {
        if(err){
            console.warn(err);
        }else {
            console.warn("Your database connection is established...");
        }
    });

    // conn.query("SELECT * FROM employees", (err, result)=> {
    //     console.warn(result);
    // });
// }


module.exports = conn;