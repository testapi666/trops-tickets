const {
  create,
  getticketById,
  gettickets,
  updateticket,
  deleteticket,
  createmany,
} = require('./tickets.service')

module.exports = {
  createticket: (req, res) => {
    const body = req.body
    create(body, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: 0,
          message: 'Database connection errror',
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  createtickets: (req, res) => {
    const body = req.body
    console.log(body);

    createmany(body, (err, results) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          success: 0,
          message: 'Database connection errror',
        })
      }
      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  getticketById: (req, res) => {
    const id = req.params.id
    getticketById(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'Record not Found',
        })
      }
      return res.json({
        success: 1,
        data: results,
      })
    })
  },

  gettickets: (req, res) => {
    gettickets((err, results) => {
      if (err) {
        console.log(err)
        return
      }
      return res.json({
        success: 1,
        data: results,
      })
    })
  },
  updateticket: (req, res) => {
    const body = req.body
    const params = req.params
    updateticket(body, params, (err, results) => {
      if (err) {
        console.log(err)
        return
      }
      return res.json({
        success: 1,
        message: 'updated successfully',
        data:results
      })
    })
  },
  deleteticket: (req, res) => {
    const data = req.body
    deleteticket(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }
      if (!results) {
        return res.json({
          success: 0,
          message: 'Record Not Found',
        })
      }
      if (results.error) {
        return res.json({
          success: 1,
          message: 'Cannot be deleted',
        })
      }
      return res.json({
        success: 1,
        message: 'ticket deleted successfully',
      })
    })
  },
}
