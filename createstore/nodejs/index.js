const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
    host: db_access.config.host,
    user: db_access.config.user,
    password: db_access.config.password,
    database: db_access.config.database

  });

  let createStore = (event) => {

    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO TheCS.Store (StoreID, STName, STLatitude, STLongitude, STUsername, STPassword) VALUES (?, ?, ?, ?, ?, ?)"
      //('${event.StoreID}', '${event.STName}',`  + event.STLatitude + `,` + event.STLongitude + `,'${event.STUsername}', '${event.STPassword}')`
      pool.query(sql, [event.StoreID, event.STName, event.STLatitude, event.STLongitude, event.STUsername, event.STPassword], (error, row) => {
          if (error) { return reject(error); }
          else{
            return resolve("sucess");
          }
        })
    });
  }


  let result = await createStore(event);

  const response = {
    status : 200,
    body : "Store created successfully"
  } 

  return response;

}
