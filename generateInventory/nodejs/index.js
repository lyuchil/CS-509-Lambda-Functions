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
      let sql = "SELECT CName, CPrice, CMemory, CStorageSize, CProcessor, CProcessorGen, CGraphics FROM TheCS.Computer AS C WHERE C.StoreID = ?";
      pool.query(sql, [event.StoreID], (error, row) => {
          if (error) { return reject(error); }
          else if(row){
            return resolve(row);
          }else{
            return resolve("Failed query");
          }
        })
    });
  }


  let result = await addComputer(event);

  const response = {
    status : 200,
    body : JSON.stringify(result)
  } 

  return response;
}