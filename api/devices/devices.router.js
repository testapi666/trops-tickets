const router = require('express').Router()
const { checkToken } = require('../../auth/token_validation')
const {
  createdevice,
  createdevices,
  getdeviceById,
  getdevices,
  updatedevice,
  deletedevice,
} = require('./devices.controller')
router.get('/', getdevices)
// router.get('/', checkToken('srikanth'), getdevices)
router.post('/',createdevice)
router.post('/bulk',createdevices)

router.get('/:id', getdeviceById)
router.patch('/:id', updatedevice)
router.post('/delete', deletedevice)

module.exports = router
