const { Router } = require('express')
const { add,getAll } = require('../controllers/prueba.controller')
const router = Router()
router.get('/getAll',getAll)
router.post('/add',add)

module.exports = router