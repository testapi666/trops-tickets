const {
  create,
  getdeviceById,
  getdevices,
  updatedevice,
  deletedevice,
  createmany,
} = require('./devices.service')

module.exports = {
  createdevice: (req, res) => {
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
  createdevices: (req, res) => {
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
  getdeviceById: (req, res) => {
    const id = req.params.id
    getdeviceById(id, (err, results) => {
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

  getdevices: (req, res) => {
    getdevices((err, results) => {
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
  updatedevice: (req, res) => {
    const body = req.body
    const params = req.params
    updatedevice(body, params, (err, results) => {
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
  deletedevice: (req, res) => {
    const data = req.body
    deletedevice(data, (err, results) => {
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
        message: 'device deleted successfully',
      })
    })
  },
}
