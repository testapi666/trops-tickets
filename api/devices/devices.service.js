const pool = require('../../config/database')

module.exports = {
  create: (data, callBack) => {

    pool.query(
      `insert into devices( serial,name)
                values (?)`,[data.serial,data.name],
      
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
      `insert into devices( serial,name)
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
    console.log('id');
    pool.query(
      `select * from devices where serial = ?`,
      [id],
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
      `update devices set id=?, deviceqrid=?, eventid=? where id = ?`,
      [params.id, data.deviceqrid,data.eventid, params.id],
      (error, results, fields) => {
        if (error) {
          // callBack(error);
          return callBack(null, { error: 'something went wrong!' })
        }
        return callBack(null, results[0])
      }
    )
  },
  deletedevice: (data, callBack) => {
    console.log(data)
    pool.query(
      `delete from devices where serial = ?`,
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
