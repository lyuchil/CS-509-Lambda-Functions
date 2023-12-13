const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database

  });
  
 let modifyPrice = (event) => {

    return new Promise((resolve, reject) => {
      let sql = "UPDATE TheCS.Computer SET CPrice = ? WHERE ComputerID = ?";
      pool.query(sql, [event.CPrice, event.ComputerID], (error) => {
          if (error) { return reject(error); }
          else{
            return resolve("Price Modified!");
          }
        })
    });
  }


  let result = await modifyPrice(event);

  const response = {
    status : 200,
    body : result
  } 

  pool.end();

  return response;
}