const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database

  });
  
 let addComputer = (event) => {

    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO TheCS.Computer (ComputerID, StoreID, CName, CPrice, CMemory, CStorageSize, CProcessor, CProcessorGen, CGraphics) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
      pool.query(sql, [event.ComputerID, event.StoreID, event.CName, event.CPrice, event.CMemory, event.CStorageSize, event.CProcessor, event.CProcessorGen, event.CGraphics], (error, row) => {
          if (error) { return reject(error); }
          else{
            return resolve("sucess");
          }
        })
    });
  }


  let result = await addComputer(event);

  const response = {
    status : 200,
    body : `Computer added at store '${event.StoreID}'`
  } 

  return response;
}