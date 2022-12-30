const pool = require('../../config/database')

module.exports = {
  create: (data, callBack) => {

    pool.query(
      `insert into devices( deviceqrid,eventid)
                values (?)`,[data.deviceqrid,data.eventid],
      
      (error, results, fields) => {
        if (error) {
          // callBack(error);
          console.log(error)
          return callBack(null, { error: 'something went wrong!' })
        }
        return callBack(null, results)
      }
    )
  },
  createmany: (data, callBack) => {
    pool.query(
      `insert into devices( deviceqrid,eventid)
                values ? `,
                [[...data.devices]],
      (error, results, fields) => {
        if (error) {
          // callBack(error);
          console.log(error)
          return callBack(null, { error: 'something went wrong!' })
        }
        return callBack(null, results)
      }
    )
  },

  getdeviceById: (id, callBack) => {
    pool.query(
      `select * from devices where id = ?`,
      [params.id],
      (error, results, fields) => {
        if (error) {
          // callBack(error);
          return callBack(null, { error: 'something went wrong!' })
        }
        return callBack(null, results[0])
      }
    )
  },
  getdevices: (callBack) => {
    pool.query(`select * from devices `, [], (error, results, fields) => {
      if (error) {
        // callBack(error);
        console.log(error)
        return callBack(null, { error: 'something went wrong!' })
      }
      return callBack(null, results)
    })
  },
  updatedevice: (data, params, callBack) => {
    pool.query(
      `select * from devices where deviceqrid = ?`,
      [params.id],
      (error, results, fields) => {
        if (error) {
          // callBack(error);
          return callBack(null, { error: 'something went wrong!' })
        }
        console.log(results[0]);
        console.log(results[0].scanned,results[0].scanned==0);
        if(results[0].scanned==0){
          pool.query(
            `update devices set scanned=1 where deviceqrid = ?`,
            [ params.id],
            (error, results, fields) => {
              if (error) {
                // callBack(error);
                return callBack(null, { error: 'something went wrong!' })
              }
              return callBack(null, results[0])
            }
          )
        }else{
          return callBack(null, { error: 'Device already Redeemed!' })
        }
      }
    )
  
  },
  // updatedevice: (data, params, callBack) => {
  //   pool.query(
  //     `update devices set id=?, deviceqrid=?, eventid=? where id = ?`,
  //     [params.id, data.deviceqrid,data.eventid, params.id],
  //     (error, results, fields) => {
  //       if (error) {
  //         // callBack(error);
  //         return callBack(null, { error: 'something went wrong!' })
  //       }
  //       return callBack(null, results[0])
  //     }
  //   )
  // },
  deletedevice: (data, callBack) => {
    console.log(data)
    pool.query(
      `delete from devices where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          // callBack(error);
          console.log(error)
          return callBack(null, { error: 'something went wrong!' })
        }

        return callBack(null, results)
      }
    )
  },
}
