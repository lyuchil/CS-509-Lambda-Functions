const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database

  });
  
 let removeComputer = (event) => {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM TheCS.Computer WHERE ComputerID = ?";
      pool.query(sql, [event.ComputerID], (error, results) => {
          if (error) { return reject(error); }
          else{
            if (results.affectedRows === 0) {
              const notFoundError = new Error("Error Buying Computer");
              notFoundError.statusCode = 400;
              return reject(notFoundError);
            } else {
              return resolve("Successfully Modified");
            }
          }
        })
    });
  }


  let result = await removeComputer(event);

  const response = {
    status : 200,
    body : result
  }; 

  return response;
};
