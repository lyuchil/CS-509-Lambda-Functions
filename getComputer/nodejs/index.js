const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database

  });
  
 let getComputer = (event) => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM TheCS.Computer WHERE ComputerID = ?";
       pool.query(sql, [event.ComputerID],(error, row) => {
          if (error) { return reject(error); }
          else{
            return resolve(row);
          }
        })
    });
  }

  let result = await getComputer(event);

  const response = {
    status : 200,
    body : result
  }; 
  
  pool.end();
 
  return response;
  
};