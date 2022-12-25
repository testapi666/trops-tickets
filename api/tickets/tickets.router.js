const router = require('express').Router()
const { checkToken } = require('../../auth/token_validation')
const {
  createticket,
  createtickets,
  getticketById,
  gettickets,
  updateticket,
  deleteticket,
} = require('./tickets.controller')
router.get('/', gettickets)
// router.get('/', checkToken('srikanth'), gettickets)
router.post('/',createticket)
router.post('/bulk',createtickets)

router.get('/:id', getticketById)
router.patch('/:id', updateticket)
router.post('/delete', deleteticket)

module.exports = router
