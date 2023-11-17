const mysql = require('mysql');
const db_access = require('/opt/nodejs/db_access')

exports.handler = async (event) => {
  var pool = mysql.createPool({// credentials from db_access layer (loaded separately via console)
      host: db_access.config.host,
      user: db_access.config.user,
      password: db_access.config.password,
      database: db_access.config.database
  });
  
  let ComputeArgumentValue = (value) => {
      let numeric_value = parseFloat(value);
      if (isNaN(numeric_value)) {
          return new Promise((resolve, reject) => {
              pool.query("SELECT * FROM Constants WHERE name=?", [value], (error, rows) => {
                  if (error) { return reject(error); }
                  if ((rows) && (rows.length == 1)) {
                      return resolve(rows[0].value);
                  } else {
                      return reject("unable to locate constant '" + value + "'");
                  }
              });
          });
      } else {
          // this is just the constant
          return new Promise((resolve) => { return resolve(numeric_value); });
      }
  }
  
  const arg1_value = await ComputeArgumentValue(event.arg1);
  const arg2_value = await ComputeArgumentValue(event.arg2);
  result = arg1_value + arg2_value
  const response = {
    statusCode: 200,
    body:       JSON.stringify(result)
  };
 
  return response;
};