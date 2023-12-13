const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')


exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database
  });

  let generateInventoryCustomer = (event) => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT STName, CName, CPrice, CMemory, CStorageSize, CProcessor, CProcessorGen, CGraphics FROM TheCS.Computer NATURAL JOIN TheCS.Store AS C WHERE C.StoreID IN (?) AND CGraphics IN (?) AND CProcessorGen IN (?) AND CProcessor IN (?) AND CStorageSize IN (?) AND CMemory IN (?)";
      if (event.PriceSort === "ASC" || event.PriceSort === "DESC") {
        sql += ` ORDER BY CPrice ${event.PriceSort}`;
      }
      pool.query(sql, [event.StoreIDs, event.CGraphics, event.CProcessorGen, event.CProcessor, event.CStorageSize, event.CMemory], (error, row) => {
          if (error) { return reject(error); }
          else if(row){
            return resolve(row);
          }else{
            return resolve("Failed query");
          }
        })
    });
  }

  let result = await generateInventoryCustomer(event);

  const response = {
    status: 200,
    body: JSON.stringify(result),
  };

  return response;
};