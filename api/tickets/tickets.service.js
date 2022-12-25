const pool = require('../../config/database')

module.exports = {
  create: (data, callBack) => {

    pool.query(
      `insert into tickets( ticketqrid,eventid)
                values (?)`,[data.ticketqrid,data.eventid],
      
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
      `insert into tickets( ticketqrid,eventid)
                values ? `,
                [[...data.tickets]],
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

  getticketById: (id, callBack) => {
    pool.query(
      `select * from tickets where id = ?`,
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
  gettickets: (callBack) => {
    pool.query(`select * from tickets `, [], (error, results, fields) => {
      if (error) {
        // callBack(error);
        console.log(error)
        return callBack(null, { error: 'something went wrong!' })
      }
      return callBack(null, results)
    })
  },
  updateticket: (data, params, callBack) => {
    pool.query(
      `select * from tickets where ticketqrid = ?`,
      [params.id],
      (error, results, fields) => {
        if (error) {
          // callBack(error);
          return callBack(null, { error: 'something went wrong!' })
        }
        if(!results[0].scanned){
          pool.query(
            `update tickets set scanned=1 where ticketqrid = ?`,
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
          return callBack(null, { error: 'Ticket already Redeemed!' })
        }
      }
    )
  
  },
  // updateticket: (data, params, callBack) => {
  //   pool.query(
  //     `update tickets set id=?, ticketqrid=?, eventid=? where id = ?`,
  //     [params.id, data.ticketqrid,data.eventid, params.id],
  //     (error, results, fields) => {
  //       if (error) {
  //         // callBack(error);
  //         return callBack(null, { error: 'something went wrong!' })
  //       }
  //       return callBack(null, results[0])
  //     }
  //   )
  // },
  deleteticket: (data, callBack) => {
    console.log(data)
    pool.query(
      `delete from tickets where id = ?`,
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
